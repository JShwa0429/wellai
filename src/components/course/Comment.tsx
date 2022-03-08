import { message, Rate } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { CourseApi } from 'api/CourseApi';
import { ReviewType } from 'type';
import Cookies from 'js-cookie';

const Comment: React.FunctionComponent<{ onAdd: (reviewData: ReviewType) => void }> = ({ onAdd }) => {
  const { id } = useParams();
  const [rateValue, setRateValue] = useState(3);
  const [textAreaValue, setTextAreaValue] = useState('');

  const handleCommentSubmit = () => {
    const course = CourseApi();

    course
      .postReview(id as string, { rating: rateValue, content: textAreaValue.trim(), course_id: id })
      .then((res) => {
        if (res.status === 429) message.info('방금 전에 댓글을 달았습니다. 잠시 후에 시도 해주세요.');
        else {
          onAdd(res.data);
          setTextAreaValue('');
          setRateValue(3);
        }
      })
      .catch((err) =>
        err.response.status === 400 ? message.info('이미 이 코스에 대한 리뷰가 있습니다!') : console.log(err.response),
      );
  };

  return (
    <Div>
      <Rating
        disabled={Cookies.get('refresh') ? false : true}
        allowHalf
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
  border: 0.5px solid black;
  padding: 2%;
  resize: none;
  ::placeholder {
    color: ${(props) => props.theme.border};
  }
`;
const Button = styled.button`
  width: 10%;
  color: white;
  background-color: ${(props) => props.theme.main};

  :disabled {
    background-color: ${(props) => props.theme.border};
    border: 0.4px solid grey;
  }
`;
