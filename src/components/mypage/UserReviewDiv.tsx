import { Empty, Pagination } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserReview } from '.';
import { UserReviewType } from 'type';

const ReviewDiv: React.FunctionComponent<{
  reviewData: UserReviewType[];
  loading: boolean;
  onRemove: (id: string) => void;
}> = ({ reviewData, onRemove, loading }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const cut = 5;
  return (
    <Div>
      {reviewData.map((data: UserReviewType, idx: number) => {
        return (
          pageNumber * cut > idx &&
          idx > (pageNumber - 1) * cut - 1 && (
            // <Link to={`../../course/${data.course_id.id}`}>
            //   <UserReview {...data} onRemove={onRemove} key={idx} />
            // </Link>
            <UserReview {...data} onRemove={onRemove} key={idx} />
          )
        );
      })}
      {!loading && reviewData.length < 1 && (
        <>
          {' '}
          <Empty style={{ marginTop: '50px' }} description={``} />
          <p style={{ textAlign: 'center' }}>
            댓글 기록이 없으시네요. <br />첫 수강 후기를 남겨 볼까요?
          </p>
        </>
      )}
      {reviewData.length > 0 && (
        <Pagination
          current={pageNumber}
          onChange={(page) => setPageNumber(page)}
          defaultCurrent={1}
          total={reviewData.length}
          pageSize={cut}
          style={{ margin: '2em 0' }}
        />
      )}
    </Div>
  );
};
export default ReviewDiv;

const Div = styled.div`
  width: 100%;
  margin: 1em 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    width: 100%;
  }
`;
