import { useEffect, useState } from 'react';
import { Row, Col, DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import ReactApexChart from 'react-apexcharts';

import styled from 'styled-components';
import { MyPageApi } from 'api/MyPageApi';
import { reportMonth } from 'api/common';

// export type RecordsType = {
//   id:string;
//   email:string;
//   nickname:string;
//   month_exercise_time: number;
//   month_calories: number;
//   records : {  
//     id:string;
//     exercise_day:number;
//     created_at:string;
//     modified_at:string;
//     exercise_date:string;
//     exercise_week:number;
//     exercise_duration:number;
//     calories_total:number;
//   }[];
// };


const MonthlyReport = () => {
  const [record, setRecord] = useState<reportMonth>();
  const [date, setDate] = useState({ month: Number(moment().format('MM')), year: Number(moment().format('YYYY')) });
  const handleChange = async (value: Moment | null) => {
    if (value?.format('MM') !== undefined) {
      setDate({ month: Number(value?.format('MM')), year: Number(value?.format('YYYY')) });
      getYearlyReport();
    }
  };
  const getYearlyReport = async () => {
    // const result = await axios.get('/users/records', { params: { month: date.month, year: date.year } });
    const mypage = MyPageApi();
    mypage
      .getRecordsMonth(date.month, date.year)
      .then((res) => {
        const data = res.data;
        setRecord(data[0]);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    getYearlyReport();
  }, []);

  useEffect(() => {
    console.log(record);
  }, [record]);

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
          {/* <Row>
            <Col>
              {Math.floor(record.month_exercise_time / 60) ? `${Math.floor(record.month_exercise_time / 60)}시간` : ``}
              {record.month_exercise_time % 60}분
            </Col>
          </Row>
          <Row>
            <Col>{record.month_calories}kcal을 태우셨어용</Col>
          </Row>
          <Row>
            <Col>목표달성률</Col>
          </Row>
          <Row>
            <Col>
              <ReactApexChart options={options} series={series} type="bar" height={150} width={340} />
            </Col>
          </Row> */}
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MonthlyReport;

const Wrapper = styled.div`
  width: 450px;
`;
