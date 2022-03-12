import React from 'react';
import { Row, Col, Spin } from 'antd';
const MyPageLoading: React.FunctionComponent = () => {
  return (
    <Row style={{ marginTop: '100px', width: '100%' }} justify="center">
      <Col>
        <Spin size="large" tip="Loading" />
      </Col>
    </Row>
  );
};
export default MyPageLoading;
