import { Rate } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
const Comment = () => {
  const [rateValue, setRateValue] = useState(3);
  const [textAreaValue, setTextAreaValue] = useState('');
  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault;
    console.log(rateValue, textAreaValue);
  };
  return (
    <Div>
      <Rating allowHalf defaultValue={rateValue} onChange={setRateValue} style={{ marginRight: 'auto' }} />
      <Form onSubmit={handleCommentSubmit}>
        <TextArea
          value={textAreaValue}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setTextAreaValue(event.target.value)}
          placeholder="코스 후기를 입력해주세요."
        />
        <Button>후기 등록</Button>
      </Form>
    </Div>
  );
};

export default Comment;

const Div = styled.div`
  width: 80%;
  margin: 1em 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 80vw;
  height: 8em;
`;

export const Rating = styled(Rate)`
  color: ${(props) => props.theme.main};
`;

const TextArea = styled.textarea`
  width: 90%;
  border: 0.5px solid black;
  padding: 2%;

  ::placeholder {
    color: ${(props) => props.theme.border};
  }
`;
const Button = styled.button`
  width: 10%;
  color: white;
  background-color: ${(props) => props.theme.main};
`;
