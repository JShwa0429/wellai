import { Empty, Row, Col, Spin } from 'antd';
import styled from 'styled-components';
import Review from './Review';
import { ReviewType } from 'type';

const ReviewDiv: React.FunctionComponent<{
  isReviewLoading: boolean;
  reviewData: ReviewType[];
  onRemove: (id: string) => void;
}> = ({ reviewData, onRemove, isReviewLoading }) => {
  return (
    <Div>
      {isReviewLoading ? (
        <Row style={{ marginTop: '20px' }}>
          <Col>
            <Spin size="large" tip="Loading" />
          </Col>
        </Row>
      ) : reviewData.length < 1 ? (
        <>
          <Empty style={{ marginTop: '20px' }} description={``} />
          <p style={{ textAlign: 'center' }}>
            등록된 강의 리뷰가 없습니다
            <br /> 첫 리뷰를 남겨주세요
          </p>
        </>
      ) : (
        reviewData.map((data: ReviewType, idx: number) => {
          return <Review {...data} onRemove={onRemove} key={idx} />;
        })
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
