import { Rating } from './Comment';
import styled from 'styled-components';
export type ReviewProps = {
  id: string;
  user_id: string;
  created_at: string;
  modified_at: string;
  content: string;
  rating: number;
  course_id: string;
};
const Review: React.FunctionComponent<ReviewProps> = ({ user_id, rating, content }) => {
  return (
    <Div>
      <div>
        <b>{user_id}</b>
        <Rating defaultValue={rating} disabled />
      </div>
      <div className="comment">{content}</div>
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
