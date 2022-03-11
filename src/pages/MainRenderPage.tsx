import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

const MainRenderPageTemp = () => {
  const options = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        style: {
          colors: [],
          fontSize: '12px',
          fontFamily: 'Noto Sans KR',
          fontWeight: 'bold',
          cssClass: 'apexcharts-xaxis-label',
        },
      },
      axisBorder: {
        show: false,
      },
    },
    grid: {
      borderColor: 'transparent',

      lines: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      tickAmount: 1,
      min: 0,
      max: 15,
    },
    colors: ['#ff7273'],
  };
  const series = [
    {
      name: '운동시간',
      data: [5, 0, 10, 3, 4, 7, 8, 9, 15, 20, 10, 5],
    },
  ];
  return (
    <Div>
      <SectionOne>
        <div className="introduce">
          <h1>
            집에서도 지키는
            <br /> 나만의 건강
          </h1>
          <p style={{ color: '#444' }}>
            언제 어디서나 당신의 건강을 책임지는 AI홈트 서비스,
            <br />
            웰라이
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
          <h1 style={{ color: '#444' }}>당신의 퍼스널 AI트레이너</h1>
          <p style={{ color: '#444' }}>
            AI트레이너의 실시간 운동자세 피드백,
            <br />
            혼자서 하는 운동도 이젠 두렵지 않아!
          </p>
        </div>
        <div className="image">
          <img src="/image/main_page_img_2.png" alt="요가 이미지" />
        </div>
      </SectionTwo>
      <SectionThree>
        <div className="introduce">
          <div className="contents">
            <h1 style={{ color: '#444' }}>
              한 눈에 보는
              <br />
              스마트한 건강 관리
            </h1>
            <p style={{ color: '#444' }}>
              당신의 노력을 한 눈에 보기 쉽게.
              <br />
              마이 리포트로 주간/월간 운동 기록을 체크해보세요.
            </p>
          </div>
          {/* <div className="circle">
            <img src="image/ellipse.png" alt="원" />
          </div> */}
          <img src="image/ellipse.png" alt="원" />
        </div>
        <div className="image">
          <div>
            <h2>
              &quot;웰라이&quot;님의 <br /> 연간 리포트
            </h2>
            <div style={{ width: '50%', margin: '1em auto 1em 6em', display: 'flex', justifyContent: 'space-between' }}>
              <button className="enable" disabled>
                운동 시간
              </button>
              <button className="disable" disabled>
                칼로리
              </button>
            </div>
            <div className="main-chart">
              <ReactApexChart options={options} series={series} type="bar" width={500} height={200} />
            </div>
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
    font-size: 65px;
    font-weight: 800;
    line-height: 110%;
    background: linear-gradient(to right, #ffafbd, #ffc3a0);
    color: transparent;
    -webkit-background-clip: text;

    margin: 1em 0 0.5em 0;
    margin-right: auto;
  }

  p {
    font-family: 'Noto Sans KR';
    font-weight: 100;
    font-size: 20px;
    margin-right: auto;
  }

  a {
    margin-right: auto;
    margin-top: 1em;
  }

  button {
    background-color: ${(props) => props.theme.main};
    color: white;
    width: 10rem;
    height: 3rem;
    border-radius: 4px;
  }

  .introduce {
    font-size: 1.4em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 160px;
    letter-spacing: -0.5px;
    h1 {
      letter-spacing: -2px;
    }
  }

  .image {
    margin: 0 110px 0 auto;
    object-fit: cover;
    img {
      min-width: 500px;
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
    color: '#444';
    h1 {
      font-size: 65px;
      font-weight: 800;
      margin: 0;
      letter-spacing: -2px;
    }

    p {
      font-color: ${(props) => props.theme.defaultText};
      font-size: 20px;
      font-weight: 100;
      line-height: 140%;
      margin: 1em 0;
    }
    margin-bottom: 2em;
  }
`;

const SectionThree = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: row;
  min-width: 1200px;
  color: '#444';
  .introduce {
    position: relative;
    width: 50%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .contents {
      h1 {
        font-size: 65px;
        font-weight: 800;
        letter-spacing: -2px;
        line-height: 110%;
      }
      p {
        font-family: 'Noto Sans KR';
        font-weight: 100;
        font-size: 20px;
        line-height: 140%;
      }
    }
    img {
      position: absolute;
      top: 50;
      width: 400px;
      background-color: ${(props) => props.theme.sub};
      z-index: -1;
      opacity: 0.6;
    }
    .circle {
      img {
        width: 400px;
        background-color: ${(props) => props.theme.sub};
        // z-index: -1;
        opacity: 0.6;
      }
    }
  }

  .image {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      line-height: 140%;
      margin-right: auto;
      color: ${(props) => props.theme.defaultText};
    }
    .main-chart {
      width: 100%;
      max-width: 25vw;
    }
  }

  button {
    width: 7em;
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
