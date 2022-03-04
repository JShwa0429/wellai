import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, DatePicker } from 'antd';
import moment from 'moment';
import ReactApexChart from 'react-apexcharts';

import styled from 'styled-components';

const options = {
  chart: {
    id: 'basic-bar',
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  xaxis: {
    categories: ['운동시간', '칼로리', '몸무게'],
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
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
    tickAmount: 1,
    min: 0,
    max: 100,
  },
  colors: ['#ff7273'],
};
const series = [
  {
    name: '운동시간',
    data: [10, 20, 30],
  },
];
const MonthlyReport = () => {
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
        <Col>월간 레포트</Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            backgroundColor: 'rgb(247, 247, 247)',
            padding: '30px 30px',
            height: '500px',
          }}
        >
          <Row justify="center" style={{ marginBottom: '20px' }}>
            <Col>
              <DatePicker picker="month" defaultValue={moment()} />
            </Col>
          </Row>
          <Row>
            <Col>122시간 45분</Col>
          </Row>
          <Row>
            <Col>8123kcal을 태우셨어용</Col>
          </Row>
          <Row>
            <Col>목표달성률</Col>
          </Row>
          <Row>
            <Col>
              <ReactApexChart options={options} series={series} type="bar" height={150} width={340} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MonthlyReport;

const Wrapper = styled.div`
  width: 450px;
`;
