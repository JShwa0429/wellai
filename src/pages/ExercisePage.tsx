import { WebCam, Video, Description } from 'components';
import styled from 'styled-components';

const ExcercisePage = () => {
  // const opts = {
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1,
  //   },
  // };
  const url = '3V3oA8scvyQ';
  return (
    <DivCourse>
      <Description />
      <VideoDiv>
        <Video url={url} />
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
  padding: 0 10%;

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
