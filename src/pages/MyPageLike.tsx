import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Row, Col, Button, Input, Card } from 'antd';
import { MyPageLayout } from 'components';
import { HeartFilled } from '@ant-design/icons';

const { Meta } = Card;

const MyPageLike = () => {
  // const [record, setRecord] = useState({ month_exercise_time: 40, month_calories: 20 });
  const [courseList, setCourseList] = useState([]);
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);

  useEffect(() => {
    // const getMonthlyReport = async () => {
    // const result = await axios.get('/users/records/month/', { params: { month: date.month, year: date.year } });
    // const { month_exercise_time, month_calories } = result.data[0];
    // setRecord({ month_exercise_time, month_calories });
    // };
  }, []);
  return (
    <Wrapper>
      <Row
        style={{
          width: '100%',
          minWidth: '1350px',
          maxWidth: '1600px',
          margin: '0 auto',
        }}
      >
        <Col>
          <MyPageLayout />
        </Col>
        <Col
          style={{
            width: 'calc(100% - 332px)',
          }}
        >
          <Row
            style={{
              paddingTop: '30px',
              paddingLeft: '50px',
            }}
          >
            <Col>
              <Row
                style={{
                  marginBottom: '30px',
                }}
              >
                <Col>좋아요 보관함</Col>
              </Row>
              <Row>
                <Col>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                    <Row
                      style={{
                        marginBottom: '20px',
                      }}
                    >
                      <Col>
                        <img style={{ width: '100%' }} src="/image/image6.png" alt="" />
                      </Col>

                      <HeartFilled
                        style={{
                          position: 'absolute',
                          top: 15,
                          right: 15,
                          fontSize: '20px',
                          color: '#ff7273',
                        }}
                      />
                    </Row>
                    <Row>
                      <Col>
                        <Row>
                          <Col>절대빠진다, 하루 1시간 복부 군살제거</Col>
                        </Row>
                        <Row>
                          <Col>3주 / 주3회 / 60분</Col>
                        </Row>
                        <Row>
                          <Col> #초중급 #군살 #다이어트</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MyPageLike;

const Wrapper = styled.div``;
