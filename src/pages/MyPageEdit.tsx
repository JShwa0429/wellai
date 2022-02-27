// import { Spin, Alert, Row, Col, Button, Divider, Menu } from 'antd';
// import { shallowEqual } from 'react-redux';
import styled from 'styled-components';
// import { useAppSelector, useAppDispatch } from '../hooks/useStoreHooks';
// import * as testActions from '../features/test';
import { Header } from 'components/headerTemp';

import MypageLayout from 'components/mypage/MyPageLayout';

const MyPageEdit = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);

  return (
    <Wrapper>
      <MypageLayout />
    </Wrapper>
  );
};

export default MyPageEdit;

const Wrapper = styled.div``;
