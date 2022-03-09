import styled from 'styled-components';

import { Row, Col } from 'antd';
import { MyPageLayout, MonthlyReport, WeeklyReport } from 'components';
import { useEffect } from 'react';
import { MyPageApi } from 'api';

const MyPageReport = () => {
  return (
    <Wrapper>
      <Row
        justify="space-between"
        style={{
          width: '100%',
          minWidth: '1350px',
          maxWidth: '1600px',
        }}
      >
        <Col>
          <MyPageLayout />
        </Col>
        <Col
          style={{
            width: 'calc(100% - 332px)',
          }}
        >
          <Row justify="space-around" align="middle">
            <Row style={{ marginTop: '25px' }}>
              <MonthlyReport />
            </Row>
            <Row style={{ marginTop: '25px' }}>
              <WeeklyReport />
            </Row>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MyPageReport;

const Wrapper = styled.div`
  width: 100%;
`;
