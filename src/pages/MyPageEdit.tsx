// import { Spin, Alert, Row, Col, Button, Divider, Menu } from 'antd';
// import { shallowEqual } from 'react-redux';
import styled from 'styled-components';
// import { useAppSelector, useAppDispatch } from '../hooks/useStoreHooks';
// import * as testActions from '../features/test';

import { MyPageLayout } from 'components';
const MyPageEdit = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);

  return (
    <Wrapper>
      <MyPageLayout />
    </Wrapper>
  );
};

export default MyPageEdit;

const Wrapper = styled.div``;
