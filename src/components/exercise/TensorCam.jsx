import { loadGraphModel } from '@tensorflow/tfjs-converter';
import { Row, Col, DatePicker } from 'antd';
import * as poseDetection from '@tensorflow-models/pose-detection';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { drawSkeleton, putText } from './util';
import { average, argMax } from './setup';
import { UserApi } from 'api/UserApi';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import moment from 'moment';

tfjsWasm.setWasmPaths(`https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`);

//TODO : 백으로부터 운동 값 가져오기
const url = 'https://raw.githubusercontent.com/yeseulKIM00/test/main/graph/model.json';
const detectorConfig = {
  modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
}; //SINGLEPOSE_LIGHTNING

const fps = 10;
let iterationCounter = 0;
let errorCounter = 0;

export default function TempComp({
  setTimeLimit,
  timeLimit,
  timeCounter,
  setTimeCounter,
  userPoseIndex,
  setUserPoseIndex,
  setTotalTimeCounter,
  totalTimeCounter,
  setCourseList,
  courseList,
  id,
  timeLimitRef,
  userPoseIndexRef,
  timeCounterRef,
  totalTimeCounterRef,
  courseListRef,
  setIsLoading,
  isLoading,
  TIME_LIMIT,
  EXERCISE_TIME,
}) {
  const navigate = useNavigate();
  const user = UserApi();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const runMovenet = async () => {
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    const dnn76 = await loadGraphModel(url);
    // console.log(detector, dnn76);
    return { detector, dnn76 };
  };

  //30fps 250 frame 평균: 19.507200004000165
  useEffect(() => {
    let interval1;
    runMovenet().then((result) => {
      interval1 = setInterval(() => {
        detect(result.detector, result.dnn76);
      }, 1000 / fps);
      return;
    });

    return () => clearInterval(interval1);
  }, []);
  useEffect(() => {
    // setTimeLimit(timeLimit - 1);
    const interval2 = setInterval(() => {
      setTimeLimit((timeLimitRef.current -= 1));
      if (timeLimitRef.current < 0) {
        setTimeLimit((timeLimitRef.current = 5));
      }
    }, 1000);
    return () => clearInterval(interval2);
  }, []);

  const detect = async (detector, dnn76) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      const pose = await detector.estimatePoses(video);
      const result = await classifyPose(dnn76, pose);
      drawCanvas(pose, result[0], result[1], video, videoWidth, videoHeight, canvasRef);
      putText(result[0], canvasRef, 50, 30);
      calWorkouttime2(result[0], result[1]);
    }
  };

  function calWorkouttime2(poseIndex, accuracy) {
    // 한 자세가 끝나는 경우 -> 1. 코스종료 2. 다음자세로 변경

    if (timeCounterRef.current <= 0 || timeLimitRef.current <= 0) {
      nextPose();
    } else {
      //제한시간 끝나지 않고 진행되는 경우
      if (accuracy >= 0.8) {
        if (poseIndex === Number(courseListRef.current[userPoseIndexRef.current]) - 1) {
          iterationCounter += 1;
          // 유저 운동시간 1초 조건 만족하는 경우
          if (iterationCounter == fps) {
            iterationCounter = 0;
            setTimeCounter((timeCounterRef.current -= 1));
            setTotalTimeCounter((totalTimeCounterRef.current += 1));
          }
          if (timeCounterRef.current == 0) {
            nextPose();
          }
        }
      }
      //정확도 낮은 경우 프레임당 에러 횟수 세어 반영(초당 patience 20%)
      else {
        errorCounter = errorCounter + 1;
        // console.log('==========errorCounter:', errorCounter, 'accuracy:', accuracy);
        if (errorCounter >= 6) {
          //20%
          iterationCounter -= errorCounter;
          errorCounter = 0;
        }
      }
    }
  }
  function nextPose() {
    iterationCounter = 0;
    errorCounter = 0;
    setIsLoading(true);
    setUserPoseIndex((userPoseIndexRef.current += 1));
    setTimeCounter(
      userPoseIndexRef.current === 0
        ? (timeCounterRef.current = EXERCISE_TIME)
        : (timeCounterRef.current = EXERCISE_TIME),
    );
    setTimeLimit(
      userPoseIndexRef.current === 0 ? (timeLimitRef.current = TIME_LIMIT) : (timeLimitRef.current = TIME_LIMIT),
    );

    // 코스의 마지막 운동인 경우
    if (userPoseIndexRef.current >= courseListRef.current.length) {
      alert('운동 끝났습니다');
      navigate(`../course/${id}`);
      user.recordExerciseTime(moment().format('YYYY-MM-DD'), String(totalTimeCounterRef.current));
      // window.location.reload();
    }
    return userPoseIndex, totalTimeCounter;
  }

  function classifyPose(dnn76, pose) {
    if (pose.length > 0) {
      let inputs = [];

      for (let i = 0; i < pose[0].keypoints.length; i++) {
        let x = pose[0]['keypoints'][i].x;
        let y = pose[0]['keypoints'][i].y;
        let score = pose[0]['keypoints'][i].score;
        inputs.push(x);
        inputs.push(y);
        inputs.push(score);
      }
      const inputs1D = tf.tensor(inputs, [1, 51]);
      const pred = dnn76.predict(inputs1D);
      const poseIndex = argMax(pred.dataSync());
      const predict = pred.dataSync();
      const accuracy = Math.round(predict[poseIndex] * 100);

      return [poseIndex, accuracy];
    }
  }

  const drawCanvas = (pose, poseIndex, accuracy, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    drawSkeleton(pose[0]['keypoints'], 0.5, poseIndex, accuracy, ctx, 50, 480 / 2);
  };

  return (
    <>
      <Webcam
        ref={webcamRef}
        style={{
          width: '100%',
          left: 0,
          right: 0,
          height: '100%',
          zindex: 9,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zindex: 9,
          width: '100%',
          height: '100%',
        }}
      />
    </>
  );
}
