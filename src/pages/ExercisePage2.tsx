import { WebCam, Video, Description } from 'components';
import { Row, Col, Button, Progress } from 'antd';
import styled from 'styled-components';
import { TensorCam, Loading } from 'components/exercise';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { CourseApi } from 'api/CourseApi';
import { UserApi } from 'api/UserApi';
import { exercise } from 'api/common';
import { ImportOutlined } from '@ant-design/icons';
import moment from 'moment';

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

  const [exerciseData, setExerciseData] = useState<exercise>();
  const navigate = useNavigate();
  const course = CourseApi();
  const user = UserApi();
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

  useEffect(() => {
    course
      .getDetailInformation(id as string)
      .then((res) => {
        // setCourseList((courseListRef.current = res.data.exercises));
        setCourseList((courseListRef.current = ['58', '58', '58']));
        setUserPoseIndex((userPoseIndexRef.current = 0));
      })
      .catch((err) => console.log(err.response));
    return () => user.recordExerciseTime(moment().format('YYYY-MM-DD'), String(totalTimeCounterRef.current));
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
    if (userPoseIndexRef.current !== -1) {
      course
        .getExercise(courseListRef.current[userPoseIndexRef.current as number])
        .then((res) => setExerciseData(res.data))
        .catch((err) => console.log(err.response));
    }
  }, [userPoseIndex]);

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
  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }
  return (
    <Wrapper>
      {/* <Loading isLoading={isLoading} /> */}
      <Row justify="space-between" style={{ padding: '30px 30px' }}>
        <Col span={12}>
          <Row>
            <Col style={{ marginRight: '30px' }}>
              <Button
                style={{ borderRadius: '5px' }}
                type="primary"
                size="large"
                onClick={() => navigate(`/course/${id}`)}
              >
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
                            percent={((EXERCISE_TIME - timeCounter) / EXERCISE_TIME) * 100}
                            format={(percent) => (
                              <>
                                <div>운동시간</div>
                                <div>{((EXERCISE_TIME * Number(percent)) / 100).toFixed()}</div>
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
          {exerciseData?.youtube_key ? <Video url={exerciseData?.youtube_key as string} /> : null}
          {/* <Video url={exerciseData?.youtube_key as string} /> */}
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
            EXERCISE_TIME={EXERCISE_TIME}
            TIME_LIMIT={TIME_LIMIT}
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
