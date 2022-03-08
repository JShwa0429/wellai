import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Button, Radio, DatePicker } from 'antd';
import ReactApexChart from 'react-apexcharts';

import styled from 'styled-components';
import { MyPageApi } from 'api/MyPageApi';
import { record, reportMonth } from 'api/common';
import moment, { Moment } from 'moment';

const WeeklyReport = () => {
  const [monthlyRecord, setMonthlyRecord] = useState<reportMonth>();
  const [records, setRecords] = useState<record[]>([]);
  const [date, setDate] = useState({ month: Number(moment().format('MM')), year: Number(moment().format('YYYY')) });

  const [type, setType] = useState(0);

  const handleChange = async (value: Moment | null) => {
    if (value as Moment) {
      setDate({ month: Number(value?.format('M')), year: Number(value?.format('YYYY')) });
    }
  };

  useEffect(() => {
    getMonthlyReport();
  }, [date]);

  const category = useMemo(() => {
    const month = new Date(date.year, date.month, 0).getDate();
    let arr: number[] = [];
    for (let i = 1; i <= month; i++) {
      arr = arr.concat(i);
    }
    return arr;
  }, [date]);

  const getMonthlyReport = async () => {
    // const result = await axios.get('/users/records', { params: { month: date.month, year: date.year } });
    const mypage = MyPageApi();
    console.log(date.month, date.year);
    mypage
      .getRecordsMonth(date.month, date.year)
      .then((res) => {
        setMonthlyRecord(res.data[0]);
        setRecords(res.data[0].records);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    console.log(monthlyRecord);
  }, [monthlyRecord]);

  const DailyRecordTime = useMemo(() => {
    let count = 0;
    let arr: number[] = [];
    for (let i = 1; i <= category.length; i++) {
      if (records[count]?.day === i) {
        arr = arr.concat(records[count].exercise_duration ?? 0);
        count += 1;
      } else {
        arr = arr.concat(1);
      }
    }
    return arr;
  }, [category, records]);

  const DailyRecordCalories = useMemo(() => {
    let count = 0;
    let arr: number[] = [];
    for (let i = 1; i <= category.length; i++) {
      if (records[count]?.day === i) {
        arr = arr.concat(records[count].calories_total ?? 0);
        count += 1;
      } else {
        arr = arr.concat(1);
      }
    }
    return arr;
  }, [category, records]);

  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: category,
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
      labels: {
        show: false,
      },
      tickAmount: !type ? 1 : 50,
      min: 0,
      max: !type ? 24 : 500,
    },
    colors: ['#ff7273'],
  };
  const series = [
    {
      name: '운동시간',
      data: !type ? DailyRecordTime : DailyRecordCalories,
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
        <Col>{date.month}월 리포트</Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            backgroundColor: 'rgb(247, 247, 247)',
            padding: '20px 30px',
          }}
        >
          <Row>
            <DatePicker onChange={handleChange} picker="month" defaultValue={moment()} />
          </Row>
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
              <Radio.Button style={{ marginRight: '50px' }} value={0}>
                운동시간
              </Radio.Button>

              <Radio.Button value={1}>칼로리</Radio.Button>
            </Radio.Group>
          </Row>
          <Row justify="center">
            <Col>
              <ReactApexChart options={options} series={series} type="bar" height={300} width={750} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default WeeklyReport;

const Wrapper = styled.div`
  width: 1000px;
  height: 300px;
`;
