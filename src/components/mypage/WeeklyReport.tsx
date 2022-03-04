import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import ReactApexChart from 'react-apexcharts';

import styled from 'styled-components';

const options = {
  chart: {
    id: 'basic-bar',
  },
  xaxis: {
    categories: ['월', '화', '수', '목', '금', '토', '일'],
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
    max: 26,
  },
  colors: ['#ff7273'],
};
const series = [
  {
    name: '운동시간',
    data: [24, 8, 10, 24, 15, 18, 20],
  },
];
const WeeklyReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Row
        style={{
          marginBottom: '20px',
          fontSize: '20px',
        }}
      >
        <Col>주간 레포트</Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            backgroundColor: 'rgb(247, 247, 247)',
            padding: '20px 30px',
            height: '500px',
          }}
        >
          <Row
            justify="space-around"
            style={{
              marginBottom: '30px',
            }}
          >
            <Col>
              <Button style={{ width: '100px' }} size="large">
                운동량
              </Button>
            </Col>
            <Col>
              <Button style={{ width: '100px' }} size="large">
                칼로리
              </Button>
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              {' '}
              <ReactApexChart options={options} series={series} type="bar" height={350} width={390} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default WeeklyReport;

const Wrapper = styled.div`
  width: 450px;
`;
