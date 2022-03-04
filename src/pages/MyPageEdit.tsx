import { Row, Col, Button, Input, Card } from 'antd';
import { MyPageLayout } from 'components';
const { Meta } = Card;
// import { shallowEqual } from 'react-redux';
import styled from 'styled-components';
// import { useAppSelector, useAppDispatch } from '../hooks/useStoreHooks';
// import * as testActions from '../features/test';

const MyPageEdit = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);

  return (
    <Wrapper>
      <Row>
        <Col>
          <MyPageLayout />
        </Col>
        <Col></Col>
      </Row>
    </Wrapper>
  );
};

export default MyPageEdit;

const Wrapper = styled.div``;
