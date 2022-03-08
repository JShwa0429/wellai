import { ApiFilled } from '@ant-design/icons';
import { CourseApi } from 'api/CourseApi';
import { Comment, ReviewDiv, CourseExplain } from 'components';
import { ReviewProps } from 'components/course/Review';
import { detailResponse } from 'api/common';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
const CourseDetailPage = () => {
  const { id } = useParams();
  const [reviewData, setReviewData] = useState<ReviewProps[]>([]);
  const [data, setData] = useState<detailResponse | null>(null);

  useEffect(() => {
    const course = CourseApi();
    course
      .getReview(id as string)
      .then((res) => {
        setReviewData(res.data.results);
      })
      .catch((err) => console.log(err.response));
  }, []);
  useEffect(() => {
    const course = CourseApi();
    course
      .getDetailInformation(id)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleAddReview = (Review: ReviewProps) => {
    setReviewData((current) => {
      const newReviewData = [...current];
      newReviewData.push(Review);
      return newReviewData;
    });
  };

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

  const handleReviewOrdering = (event: React.MouseEvent<HTMLButtonElement>) => {
    const ordering = event.currentTarget.id;
    const course = CourseApi();
    course
      .getReviewOrdering(id as string, ordering)
      .then((res) => {
        setReviewData(res.data.results);
        console.log(res.data.results);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <Div>
      <CourseExplain />
      <div className="explain-below">
        <div className="explain">
          {data?.description.split('/n').map((line, i) => {
            return (
              <span key={i}>
                {line}
                <br />
                <br />
              </span>
            );
          })}
        </div>
        <div className="review-sect">
          <div className="hr-sect">
            <h1>코스 후기</h1>
          </div>
          <Comment onAdd={handleAddReview} />
          <DivOrdering>
            <button id="rating" onClick={handleReviewOrdering}>
              평점 높은 순
            </button>
            <button id="-rating" onClick={handleReviewOrdering}>
              평점 낮은 순
            </button>
            <button id="-created_at" onClick={handleReviewOrdering}>
              최신 순
            </button>
            <button id="created_at" onClick={handleReviewOrdering}>
              오래된 순
            </button>
          </DivOrdering>
          <ReviewDiv reviewData={reviewData} onRemove={handleRemoveReview} />
        </div>
      </div>
    </Div>
  );
};

export default CourseDetailPage;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  }
  .explain-below {
    display: flex;
    flex-direction: row;
    width: 100vw;
    margin: 1em 0;
    padding: 0 160px;

    .explain {
      margin-top: 1em;
      width: 50%;
      padding-right: 20px;
    }
    .review-sect{
      width: 50%;
      padding-left: 20px;
      .hr-sect {
        width: 100%;
        display: flex;
        flex-basis: 100%;
        align-items: center;
        color: rgba(0, 0, 0, 0.35);
        h1{
          margin : 0 2em;
        }
      }
      .hr-sect::before,
      .hr-sect::after {
        content: '';
        flex-grow: 1;
        background: rgba(0, 0, 0, 0.35);
        height: 1px;
        font-size: 0px;
        line-height: 0px;
        margin: 0px 16px;
      }
    }
  }

`;

const DivOrdering = styled.div`
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  width: 50%;
`;
