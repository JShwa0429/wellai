import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Button, Radio } from 'antd';
import ReactApexChart from 'react-apexcharts';

import styled from 'styled-components';

const WeeklyReport = () => {
  const [type, setType] = useState('0');
  const [records, setRecords] = useState({ '0': [], '1': [] });
  const getWeeklyReport = async () => {
    const result = await axios.get('/users/records/month/');
    const { month_exercise_time, month_calories } = result.data[0];
    // setRecords({ month_exercise_time, month_calories });
  };
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
  return (
    <Wrapper>
      {/* <Row
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
            <Radio.Group
              buttonStyle="solid"
              // defaultValue="0"
              size="large"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <Radio.Button style={{ marginRight: '50px' }} value="0">
                운동시간
              </Radio.Button>

              <Radio.Button value="1">칼로리</Radio.Button>
            </Radio.Group>
          </Row>
          <Row justify="center">
            <Col>
              {' '}
              <ReactApexChart options={options} series={series} type="bar" height={350} width={390} />
            </Col>
          </Row>
        </Col>
      </Row> */}
    </Wrapper>
  );
};

export default WeeklyReport;

const Wrapper = styled.div`
  width: 450px;
`;
