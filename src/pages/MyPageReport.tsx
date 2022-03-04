import styled from 'styled-components';
import { Row, Col, Button, Input } from 'antd';
import { MyPageLayout, MonthlyReport, WeeklyReport } from 'components';

const MyPageReport = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);

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
              paddingTop: '30px',
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
