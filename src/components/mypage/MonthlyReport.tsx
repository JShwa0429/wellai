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
  const [type, setType] = useState(0);

  const category = useMemo(() => {
    let arr: string[] = [];
    for (let i = 1; i <= 12; i++) {
      arr = arr.concat(`${i}월`);
    }
    return arr;
  }, []);

  const getYearlyReport = async () => {
    // const result = await axios.get('/users/records', { params: { month: date.month, year: date.year } });
    const mypage = MyPageApi();
    mypage
      .getRecordsYear()
      .then((res) => {
        const data = res.data;
        setYearlyRecord(data[0]);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    getYearlyReport();
  }, []);
  useEffect(() => {
    console.log(yearlyRecord);
  }, [yearlyRecord]);

  const MonthlyRecordCalories = useMemo(() => {
    let count = 0;
    let arr: number[] = [];
    for (let i = 1; i <= category.length; i++) {
      if (yearlyRecord?.months_calories[count]?.month === i) {
        arr = arr.concat(yearlyRecord?.months_calories[count].total ?? 0);
        count += 1;
      } else {
        arr = arr.concat(0);
      }
    }
    return arr;
  }, [category, yearlyRecord]);

  const MonthlyRecordTime = useMemo(() => {
    let count = 0;
    let arr: number[] = [];
    for (let i = 1; i <= category.length; i++) {
      if (yearlyRecord?.months_exercise_duration[count]?.month === i) {
        arr = arr.concat(yearlyRecord?.months_exercise_duration[count].total ?? 0);
        count += 1;
      } else {
        arr = arr.concat(0);
      }
    }
    return arr;
  }, [category, yearlyRecord]);

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
      categories: category,
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
      name: !type ? '운동시간' : '칼로리',
      // data: !type ? YearlyRecordTime : YearlyRecordCalories,
      data: !type ? MonthlyRecordCalories : MonthlyRecordTime,
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
                <Radio.Button style={{ marginRight: '50px' }} value={0}>
                  운동시간
                </Radio.Button>

                <Radio.Button value={1}>칼로리</Radio.Button>
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
