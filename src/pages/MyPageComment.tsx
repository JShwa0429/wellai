import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { MyPageLayout } from 'components';
import { CourseApi } from 'api/CourseApi';
import { ReviewType } from 'type';
import { UserReviewDiv } from 'components';

const MyPageComment = () => {
  const [reviewData, setReviewData] = useState<ReviewType[]>([]);
  useEffect(() => {
    const course = CourseApi();
    course
      .getUserReview()
      .then((res) => {
        console.log(res.data);
        setReviewData(res.data);
      })
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
            </Col>
            <UserReviewDiv reviewData={reviewData} onRemove={handleRemoveReview} />
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MyPageComment;

const Wrapper = styled.div``;
