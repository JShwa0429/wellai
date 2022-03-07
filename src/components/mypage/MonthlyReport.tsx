import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, DatePicker } from 'antd';
import moment, { Moment, MomentFormatSpecification } from 'moment';
import ReactApexChart from 'react-apexcharts';

import styled from 'styled-components';

const MonthlyReport = () => {
  const [record, setRecord] = useState({ month_exercise_time: 40, month_calories: 20 });
  const [date, setDate] = useState({ month: Number(moment().format('MM')), year: Number(moment().format('YYYY')) });
  const handleChange = async (value: Moment | null) => {
    if (value?.format('MM') !== undefined) {
      setDate({ month: Number(value?.format('MM')), year: Number(value?.format('YYYY')) });
      getMonthlyReport();
    }
  };
  const getMonthlyReport = async () => {
    const result = await axios.get('/users/records/month/', { params: { month: date.month, year: date.year } });
    const { month_exercise_time, month_calories } = result.data[0];
    // setRecord({ month_exercise_time, month_calories });
  };
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
      categories: ['운동시간', '칼로리'],
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
    },
    colors: ['#ff7273'],
  };
  const series = [
    {
      name: '운동시간',
      data: [record.month_exercise_time, record.month_calories],
    },
  ];
  useEffect(() => {
    getMonthlyReport();
  }, []);

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
              <DatePicker onChange={handleChange} picker="month" defaultValue={moment()} />
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
