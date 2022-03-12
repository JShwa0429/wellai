import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Webcam from 'react-webcam';
import { argMax } from './setup';
import { UserApi } from 'api/UserApi';
import '@tensorflow/tfjs-backend-webgl';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import * as constants from './constants';

tfjsWasm.setWasmPaths(`https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${tfjsWasm.version_wasm}/dist/`);

const url = 'https://raw.githubusercontent.com/yeseulKIM00/test/main/tuneddnn81v1q/model.json';
const detectorConfig = {
  modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
};

const FPS = 20;
let iterationCounter = 0;
let errorCounter = 0;
const LINE_WIDTH = 8;
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

  useEffect(() => {
    let interval1;
    runMovenet().then((result) => {
      interval1 = setInterval(() => {
        detect(result.detector, result.dnn76);
      }, 1000 / FPS);
      return;
    });

    return () => clearInterval(interval1);
  }, []);
  useEffect(() => {
    // setTimeLimit(timeLimit - 1);
    const interval2 = setInterval(() => {
      setTimeLimit((timeLimitRef.current -= 1));
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
      // putText(result[0], canvasRef, 50, 30);
      calWorkouttime2(result[0], result[1]);
    }
  };

  function calWorkouttime2(poseIndex, accuracy) {
    if (timeCounterRef.current <= 0 || timeLimitRef.current <= 0) {
      nextPose();
    } else {
      if (accuracy >= 0.8) {
        if (poseIndex === Number(courseListRef.current[userPoseIndexRef.current]) - 1) {
          iterationCounter += 1;
          if (iterationCounter == FPS) {
            iterationCounter = 0;
            setTimeCounter((timeCounterRef.current -= 1));
            setTotalTimeCounter((totalTimeCounterRef.current += 1));
          }
          if (timeCounterRef.current == 0) {
            nextPose();
          }
        }
      } else {
        errorCounter = errorCounter + 1;
        if (errorCounter >= 6) {
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
    if (userPoseIndexRef.current >= courseListRef.current.length) {
      alert('운동 끝났습니다');
      navigate(`../course/${id}`);
      // user.recordExerciseTime(moment().format('YYYY-MM-DD'), String(totalTimeCounterRef.current));
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
  function toTuple({ y, x }) {
    return [y, x];
  }
  function setColor(index, accuracy) {
    return index === courseListRef.current[userPoseIndexRef.current] - 1
      ? accuracy >= 0.9
        ? 'rgb(119,198,110,0.7)'
        : 'rgb(128,128,128,0.7)'
      : 'rgb(128,128,128,0.7)';
  }

  const drawCanvas = (pose, poseIndex, accuracy, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    // drawSkeleton(pose[0]['keypoints'], 0.5, poseIndex, accuracy, ctx, 50, 480 / 2);
    const adjacentKeyPoints = constants.COCO_CONNECTED_KEYPOINTS_PAIRS;
    let noKeypoints = 0;
    adjacentKeyPoints.slice(4).forEach((line) => {
      if (pose[0]['keypoints'][adjacentKeyPoints.indexOf(line)].score > 0.5) {
        noKeypoints += 1;

        // drawSegment(toTuple(keypoints[line[0]]), toTuple(keypoints[line[1]]), setColor(index, accuracy), 1, ctx);
        const [ay, ax] = toTuple(pose[0]['keypoints'][line[0]]);
        const [by, bx] = toTuple(pose[0]['keypoints'][line[1]]);
        ctx.beginPath();
        ctx.moveTo(ax * 1, ay * 1);
        ctx.lineCap = 'round';
        ctx.lineTo(bx * 1, by * 1);
        ctx.lineCap = 'round';
        ctx.lineWidth = LINE_WIDTH;
        ctx.strokeStyle = setColor(poseIndex, accuracy);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ax, ay, 7, 0, 2 * Math.PI);
        ctx.lineWidth = 7;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(bx, by, 7, 0, 2 * Math.PI);
        ctx.lineWidth = 7;
        ctx.stroke();
      }
    });
    if (noKeypoints <= 10) {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(1, 1, 1, 0.5)';
      ctx.rect(10, 15, 150, 100);

      ctx.font = 'bold 30px Arial';
      ctx.fillStyle = 'rgb(255,144,144)';

      ctx.fillText('화면에 전신이 나오도록 물러서 주세요', 100, 40);
    }
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
