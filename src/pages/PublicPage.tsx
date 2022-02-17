import { shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../hooks/useStoreHooks';
import * as testActions from '../features/test';
import { Button } from 'antd';

const PublicPage = () => {
  const dispatch = useAppDispatch();

  const { value } = useAppSelector((state) => state.test, shallowEqual);

  return (
    <Div>
      <Button type="primary" onClick={() => dispatch(testActions.increment())}>
        +
      </Button>
      {value}
      <Button type="primary" onClick={() => dispatch(testActions.decrement())}>
        -
      </Button>
    </Div>
  );
};

export default PublicPage;

const Div = styled.div`
  border: 3px solid red;
  padding: 30px;

  div {
    border: 3px solid red;
    padding: 30px;
  }
`;
