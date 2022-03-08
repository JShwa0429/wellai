import styled from 'styled-components';

import { Row, Col } from 'antd';
import { MyPageLayout, MonthlyReport, WeeklyReport } from 'components';
import { useEffect } from 'react';
import { MyPageApi } from 'api/MyPageApi';

const MyPageReport = () => {
  const mypage = MyPageApi();
  useEffect(() => {
    mypage
      .getRecordsYear()
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  }, []);
  return (
    <Wrapper>
      <Row
        style={{
          width: '100%',
          minWidth: '1350px',
          maxWidth: '1600px',
          margin: '0 auto',
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
          <Row
            justify="space-around"
            align="middle"
            style={{
              paddingTop: '60px',
            }}
          >
            <Col>
              <MonthlyReport />
            </Col>
            <Col>
              <WeeklyReport />
            </Col>
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
