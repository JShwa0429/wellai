import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// export type ReviewProps = {
//   id: string;
//   user_id: string;
//   created_at: string;
//   modified_at: string;
//   content: string;
//   rating: number;
//   course_id: string;
// };

export type LoadingProps = {
  isLoading: boolean;
};

const Review: React.FunctionComponent<LoadingProps> = ({ isLoading }) => {
  const [countDown, setCountDown] = useState(3);
  useEffect(() => {
    if (countDown > 0) setTimeout(() => setCountDown((current) => current - 1), 1000);
  }, [countDown]);
  return (
    <Wrapper isLoading={isLoading}>
      <Row style={{ height: '100vh' }} justify="center" align="middle">
        <Col>
          <Row justify="center">
            <Col style={{}}>
              <Spin size="large" />
            </Col>
          </Row>
          <Row>
            <Col style={{ fontSize: '30px', marginTop: '50px' }}>{countDown}초 뒤에 운동이 시작됩니다 !</Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Review;
interface Wrapper {
  isLoading: boolean;
}
const Wrapper = styled.div<Wrapper>`
  display: ${(props) => {
    return props.isLoading ? 'block' : 'none';
  }};
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 999;
  .ant-spin-dot {
    width: 150px;
    height: 150px;
  }
  i.ant-spin-dot-item {
    width: 70px;
    height: 70px;
  }
`;
