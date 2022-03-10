import { Empty, Pagination } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import Review from './Review';
import { ReviewType } from 'type';

const ReviewDiv: React.FunctionComponent<{
  loading: boolean;
  reviewData: ReviewType[];
  onRemove: (id: string) => void;
}> = ({ reviewData, onRemove, loading }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const cut = 5;
  return (
    <Div>
      {reviewData.map((data: ReviewType, idx: number) => {
        return (
          pageNumber * cut > idx &&
          idx > (pageNumber - 1) * cut - 1 && <Review {...data} onRemove={onRemove} key={idx} />
        );
      })}
      {!loading && reviewData.length < 1 && (
        <>
          <Empty style={{ marginTop: '20px' }} description={``} />
          <p style={{ textAlign: 'center' }}>
            등록된 강의 리뷰가 없습니다
            <br /> 첫 리뷰를 남겨주세요
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
  border-top: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
