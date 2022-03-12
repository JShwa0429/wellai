import { message, Rate } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { CourseApi } from 'api';
import { ReviewType } from 'type';
import Cookies from 'js-cookie';
import { WindowsFilled } from '@ant-design/icons';

const Comment: React.FunctionComponent<{ onAdd: (reviewData: ReviewType) => void }> = ({ onAdd }) => {
  const { id } = useParams();
  const [rateValue, setRateValue] = useState(3);
  const [textAreaValue, setTextAreaValue] = useState('');

  const handleCommentSubmit = () => {
    async function PostReview() {
      const course = CourseApi();
      await course
        .postReview(id as string, { rating: rateValue, content: textAreaValue.trim(), course_id: id })
        .then((res) => {
          if (res.status === 429) message.info('방금 전에 댓글을 달았습니다. 잠시 후에 시도 해주세요.');
          else {
            setTextAreaValue('');
            setRateValue(3);
            location.reload();
          }
        })
        .catch((err) => {
          if (err.response.status === 400) message.info('이미 이 코스에 대한 리뷰가 있습니다!');
        });
    }
    PostReview();
  };

  return (
    <Div>
      <Rating
        disabled={Cookies.get('refresh') ? false : true}
        defaultValue={rateValue}
        onChange={setRateValue}
        style={{ marginRight: 'auto' }}
      />
      <Form>
        <TextArea
          disabled={Cookies.get('refresh') ? false : true}
          value={textAreaValue}
          maxLength={150}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setTextAreaValue(event.target.value)}
          placeholder="수강 후기를 남겨 주세요."
        />
        <Button
          type="button"
          disabled={Cookies.get('refresh') ? false : true}
          onClick={() => {
            if (textAreaValue) handleCommentSubmit();
            else message.info('댓글을 입력해주세요');
          }}
        >
          후기 등록
        </Button>
      </Form>
    </Div>
  );
};

export default Comment;

const Div = styled.div`
  width: 100%;
  margin: 1em 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 6em;
`;

export const Rating = styled(Rate)`
  color: ${(props) => props.theme.main};
`;

const TextArea = styled.textarea`
  width: 90%;
  border: 0.1px solid black;
  padding: 2%;
  resize: none;
  ::placeholder {
    color: ${(props) => props.theme.border};
  }
  outline-color: #888;
`;
const Button = styled.button`
  width: 13%;
  color: white;
  background-color: ${(props) => props.theme.main};

  :disabled {
    background-color: ${(props) => props.theme.border};
    border: 0.4px solid grey;
  }
`;
