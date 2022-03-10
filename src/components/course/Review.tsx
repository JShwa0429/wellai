import { Rating } from './Comment';
import styled from 'styled-components';
import { FiDelete } from 'react-icons/fi';
import { CourseApi } from 'api';
import React from 'react';
import { ReviewType } from 'type';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export type EditReviewProps = {
  onRemove: (id: string) => void;
};

const Review: React.FunctionComponent<ReviewType & EditReviewProps> = ({ user_id, id, rating, content, onRemove }) => {
  const nickname = useSelector((state: RootState) => state.myPage.nickname);
  const removeReview = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    async function deleteReview() {
      const course = CourseApi();
      await course.deleteReview(id);
      location.reload();
    }
    deleteReview();
  };
  return (
    <Div>
      {user_id === nickname && (
        <div className="close">
          <button onClick={removeReview}>
            <FiDelete size="1.5em" />
          </button>
        </div>
      )}

      <div>
        <b>{user_id}</b>
        <Rating value={rating} disabled />
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
  position: relative;
  b {
    font-size: 1.5em;
    margin-right: 1em;
  }

  .comment {
    margin-top: 1em;
  }

  .close {
    position: absolute;
    right: 3%;
  }
`;
