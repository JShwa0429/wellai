import { WebCam, Video, Description } from 'components';
import { Row, Col, Button, Progress } from 'antd';
import styled from 'styled-components';
import { TensorCam } from 'components/exercise';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CourseApi } from 'api/CourseApi';
import { exercise } from 'api/common';
import { ImportOutlined } from '@ant-design/icons';

// const TARGET_TIME = userPoseIndex === 0 ? 5 : 60;
const FPS = 10;
const ExcercisePage = () => {
  // const opts = {
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1,
  //   },
  // };

  const { id } = useParams();
  console.log(id);
  // const [exercises, setExercises] = useState<string[]>([]);
  // const [exerciseNumber, setExerciseNumber] = useState<number>();
  const [exerciseData, setExerciseData] = useState<exercise>();
  const navigate = useNavigate();
  const course = CourseApi();
  const [userPoseIndex, setUserPoseIndex] = useState(-1);
  const [timeLimit, setTimeLimit] = useState(userPoseIndex === -1 ? 5 : 60);
  const [timeCounter, setTimeCounter] = useState(userPoseIndex === -1 ? 5 : 60); //
  const [totalTimeCounter, setTotalTimeCounter] = useState(0);
  const [courseList, setCourseList] = useState(['57', '57']);

  useEffect(() => {
    console.log(id, 'sadasdas');
    course
      .getDetailInformation(id as string)
      .then((res) => {
        console.log('운동자세들', res.data.exercises);
        setCourseList(res.data.exercises);
        setUserPoseIndex(0);
      })
      .catch((err) => console.log(err.response));
  }, []);

  useEffect(() => {
    console.log(courseList);
    course
      .getExercise(courseList[userPoseIndex as number])
      .then((res) => setExerciseData(res.data))
      .catch((err) => console.log(err.response));
  }, [userPoseIndex]);
  console.log(exerciseData);
  const handleNextExercise = () => {
    if (userPoseIndex === courseList.length - 1) {
      navigate(`../course/${id}`);
    } else {
      setUserPoseIndex(userPoseIndex + 1);
    }
  };
  return (
    <Wrapper>
      <Row style={{ padding: '30px 30px' }}>
        <Col style={{ marginRight: '30px' }}>
          <Button style={{ borderRadius: '5px' }} type="primary" size="large" onClick={() => navigate('/')}>
            {/* <IoIosExit size="20px" fill="white" /> */}
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
      <Row justify="space-around">
        <Col span={24}>
          <Row>
            <Col span={12}>
              <Row justify="center" align="middle">
                <Col span={15}>
                  <Progress
                    strokeColor={{
                      '0%': '#ff7273',
                      '100%': '#FFA07A',
                    }}
                    percent={50}
                  />
                </Col>
              </Row>
              <Row justify="center" align="middle">
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
              <Row>
                <Col>
                  <Row>
                    <Col>제한시간</Col>
                  </Row>
                  <Row>
                    <Col>{timeLimit}</Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col>내 운동시간</Col>
                  </Row>
                  <Row>
                    <Col>0:00 / 1:00</Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ height: '60vh', marginTop: '30px' }} align="middle">
        <Col span={12} style={{ height: '100%' }}>
          <Video url={exerciseData?.youtube_key as string} />
        </Col>
        <Col span={12}>
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
          />
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Wrapper>

    // <DivCourse>
    //   <div style={{ width: '100%', display: 'flex' }}>
    //     <Link to={`../course/${id}`}>
    //       <Button>
    //         <IoIosExit size="1.5em" fill="white" />
    //         강의실 나가기
    //       </Button>
    //     </Link>
    //     <Button onClick={handleNextExercise}>다음 운동으로</Button>
    //   </div>
    //   <div style={{ width: '80%' }}>
    //     <Description {...(exerciseData as exercise)} />
    //   </div>
    //   <VideoDiv>
    //     <Video url={exerciseData?.youtube_key as string} />
    //     <WebCam />
    //   </VideoDiv>
    // </DivCourse>
  );
};

export default ExcercisePage;
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  .ant-progress-inner {
    /* height: 25px; */
  }
  .ant-progress-bg {
    /* height: 25px !important; */
  }
`;
