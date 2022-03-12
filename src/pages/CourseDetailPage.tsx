import { SmileTwoTone } from '@ant-design/icons';
import { CourseApi } from 'api';
import { Comment, ReviewDiv, CourseExplain } from 'components';
import { ReviewType } from 'type';
import { detailResponse } from 'api/common';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Pagination } from 'antd';
const CourseDetailPage = () => {
  const { id } = useParams();
  const [reviewData, setReviewData] = useState<ReviewType[]>([]);
  const [data, setData] = useState<detailResponse | null>(null);
  const [ordering, setOrdering] = useState<string>('-created_at');
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const cut = 5;

  async function getReview() {
    const course = CourseApi();
    await course.getReview(id as string, pageNumber, ordering).then((res) => {
      console.log(res.data);
      setReviewData(res.data.results);
    });
  }

  useEffect(() => {
    getReview();
  }, [pageNumber, ordering]);

  useEffect(() => {
    async function getDetailInformation() {
      const course = CourseApi();
      await course.getDetailInformation(id).then((res) => {
        setData(res.data);
        setLoading(false);
      });
    }
    getDetailInformation();
  }, []);
  const handleAddReview = (Review: ReviewType) => {
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
    setPageNumber(1);
    setOrdering(event.currentTarget.id);
  };

  return (
    <Div>
      <CourseExplain />
      <div className="explain-below">
        <div className="explain">
          <div className="hr-exp">
            <h1>커리큘럼</h1>
          </div>
          <div className="content-exp">
            {data?.description.split('/n').map((line, i) => {
              const title = line.split(':')[0];
              const content = line.split(':')[1];
              return (
                <div key={i}>
                  <h3 key={'h - ' + { i }}>
                    <SmileTwoTone twoToneColor="#eb2f96" />
                    &nbsp;
                    {title}
                  </h3>
                  <span key={'k - ' + { i }}>
                    {content}
                    <br />
                    <br />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="review-sect">
          <div className="hr-sect">
            <h1>한줄평</h1>
          </div>
          <Comment onAdd={handleAddReview} />
          <DivOrdering>
            <button id="-rating" onClick={handleReviewOrdering}>
              평점 높은 순
            </button>
            <button id="rating" onClick={handleReviewOrdering}>
              평점 낮은 순
            </button>
            <button id="-created_at" onClick={handleReviewOrdering}>
              최신 순
            </button>
            <button id="created_at" onClick={handleReviewOrdering}>
              오래된 순
            </button>
          </DivOrdering>
          <ReviewDiv reviewData={reviewData} loading={loading} onRemove={handleRemoveReview} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {reviewData.length > 0 && (
              <Pagination
                current={pageNumber}
                onChange={(page) => setPageNumber(page)}
                defaultCurrent={1}
                total={data?.count_review}
                pageSize={cut}
                style={{ margin: '2em 0' }}
              />
            )}
          </div>
        </div>
      </div>
    </Div>
  );
};

export default CourseDetailPage;
const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10em;
  .explain-below {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 1em 0;
    padding: 0 160px;
  }
  .explain {
    width: 50%;
    padding-right: 20px;
    .hr-exp h1 {
      margin-bottom: 25px;
    }
  }

  .review-sect {
    width: 50%;
    padding-left: 20px;
    .hr-sect {
      width: 100%;
      display: flex;
      flex-basis: 100%;
      align-items: center;
      color: rgba(0, 0, 0, 0.35);
      h1 {
        margin-bottom: 0;
      }
    }
    //   .hr-sect::before,
    //   .hr-sect::after {
    //     content: '';
    //     flex-grow: 1;
    //     background: rgba(0, 0, 0, 0.35);
    //     height: 1px;
    //     font-size: 0px;
    //     line-height: 0px;
    //     margin: 0px 16px;
    //   }
    // }
  }
`;
const DivOrdering = styled.div`
  width: 300px;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
`;
