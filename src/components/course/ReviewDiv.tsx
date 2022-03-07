import { Pagination } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import Review, { ReviewProps } from './Review';

const ReviewDiv: React.FunctionComponent<{ reviewData: ReviewProps[]; onRemove: (id: string) => void }> = ({
  reviewData,
  onRemove,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  return (
    <Div>
      {reviewData.map((data: ReviewProps, idx: number) => {
        return (
          pageNumber * 10 > idx && idx > (pageNumber - 1) * 10 - 1 && <Review {...data} onRemove={onRemove} key={idx} />
        );
      })}
      <Pagination
        current={pageNumber}
        onChange={(page) => setPageNumber(page)}
        defaultCurrent={1}
        total={reviewData.length}
        pageSize={10}
        style={{ margin: '2em 0' }}
      />
    </Div>
  );
};
export default ReviewDiv;

const Div = styled.div`
  width: 80%;
  margin: 1em 0;
  border-top: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
