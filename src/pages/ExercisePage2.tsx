import { WebCam, Video, Description } from 'components';
import { Row, Col, Button, Progress } from 'antd';
import styled from 'styled-components';
import { TensorCam, Loading } from 'components/exercise';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { CourseApi } from 'api/CourseApi';
import { exercise } from 'api/common';
import { ImportOutlined } from '@ant-design/icons';

// const TARGET_TIME = userPoseIndex === 0 ? 5 : 60;
const FPS = 10;
const EXERCISE_TIME = 5;
const TIME_LIMIT = EXERCISE_TIME * 4;

const ExcercisePage = () => {
  // const opts = {
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1,
  //   },
  // };

  const { id } = useParams();
  // console.log(id);
  // const [exercises, setExercises] = useState<string[]>([]);
  // const [exerciseNumber, setExerciseNumber] = useState<number>();
  const [exerciseData, setExerciseData] = useState<exercise>();
  const navigate = useNavigate();
  const course = CourseApi();
  const [userPoseIndex, setUserPoseIndex] = useState(-1);
  const userPoseIndexRef = useRef(-1);
  const [timeLimit, setTimeLimit] = useState(TIME_LIMIT);
  const timeLimitRef = useRef(TIME_LIMIT);
  const [timeCounter, setTimeCounter] = useState(EXERCISE_TIME); //
  const timeCounterRef = useRef(EXERCISE_TIME);
  const [totalTimeCounter, setTotalTimeCounter] = useState(0);
  const totalTimeCounterRef = useRef(0);
  const [courseList, setCourseList] = useState(['57', '57']);
  const courseListRef = useRef(['58']);

  const [isLoading, setIsLoading] = useState(true);
  // const handleStartExercise = () => {
  //   setInterval(() => setTimeLimit(timeLimit - 1), 1000);
  // };
  useEffect(() => {
    // console.log(id, 'sadasdas');
    course
      .getDetailInformation(id as string)
      .then((res) => {
        console.log('운동자세들', res.data.exercises);
        // setCourseList((courseListRef.current = res.data.exercises));
        setCourseList((courseListRef.current = ['58', '58', '58']));

        setUserPoseIndex((userPoseIndexRef.current = 0));
      })
      .catch((err) => console.log(err.response));
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
    console.log(courseListRef.current);
    course
      .getExercise(courseListRef.current[userPoseIndexRef.current as number])
      .then((res) => setExerciseData(res.data))
      .catch((err) => console.log(err.response));
  }, [userPoseIndex]);
  // useEffect(() => {
  //   setTimeout(() => setIsLoading(!false), 3000);
  // }, [isLoading]);

  const handleNextExercise = () => {
    if (userPoseIndex === courseList.length - 1) {
      navigate(`../course/${id}`);
    } else {
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
    }
  };

  return (
    <Wrapper>
      <Loading isLoading={isLoading} />
      <Row justify="space-between" style={{ padding: '30px 30px' }}>
        <Col span={12}>
          <Row>
            <Col style={{ marginRight: '30px' }}>
              <Button style={{ borderRadius: '5px' }} type="primary" size="large" onClick={() => navigate('/')}>
                <ImportOutlined />
                강의실 나가기
              </Button>
            </Col>
            <Col>
              <Button style={{ borderRadius: '5px' }} type="primary" size="large" onClick={handleNextExercise}>
                다음 운동으로
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row justify="center" align="middle">
            <Col style={{ marginRight: '20px', fontSize: '25px' }}>코스진행</Col>
            <Col span={15}>
              <Progress
                strokeColor={{
                  '0%': '#ff7273',
                  '100%': '#FFA07A',
                }}
                percent={Number(((totalTimeCounterRef.current / (EXERCISE_TIME * courseList.length)) * 100).toFixed())}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="space-around">
        <Col span={24}>
          <Row justify="center" align="middle">
            <Col span={12}>
              <Row justify="center" align="middle" style={{ marginBottom: '20px' }}>
                <Col
                  style={{
                    fontSize: '36px',
                    color: '#ff7273',
                    fontWeight: 'bold',
                  }}
                >
                  {exerciseData?.exercise_name}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row justify="center" align="middle">
                <Col
                  style={{
                    // border: '1px solid lightgray'
                    padding: '3px 20px',
                  }}
                >
                  <Row>
                    <Col style={{ marginRight: '80px' }}>
                      <Row>
                        <Col>
                          <Progress
                            strokeColor={{
                              '0%': '#fabfa8',
                              '100%': '#ff7273',
                            }}
                            type="circle"
                            percent={(timeLimitRef.current / TIME_LIMIT) * 100}
                            format={(percent) => (
                              <>
                                <div>제한시간</div>
                                <div>{((TIME_LIMIT * Number(percent)) / 100).toFixed()}</div>
                              </>
                            )}
                            success={{
                              percent: 0,
                              strokeColor: '#ff7273',
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <Progress
                            strokeColor={{
                              '0%': '#fabfa8',
                              '100%': '#ff7273',
                            }}
                            type="circle"
                            percent={((EXERCISE_TIME - timeCounterRef.current) / 100) * 100}
                            format={(percent) => (
                              <>
                                <div>운동시간</div>
                                <div>{Number(percent).toFixed()}</div>
                              </>
                            )}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ height: '65vh', marginTop: '30px', backgroundColor: 'black' }} align="middle">
        <Col span={12} style={{ height: '100%' }}>
          <Video url={exerciseData?.youtube_key as string} />
        </Col>
        <Col span={12} style={{ height: '100%' }}>
          <TensorCam
            timeLimit={timeLimit}
            setTimeLimit={setTimeLimit}
            timeCounter={timeCounter}
            setTimeCounter={setTimeCounter}
            userPoseIndex={userPoseIndex}
            setUserPoseIndex={setUserPoseIndex}
            totalTimeCounter={totalTimeCounter}
            setTotalTimeCounter={setTotalTimeCounter}
            courseList={courseList}
            setCourseList={setCourseList}
            id={id}
            timeLimitRef={timeLimitRef}
            userPoseIndexRef={userPoseIndexRef}
            timeCounterRef={timeCounterRef}
            totalTimeCounterRef={totalTimeCounterRef}
            courseListRef={courseListRef}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ExcercisePage;
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 100%;
  .ant-progress-inner {
    /* height: 25px; */
  }
  .ant-progress-bg {
    /* height: 25px !important; */
  }
`;
