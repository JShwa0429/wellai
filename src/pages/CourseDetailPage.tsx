import { CourseApi } from 'api/CourseApi';
import { Comment, ReviewDiv, CourseExplain } from 'components';
import { ReviewProps } from 'components/course/Review';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
const CourseDetailPage = () => {
  const { id } = useParams();
  const [reviewData, setReviewData] = useState<ReviewProps[]>([]);

  useEffect(() => {
    const course = CourseApi();
    course
      .getReview(id as string)
      .then((res) => {
        setReviewData(res.data.results);
      })
      .catch((err) => console.log(err.response));
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

  return (
    <Div>
      <CourseExplain />
      <div className="hr-sect">
        <h1>코스 후기</h1>
      </div>
      <Comment onAdd={handleAddReview} />
      <ReviewDiv reviewData={reviewData} onRemove={handleRemoveReview} />
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
  .hr-sect {
    width: 90%;
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 0.35);
    margin: 1em 0px;
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
`;
