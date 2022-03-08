import { useEffect, useState } from 'react';
import { Row, Col, DatePicker, Radio } from 'antd';
import moment, { Moment } from 'moment';
import ReactApexChart from 'react-apexcharts';

import styled from 'styled-components';
import { MyPageApi } from 'api/MyPageApi';
import { reportYear } from 'api/common';

const MonthlyReport = () => {
  const [yearlyRecord, setYearlyRecord] = useState<reportYear>();
  const [date, setDate] = useState({ month: Number(moment().format('MM')), year: Number(moment().format('YYYY')) });
  const getYearlyReport = async () => {
    // const result = await axios.get('/users/records', { params: { month: date.month, year: date.year } });
    const mypage = MyPageApi();
    mypage
      .getRecordsYear()
      .then((res) => {
        const data = res.data;
        setYearlyRecord(data[0]);
        console.log(yearlyRecord);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    getYearlyReport();
  }, []);
  useEffect(() => {
    console.log(yearlyRecord);
  }, [yearlyRecord]);

  const yearlyOptions = {
    chart: {
      id: 'basic-bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
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
  const yearlySeries = [
    {
      name: '운동시간',
      // data: [record.month_exercise_time, record.month_calories],
    },
  ];

  const dailyOptions = {
    chart: {
      id: 'basic-bar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
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
  const dailySeries = [
    {
      name: '운동시간',
      // data: [record.month_exercise_time, record.month_calories],
    },
  ];

  return (
    <Wrapper>
      <Row
        style={{
          marginBottom: '20px',
          fontSize: '20px',
        }}
      >
        <Col>올해의 피 땀 눈물</Col>
      </Row>
      <Row
        style={{
          backgroundColor: 'rgb(247, 247, 247)',
          padding: '30px 30px',
          height: '250px',
        }}
      >
        <Col span={5}>이만큼?!</Col>
        <Col span={19}>
          <Row>
            <Col>
              {' '}
              <ReactApexChart options={yearlyOptions} series={yearlySeries} type="bar" height={250} width={390} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MonthlyReport;

const Wrapper = styled.div`
  width: 800px;
`;
