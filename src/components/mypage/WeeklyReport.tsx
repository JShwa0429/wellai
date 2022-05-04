import { useEffect, useMemo, useState } from 'react';
import { Row, Col, Statistic, Radio, DatePicker } from 'antd';
import { ClockCircleOutlined, DashboardOutlined, FastForwardFilled } from '@ant-design/icons';
import ReactApexChart from 'react-apexcharts';

import styled from 'styled-components';
import { MyPageApi } from 'api';
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
    async function getRecordsMonth() {
      const mypage = MyPageApi();
      await mypage.getRecordsMonth(date.month, date.year).then((res) => {
        const data = res.data[0];
        const revisedData = {
          ...data,

          month_exercise_time: Math.floor(data.month_exercise_time / 60),
          records: data.records.map((item) => ({
            ...item,
            exercise_duration: Math.floor(item.exercise_duration / 60),
          })),
        };
        setMonthlyRecord(revisedData);
        setRecords(revisedData.records);
      });
    }
    getRecordsMonth();
  };

  const DailyRecordTime = useMemo(() => {
    let count = 0;
    let arr: number[] = [];
    for (let i = 1; i <= category.length; i++) {
      if (records[count]?.day === i) {
        arr = arr.concat(records[count].exercise_duration ?? 0);
        count += 1;
      } else {
        arr = arr.concat(0);
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
        arr = arr.concat(0);
      }
    }
    return arr;
  }, [category, records]);

  const options = {
    chart: {
      id: 'basic-bar',
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: category,
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
      // tickAmount: !type ? 1 : 50,
      // min: 0,
      // max: !type ? 5 : 500,
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
          marginTop: '10px',
          marginBottom: '5px',
          fontSize: '20px',
        }}
      >
        <Col>{date.month}월 운동 기록</Col>
      </Row>
      <Row
        style={{
          backgroundColor: 'rgb(247, 247, 247)',
          padding: '10px 30px',
          // height: '300px',
        }}
      >
        <Col span={4}>
          <Col style={{ marginTop: '5px' }}>
            <DatePicker onChange={handleChange} picker="month" defaultValue={moment()} />
          </Col>
          <Col style={{ marginTop: '30px' }}>
            <Statistic
              title="운동시간(분)"
              value={monthlyRecord?.month_exercise_time}
              prefix={<ClockCircleOutlined />}
            />
          </Col>
          <Col style={{ marginTop: '15px' }}>
            <Statistic title="칼로리" value={monthlyRecord?.month_calories} prefix={<DashboardOutlined />} />
          </Col>
        </Col>
        <Col span={19}>
          <Row justify="space-around">
            <Radio.Group
              buttonStyle="solid"
              // defaultValue="0"
              size="middle"
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
              <ReactApexChart options={options} series={series} type="bar" width={750} height={200} />
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
