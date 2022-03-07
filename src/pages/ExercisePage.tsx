import { WebCam, Video, Description } from 'components';
import styled from 'styled-components';
import { IoIosExit } from 'react-icons/io';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CourseApi } from 'api/CourseApi';
import { exercise } from 'api/common';
const ExcercisePage = () => {
  // const opts = {
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1,
  //   },
  // };

  const { id } = useParams();
  const [exercises, setExercises] = useState<string[]>([]);
  const [exerciseNumber, setExerciseNumber] = useState<number>();
  const [exerciseData, setExerciseData] = useState<exercise>();
  const navigate = useNavigate();
  useEffect(() => {
    const course = CourseApi();
    course
      .getDetailInformation(id as string)
      .then((res) => {
        setExercises(res.data.exercises);
        setExerciseNumber(0);
      })
      .catch((err) => console.log(err.response));
  }, []);

  useEffect(() => {
    const course = CourseApi();
    course
      .getExercise(exercises[exerciseNumber as number])
      .then((res) => setExerciseData(res.data))
      .catch((err) => console.log(err.response));
  }, [exerciseNumber]);

  const handleNextExercise = () => {
    if (exerciseNumber === exercises.length - 1) {
      navigate(`../course/${id}`);
    } else {
      setExerciseNumber((current) => (current as number) + 1);
    }
  };
  return (
    <DivCourse>
      <div style={{ width: '100%' }}>
        <Link to={`../course/${id}`}>
          <Button>
            <IoIosExit size="1.5em" fill="white" />
            강의실 나가기
          </Button>
        </Link>
        <button onClick={handleNextExercise}>다음 운동으로</button>
      </div>
      <div style={{ width: '80%' }}>
        <Description />
      </div>
      <VideoDiv>
        <Video url={exerciseData?.youtube_key as string} />
        <WebCam />
      </VideoDiv>
    </DivCourse>
  );
};

export default ExcercisePage;

const DivCourse = styled.div`
  display: flex;
  width: 100vw;
  height:100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    font-size: 1.5em;
    color: ${(props) => props.theme.defaultText};
    margin-top 3%;
    margin-right: auto;
  }
`;

const VideoDiv = styled.div`
  margin-top: auto;
  display: flex;
  width: 100vw;

  video {
    width: 50%;
  }
  iframe {
    width: 50%;
  }
`;

const Button = styled.button`
  width: 10em;
  height: 3em;
  padding: 0 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.main};
  color: white;
  border-radius: 4px;
  margin: 2em 0;
  margin-left: 2em;
  margin-right: auto;
  margin-bottom: auto;
`;
