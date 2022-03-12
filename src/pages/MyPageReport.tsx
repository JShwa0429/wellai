import styled from 'styled-components';

import { Row, Col } from 'antd';
import { MyPageLayout, MonthlyReport, WeeklyReport } from 'components';
import { ExclamationCircleFilled } from '@ant-design/icons';

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
                // justify={'space-between'}
                style={{
                  backgroundColor: '#fff3c3',
                  marginTop: '30px',
                  padding: '20px 25px',
                  borderRadius: '10px',
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
                  >
                    {/* <ExclamationCircleFilled
                      style={{
                        marginRight: '5px',
                        color: 'red',
                      }}
                    /> */}
                    💡 주의 사항
                  </Row>
                  <Row>
                    <Col
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      <u>내 정보 변경</u>에서 체형을 정확하게 입력해주셔야 <u>칼로리 계산</u>이 가능합니다
                      {/* <br />
                      또한, 예약 신청 후 30분 안에 예약금을 입금하지 않으면 <u>예약이 취소</u>됩니다.
                      <br />
                      예약 관련 문제 발생시 010-4398-7759로 문의 부탁드립니다. */}
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
  height: 100vh;
`;

<Row
  // justify={'space-between'}
  style={{
    backgroundColor: '#FBE89A',
    padding: '16px 20px',
    marginBottom: '20px',
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
    >
      <ExclamationCircleFilled
        style={{
          marginRight: '5px',
          color: 'red',
        }}
      />{' '}
      주의 사항
    </Row>
    <Row>
      <Col
        style={{
          fontWeight: 800,
        }}
      >
        <u>환급은 기입하신 계좌번호를 통해 이루어집니다.</u> 정확하게 기입해주세요!
        <br />
        또한, 예약 신청 후 30분 안에 예약금을 입금하지 않으면 <u>예약이 취소</u>됩니다.
        <br />
        예약 관련 문제 발생시 010-4398-7759로 문의 부탁드립니다.
      </Col>
    </Row>
  </Col>
</Row>;
