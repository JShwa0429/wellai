import { useEffect, useState, useMemo } from 'react';
import { Row, Col, Radio, Statistic } from 'antd';
import { ClockCircleOutlined, DashboardOutlined } from '@ant-design/icons';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import styled from 'styled-components';
import { MyPageApi } from 'api';
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
    async function getRecordsYear() {
      const mypage = MyPageApi();
      await mypage.getRecordsYear().then((res) => {
        const data = res.data;
        setYearlyRecord({
          ...data[0],
          year_exercise_duration: Number((data[0].year_exercise_duration / 60).toFixed(2)),
          months_exercise_duration: data[0].months_exercise_duration.map((item) => ({
            ...item,
            total: Number(Math.floor(item.total / 60).toFixed(2)),
          })),
        });
      });
    }
    getRecordsYear();
  };

  useEffect(() => {
    getYearlyReport();
  }, []);

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

  const yearlyOptions: ApexOptions = {
    chart: {
      width: '100%',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 4,
      curve: 'smooth',
    },
    markers: {
      size: 1,
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
  const yearlySeries = [
    {
      name: !type ? '운동시간' : '칼로리',
      data: !type ? MonthlyRecordTime : MonthlyRecordCalories,
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
        <Col>올해의 피 땀 눈물</Col>
      </Row>
      <Row
        style={{
          backgroundColor: 'rgb(247, 247, 247)',
          padding: '10px 30px',
          height: '260px',
        }}
      >
        <Col span={4}>
          <Col style={{ marginTop: '60px' }}>
            <Statistic
              title="운동시간(분)"
              value={yearlyRecord?.year_exercise_duration}
              // value={yearlyRecord.year_exercise_duration ? 0 : yearlyRecord?.year_exercise_duration / 60}
              prefix={<ClockCircleOutlined />}
            />
          </Col>
          <Col style={{ marginTop: '15px' }}>
            <Statistic title="칼로리" value={yearlyRecord?.year_calories} prefix={<DashboardOutlined />} />
          </Col>
        </Col>
        <Col span={19}>
          <Row justify="center">
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
            <Col>
              <ReactApexChart options={yearlyOptions} series={yearlySeries} type="line" width={750} height={180} />
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
