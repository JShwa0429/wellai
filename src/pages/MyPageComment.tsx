import styled from 'styled-components';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Rate, Card } from 'antd';
import { MyPageLayout, ReviewDiv } from 'components';
import { CourseApi } from 'api/CourseApi';
import { reviewReponse } from 'api/common';
import { ReviewProps } from 'components/course/Review';
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

  const [reviewData, setReviewData] = useState<ReviewProps[]>([]);
  useEffect(() => {
    const course = CourseApi();
    course
      .getUserReview()
      .then((res) => setReviewData(res.data))
      .catch((err) => console.log(err.reponse));
  }, []);

  const handleRemoveReview = (id: string) => {
    setReviewData((current) => {
      const newReviewData = [];
      for (let i = 0; i < current.length; i++) {
        if (current[i].id === id) continue;
        newReviewData.push(current[i]);
      }
      return newReviewData;
    });
  };

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
                <Col>내 댓글</Col>
              </Row>
              <ReviewDiv reviewData={reviewData} onRemove={handleRemoveReview} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MyPageComment;

const Wrapper = styled.div``;
