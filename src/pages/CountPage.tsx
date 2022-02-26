import { useState } from 'react';
import { Count } from 'components';
import { shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../hooks/useStoreHooks';
import * as testActions from '../features/test';
import { Button } from 'antd';

const CountPage = () => {
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();

  const { value } = useAppSelector((state) => state.test, shallowEqual);

  return (
    <Div>
      <Count count={count} setCount={setCount} />
      <Button type="primary" onClick={() => dispatch(testActions.increment())}>
        +
      </Button>
      {value}ㅁㄴㅇ
      <Button type="primary" onClick={() => dispatch(testActions.decrement())}>
        -
      </Button>
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
