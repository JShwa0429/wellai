import styled from 'styled-components';

import { Row, Col } from 'antd';
import { MyPageLayout, MonthlyReport, WeeklyReport } from 'components';

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
            <Col>
              <Row style={{ marginTop: '25px' }}>
                <Col>
                  <MonthlyReport />
                </Col>
              </Row>
              <Row style={{ marginTop: '25px' }}>
                <Col>
                  <WeeklyReport />
                </Col>
              </Row>

              <Row
                style={{
                  backgroundColor: '#fff7d8',
                  marginTop: '30px',
                  padding: '20px 25px',
                  borderRadius: '10px',
                  marginBottom: '100px',
                }}
              >
                <Col>
                  <Row
                    style={{
                      color: '#6f6e6f',
                      fontSize: '15px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    align="middle"
                  >
                    <Col>💡 주의 사항</Col>
                  </Row>
                  <Row>
                    <Col
                      style={{
                        fontWeight: 'bold',
                        paddingLeft: '17px',
                      }}
                    >
                      <u>내 정보 변경</u>에서 체형을 정확하게 입력해주셔야 <u>칼로리 계산</u>이 가능합니다
                    </Col>
                  </Row>
                </Col>
              </Row>
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
  height: max-content;
  min-height: calc(100vh - 80px);
`;
