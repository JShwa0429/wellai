import { useEffect, useState, useMemo } from 'react';
import { Row, Col, DatePicker, Radio } from 'antd';
import moment, { Moment } from 'moment';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import styled from 'styled-components';
import { MyPageApi } from 'api/MyPageApi';
import { reportYear } from 'api/common';

const MonthlyReport = () => {
  const [yearlyRecord, setYearlyRecord] = useState<reportYear>();
  const [date, setDate] = useState({ month: Number(moment().format('MM')), year: Number(moment().format('YYYY')) });
  const [type, setType] = useState(0);
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

  // 그래프 옵션
  const yearlyOptions: ApexOptions = {
    chart: {
      width: '100%',
    },
    stroke: {
      width: 4,
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#fdd835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },

    xaxis: {
      categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      tickAmount: 12,
      axisTicks: {
        show: true,
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
        show: true,
      },
    },
    grid: {
      borderColor: 'transparent',
    },
    yaxis: {
      tickAmount: 1,
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
    },
    colors: ['#ff7273'],
  };
  // 들어갈 데이터 값
  const yearlySeries = [
    {
      name: '운동시간',
      // data: !type ? YearlyRecordTime : YearlyRecordCalories,
      data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    },
  ];

  // const category = useMemo(() => {
  //   const month = new Date(date.year, date.month, 0).getDate();
  //   let arr: number[] = [];
  //   for (let i = 1; i <= month; i++) {
  //     arr = arr.concat(i);
  //   }
  //   return arr;
  // }, [date]);

  // const YearlyRecordTime = useMemo(() => {
  //   let count = 0;
  //   let arr: number[] = [];
  //   for (let i = 1; i <= category.length; i++) {
  //     if (yearlyRecord[count]?.day === i) {
  //       arr = arr.concat(yearlyRecord[count].exercise_duration ?? 0);
  //       count += 1;
  //     } else {
  //       arr = arr.concat(1);
  //     }
  //   }
  //   return arr;
  // }, [category, yearlyRecord]);

  // const YearlyRecordCalories = useMemo(() => {
  //   let count = 0;
  //   let arr: number[] = [];
  //   for (let i = 1; i <= category.length; i++) {
  //     if (yearlyRecord[count]?.day === i) {
  //       arr = arr.concat(yearlyRecord[count].calories_total ?? 0);
  //       count += 1;
  //     } else {
  //       arr = arr.concat(1);
  //     }
  //   }
  //   return arr;
  // }, [category, yearlyRecord]);
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
          padding: '10px 30px',
          height: '250px',
        }}
      >
        <Col span={5}>이만큼?!</Col>
        <Col span={19}>
          <Row justify="center">
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
            <Col>
              <ReactApexChart options={yearlyOptions} series={yearlySeries} type="line" width={750} height={200} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MonthlyReport;

const Wrapper = styled.div`
  width: 1000px;
`;
