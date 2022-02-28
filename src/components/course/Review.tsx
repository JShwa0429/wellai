import { Rating } from './Comment';
import styled from 'styled-components';
export type ReviewProps = {
  nickname: string;
  rate: number;
  comment: string;
};
const Review: React.FunctionComponent<ReviewProps> = ({ nickname, rate, comment }) => {
  return (
    <Div>
      <div>
        <b>{nickname}</b>
        <Rating defaultValue={rate} allowHalf disabled />
      </div>
      <div className="comment">{comment}</div>
    </Div>
  );
};

export default Review;

const Div = styled.div`
  width: 100%;
  padding: 2%;
  border-bottom: 1px solid ${(props) => props.theme.border};

  b {
    font-size: 1.5em;
    margin-right: 1em;
  }

  .comment {
    margin-top: 1em;
  }
`;
