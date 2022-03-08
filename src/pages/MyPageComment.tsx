import styled from 'styled-components';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Rate, Card } from 'antd';
import { MyPageLayout } from 'components';
const { Meta } = Card;

const MyPageComment = () => {
  const [review, setReview] = useState([
    {
      id: 25,
      user_id: '자율적인패스트푸드원',
      created_at: '2022-03-07T00:21:10.389824+09:00',
      modified_at: '2022-03-07T00:21:10.390161+09:00',
      content: '테스트 댓글 입니다',
      rating: 4,
      course_id: 3,
    },
  ]);

  const getMyReview = async () => {
    const result = await axios.get('/course/3/myreview');
    console.log(result);
    setReview(result.data);
  };
  useEffect(() => {
    getMyReview();
    return;
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
            <Col span={22}>
              <Row
                style={{
                  marginBottom: '30px',
                }}
              >
                <Col>차차님의 댓글</Col>
              </Row>
              {review.map((item, index) => {
                return (
                  <Row key={item.id}>
                    <Col span={24}>
                      <Card hoverable style={{ borderRadius: '5px', width: '100%' }}>
                        <Row align="middle">
                          <Col>
                            <Rate disabled defaultValue={2} style={{ color: '#ff7273' }} />
                          </Col>
                          <Col>{item.created_at}</Col>
                        </Row>
                        <Row>
                          <Col>{'코스제목'}</Col>
                          <Col>{item.content}</Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MyPageComment;

const Wrapper = styled.div``;
