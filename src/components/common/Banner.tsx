import styled from 'styled-components';
import { Summary } from '.';
const Banner: React.FunctionComponent = ({ children }) => {
  const data = {
    id: '0',
    title: '절대 빠진다, 하루 1시간! 복부 군살 제거 홈트',
    duration: ['3주', '3주차', '60분'],
    hashTags: ['#초중급', '#군살', '#다이어트'],
  };
  return (
    <Div>
      <div className="banner">{children}</div>
      <div className="summary">
        <DivSummary>
          <Summary {...data} />
        </DivSummary>
      </div>
    </Div>
  );
};

export default Banner;

const Div = styled.div`
  width: 100vw;
  height: 40vh;
  padding-top: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: linear-gradient(rgba(255, 114, 114, 0.6), rgba(255, 114, 114, 0.2));

  .banner {
    width: 50%;
    display: flex;
    justify-content: center;

    font-size: 2vw;
    font-weight: bold;
    line-height: 120%;
  }

  .summary {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;

    width: 80%;
    padding: 0 5vw;
  }
`;

const DivSummary = styled.div`
  font-size: 1.8vw;
  display: flex;
  img {
    height: 30vh;
  }

  .explain {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    text-align: center;
    margin-bottom: 0;
  }

  font-weight: bold;
  .title {
    color: ${(props) => props.theme.defaultText};
  }
  .duration {
    color: ${(props) => props.theme.main};
  }

  .hashTag {
    color: #988d8d;
  }
`;
