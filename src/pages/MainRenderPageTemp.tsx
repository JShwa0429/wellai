import styled from 'styled-components';
import { Link } from 'react-router-dom';
const MainRenderPageTemp = () => {
  return (
    <Div>
      <SectionOne>
        <div className="introduce">
          <h1>
            집에서도 지키는
            <br /> 나만의 건강
          </h1>
          <p>
            언제 어디서나 당신의 건강을 책임지는 AI홈트 서비스
            <br />
            WellAi.
          </p>
          <Link to="/course">
            <button>운동 바로가기</button>
          </Link>
        </div>
        <div className="image">
          <img src="/image/main_page_img.png" alt="요가 이미지" />
        </div>
      </SectionOne>
      <SectionTwo>
        <div className="introduce">
          <h1>집에서도 지키는 나만의 건강</h1>
          <p>
            언제 어디서나 당신의 건강을 책임지는 AI 홈트 서비스
            <br />
            WellAi.
          </p>
        </div>
        <div className="image">
          <img src="/image/main_page_img_2.png" alt="요가 이미지" />
        </div>
      </SectionTwo>
      <SectionThree>
        <div className="introduce">
          <img src="image/ellipse.png" alt="원" />
          <h1>
            스마트한 건강 관리 코치,
            <br />
            WellAi.
          </h1>
          <p>
            마이 리포트로 주간/월간 운동 기록을 체크해보세요.
            <br />
            그동안의 노력을 한 눈에 파악할 수 있게 도와드릴게요.
          </p>
        </div>
        <div className="image">
          <div>
            <h2>
              &quot;차차&quot;님의
              <br />
              <small>위클리포트</small>
            </h2>
            <div style={{ width: '90%', margin: '1em auto', display: 'flex', justifyContent: 'space-between' }}>
              <button className="enable">운동 시간</button>
              <button className="disable">칼로리</button>
            </div>
            <img src="image/weeklyChart.png" alt="주간차트" />
          </div>
        </div>
      </SectionThree>
    </Div>
  );
};

export default MainRenderPageTemp;

const Div = styled.div`
  width: 100vw;
  min-width: 1000px;
  height: 300vh;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: -80px;
`;

const SectionOne = styled.section`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: row;
  margin-top: -80px;

  h1 {
    font-size: 3.5em;
    line-height: 110%;
    background: linear-gradient(to right top, ${(props) => props.theme.main}, #ffa69e);
    color: transparent;
    -webkit-background-clip: text;

    margin: 1em 0 0 0;
    margin-right: auto;
  }

  p {
    margin-right: auto;
  }

  a {
    margin-right: auto;
    margin-top: 1em;
  }

  button {
    background-color: ${(props) => props.theme.main};
    color: white;
    width: 8rem;
    height: 3rem;
    border-radius: 4px;
  }

  .introduce {
    font-size: 1.5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: auto;
  }

  .image {
    max-width: 700px;
    margin: auto;
    object-fit: cover;
    img {
      height: 100vh;
      min-height: 600px;
    }
  }
`;

const SectionTwo = styled.section`
  width: 100vw;
  height: calc(100vh);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  background: linear-gradient(${(props) => props.theme.light}, white);
  .introduce {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    text-align: center;
    h1 {
      font-size: 3em;
      font-weight: 900;
      margin: 0;
    }

    p {
      font-color: ${(props) => props.theme.defaultText};
      font-size: 1.2em;
      font-weight: 100;
      margin: 1em 0;
    }
    margin-bottom: 2em;
  }
`;

const SectionThree = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  min-width: 1200px;
  .introduce {
    position: relative;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    h1 {
      font-size: 4em;
      font-weight: 900;

      line-height: 120%;
    }
    p {
      font-family: 'Noto Sans KR Light';
      font-size: 1.5em;
    }

    img {
      position: absolute;
      left: 20%;
      width: 60%;
      background-color: ${(props) => props.theme.sub};
      z-index: -1;
      opacity: 0.6;
    }
  }
  .image {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2 {
      line-height: 100%;
      margin-right: auto;
      color: ${(props) => props.theme.defaultText};
    }
    img {
      width: 100%;
      max-width: 25vw;
    }
  }

  button {
    width: 10em;
    height: 3em;
    border-radius: 8px;
  }

  .enable {
    background-color: ${(props) => props.theme.main};
    color: white;
  }

  .disable {
    background-color: ${(props) => props.theme.border};
  }
`;
