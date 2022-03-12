import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import styled from 'styled-components';
import { Rating } from '../course/Comment';
import { FiDelete } from 'react-icons/fi';
import { CourseApi } from 'api';
import { UserReviewType } from 'type';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export type EditReviewProps = {
  onRemove: (id: string) => void;
};

const Review: React.FunctionComponent<UserReviewType & EditReviewProps> = ({
  course_id,
  id,
  rating,
  content,
  onRemove,
}) => {
  const navigate = useNavigate();
  const removeReview = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    async function deleteReview() {
      const course = CourseApi();
      await course.deleteReview(id).then(() => onRemove(id));
    }
    deleteReview();
  };
  return (
    <Row style={{ width: '100%' }}>
      <Col span={24}>
        <Card hoverable style={{ marginBottom: '20px', width: '100%' }} onClick={() => navigate(`/course/${id}`)}>
          <Row justify="space-between">
            <Col>
              <Rating value={rating} disabled />
            </Col>
            <Col>
              <Button
                onClick={removeReview}
                style={{ zIndex: 999 }}
                size="small"
                type="primary"
                shape="circle"
                icon={<CloseOutlined />}
              />

              {/* <button onClick={removeReview}>
              <FiDelete size="1.5em" />
            </button> */}
            </Col>
          </Row>
          <Row>
            <Col>
              <b>{course_id.course_name}</b>
              {content}
            </Col>
          </Row>
        </Card>
        {/* 
      <Div>
        <div className="close"></div>

        <div>
          <Rating value={rating} disabled />
        </div>
        <div className="comment">
          <b>{course_id.course_name}</b>
          {content}
        </div>
        
      </Div> */}
      </Col>
    </Row>
  );
};

export default Review;

const Div = styled.div`
  width: 100%;
  padding: 2%;
  border-bottom: 1px solid ${(props) => props.theme.border};
  position: relative;
  b {
    color: ${(props) => props.theme.main};
    font-size: 1.5em;
    margin-right: 1em;
  }

  .comment {
    margin-top: 0.5em;
  }

  .close {
    position: absolute;
    right: 3%;
  }
`;
