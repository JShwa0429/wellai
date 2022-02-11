import { useState } from 'react';
import { Count } from 'components';
import styled from 'styled-components';
const CountPage = () => {
  const [count, setCount] = useState(0);
  return (
    <Div>
      <h1>{count}</h1>
      <Count count={count} setCount={setCount} />
    </Div>
  );
};

export default CountPage;

const Div = styled.div`
  border: 3px solid red;
  padding: 30px;
  div {
    border: 3px solid red;
    padding: 30px;
  }
`;
