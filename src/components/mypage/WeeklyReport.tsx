import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Button } from 'antd';

import styled from 'styled-components';

const WeeklyReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Row>
        <Col>주간 레포트</Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            backgroundColor: 'rgb(247, 247, 247)',
            padding: '20px 30px',
            height: '500px',
          }}
        >
          <Row justify="space-around">
            <Col>
              <Button style={{ width: '100px' }} size="large">
                운동량
              </Button>
            </Col>
            <Col>
              <Button style={{ width: '100px' }} size="large">
                칼로리
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>차트</Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default WeeklyReport;

const Wrapper = styled.div`
  width: 450px;
`;
