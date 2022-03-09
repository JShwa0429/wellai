import { loadGraphModel } from '@tensorflow/tfjs-converter';
import { Row, Col, DatePicker } from 'antd';
import * as poseDetection from '@tensorflow-models/pose-detection';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { drawSkeleton, putText } from './util';
import { average, argMax } from './setup';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';

tfjsWasm.setWasmPaths(`https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`);

//TODO : 백으로부터 운동 값 가져오기
const url = 'https://raw.githubusercontent.com/yeseulKIM00/test/main/graph/model.json';
const detectorConfig = {
  modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
}; //SINGLEPOSE_LIGHTNING

const fps = 10;
var iterationCounter = 0;
var errorCounter = 0;

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
}) {
  // const [userPoseIndex, setUserPoseIndex] = useState(0);
  // const [timeCounter, setTimeCounter] = useState(userPoseIndex === 0 ? 5 : 60); //
  // const [totalTimeCounter, setTotalTimeCounter] = useState(0);
  const [poseTimeLimit, setPoseTimeLimit] = useState(0);
  // const [courseList, setCourseList] = useState([57, 57]);
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const runMovenet = async () => {
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    const dnn76 = await loadGraphModel(url);
    setA(detector);
    setB(dnn76);
  };

  //30fps 250 frame 평균: 19.507200004000165
  useEffect(() => {
    runMovenet();
  }, []);
  useEffect(() => {
    setTimeout(() => setTimeLimit(timeLimit - 1), 1000);
  }, [timeLimit]);
  useEffect(() => {
    if (timeLimit >= -1) {
      setTimeout(() => {
        setPoseTimeLimit(poseTimeLimit - 1);
        if (a !== null && b !== null) {
          detect(a, b);
        }
      }, 1000 / fps);
    }
  }, [poseTimeLimit]);

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
    console.log(timeLimit);
    if (timeCounter <= 0 || timeLimit < 0) {
      nextPose();
    } else {
      //제한시간 끝나지 않고 진행되는 경우
      if (accuracy >= 0.8) {
        if (poseIndex === courseList[userPoseIndex]) {
          iterationCounter += 1;
          // 유저 운동시간 1초 조건 만족하는 경우
          if (iterationCounter == fps) {
            iterationCounter = 0;
            setTimeCounter(timeCounter - 1);
            setTotalTimeCounter(totalTimeCounter + 1);
            console.log('1초가 된 견우 초기화 하고 시간 1초 빼기', timeCounter, 'sec left');
          }
          if (timeCounter == 0) {
            iterationCounter += 1;
            setTimeCounter(userPoseIndex === 0 ? 5 : 60);
            nextPose();
            console.log('요가동작 모두 완료한 경우 다음넘어가면서 초기화');
          }
        }
      }
      //정확도 낮은 경우 프레임당 에러 횟수 세어 반영(초당 patience 20%)
      else {
        errorCounter = errorCounter + 1;
        console.log('==========errorCounter:', errorCounter, 'accuracy:', accuracy);
        if (errorCounter >= 6) {
          //20%
          iterationCounter -= errorCounter;
          errorCounter = 0;
        }
      }
    }
  }
  function nextPose() {
    console.log('다음자세 함수');
    iterationCounter = 0;
    errorCounter = 0;
    setUserPoseIndex(userPoseIndex + 1);
    setTimeCounter(userPoseIndex === 0 ? 5 : 5);
    setTimeLimit(userPoseIndex === 0 ? 5 : 5);
    console.log(userPoseIndex, '번째 운동 다음운동 시간~');
    // 코스의 마지막 운동인 경우
    if (userPoseIndex >= courseList.length - 1) {
      alert('운동 끝났습니다');

      navigate(`../course/${id}`);
      // window.location.reload();
    }
    return userPoseIndex, totalTimeCounter;
  }

  function classifyPose(dnn76, pose) {
    if (pose) {
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
    } else {
      setTimeout(classifyPose(dnn76, pose), 1000 / fps); //30fps 250 frame 평균: 12.356800036000372
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
    //   <div>
    //   <div
    //     style={{
    //       backgroundColor: 'red',
    //       zindex: 999,
    //       fontSize: '30px',
    //     }}
    //   >
    //     총운동시간
    //     {totalTimeCounter}
    //     <br />
    //     해당자세에서 한 운동시간
    //     {timeCounter}
    //     <br />
    //     제한시간
    //     {timeLimit}
    //     <br />
    //     자세교정
    //     {iterationCounter}
    //   </div>
    // </div>
  );
}
