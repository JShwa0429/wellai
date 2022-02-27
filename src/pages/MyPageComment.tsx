import styled from 'styled-components';
import { Row, Col, Button, Input } from 'antd';

import MypageLayout from 'components/mypage/MyPageLayout';

const MyPageReport = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);

  return (
    <Wrapper>
      <Row>
        <Col>
          <MypageLayout />
        </Col>
        <Col>dasdas</Col>
      </Row>
    </Wrapper>
  );
};

export default MyPageReport;

const Wrapper = styled.div``;
