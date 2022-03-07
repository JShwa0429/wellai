import styled from 'styled-components';
import { Summary } from '.';
const Banner = () => {
  const data = {
    id: '0',
    title: '절대 빠진다, 하루 1시간! 복부 군살 제거 홈트',
    duration: ['3주', '3주차', '60분'],
    hashTags: ['#초중급', '#군살', '#다이어트'],
  };
  return (
    <Div>
      <div className="banner">
        <p>
          {`“차차”`}님을 위한
          <br /> 오늘의 코스
        </p>
      </div>
      <div className="summary">
        <div className="image">
          <img src="/image/courseGirl.png" alt="요가 소녀" />
        </div>
      </div>
    </Div>
  );
};

export default Banner;

const Div = styled.div`
  height: 40vh;
  padding-top: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: linear-gradient(rgba(255, 114, 114, 0.6), rgba(255, 114, 114, 0.2));
  overflow: hidden;
  .banner {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 180px;
    font-size: 2em;
    font-weight: bold;
    line-height: 120%;
  }
  .bookmark {
    display: none;
  }
  .summary {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 60%;
    height: 100%;
    padding: 0 5vw;
  }

  .summary .img {
    min-height: 250px;
    max-height: 300px;
    width: 100%;
  }
`;

// const DivSummary = styled.div`
//   font-size: 1.5em;
//   display: flex;
//   img {
//     height: 30vh;
//   }

//   .explain {
//     margin-left: auto;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     width: 50%;
//     text-align: center;
//     margin-bottom: 0;
//   }

//   font-weight: bold;
//   .title {
//     color: ${(props) => props.theme.defaultText};
//   }
//   .duration {
//     color: ${(props) => props.theme.main};
//   }

//   .hashTag {
//     color: #988d8d;
//   }
// `;
