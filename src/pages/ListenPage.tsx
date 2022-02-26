import { WebCam } from 'components';
import styled from 'styled-components';

const ListenPage = () => {
  // const opts = {
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1,
  //   },
  // };

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
        <iframe
          src="https://www.youtube.com/embed/hEnr6Ewpu_U?autoplay=1&mute=1&modestbranding=1&playlist=hEnr6Ewpu_U&loop=1"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
        <WebCam />
      </VideoDiv>
    </DivCourse>
  );
};

export default ListenPage;

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
  width: 100%;

  video {
    width: 50%;
  }
  iframe {
    width: 50%;
  }
`;
