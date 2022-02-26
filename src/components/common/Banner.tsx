import styled from 'styled-components';
import { Summary } from '.';
const Banner: React.FunctionComponent = ({ children }) => {
  const data = {
    id: '0',
    title: '차차',
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
  height: 50vh;
  padding-top: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: linear-gradient(rgba(255, 114, 114, 0.6), rgba(255, 114, 114, 0.2));

  .banner {
    width: 50%;
    display: flex;
    justify-content: center;

    font-size: 3em;
    font-weight: bold;
  }

  .summary {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    border: 1px solid black;
    width: 50%;
    padding: 0 5vw;
  }
`;

const DivSummary = styled.div`
  font-size: 2em;
  display: flex;

  img {
    height: 25vh;
  }

  .explain {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
