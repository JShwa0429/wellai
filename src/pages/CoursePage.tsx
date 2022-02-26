import { WebCam } from 'components';
import styled from 'styled-components';
import YouTube from 'react-youtube';
const CoursePage = () => {
  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const _onReady = (event: any) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  return (
    <DivCourse>
      <TitleDiv>
        <h1>no5.Downward dog(다운독)</h1>
        <h1>
          2/3<small>reps</small>
        </h1>
      </TitleDiv>

      <p>
        얼굴을 아래로 향한 개자새로, 개가 기지개를 펴는 자세와
        <br />
        유사하여 붙여진 이름입니다.
      </p>
      <VideoDiv>
        <YouTube videoId="2g811Eo7K8U" onReady={_onReady} />;
        <WebCam />
      </VideoDiv>
    </DivCourse>
  );
};

export default CoursePage;

const DivCourse = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10%;

  p {
    font-size: 1.5em;
    color: ${(props) => props.theme.defaultText};
    margin-top 3%;
    margin-right: auto;
  }
`;

const TitleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  h1 {
    color: ${(props) => props.theme.main};
  }
`;

const VideoDiv = styled.div`
  margin-top: 3vw;
  display: flex;

  video {
    width: 50%;
  }
`;
