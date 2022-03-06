import { WebCam, Video, Description } from 'components';
import styled from 'styled-components';
import { IoIosExit } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
const ExcercisePage = () => {
  // const opts = {
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1,
  //   },
  // };
  const url = '3V3oA8scvyQ';
  const { id } = useParams();
  return (
    <DivCourse>
      <div style={{ width: '100%' }}>
        <Link to={`../course/${id}`}>
          <Button>
            <IoIosExit size="1.5em" fill="white" />
            운동 그만 두기
          </Button>
        </Link>
      </div>
      <div style={{ width: '80%' }}>
        <Description />
      </div>
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
