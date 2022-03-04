import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, DatePicker } from 'antd';
import moment from 'moment';

import styled from 'styled-components';

const MonthlyReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Row>
        <Col>월간 레포트</Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{
            backgroundColor: 'rgb(247, 247, 247)',
            padding: '30px 30px',
            height: '500px',
          }}
        >
          <Row justify="center">
            <Col>
              <DatePicker picker="month" defaultValue={moment()} />
            </Col>
          </Row>
          <Row>
            <Col>122시간 45분</Col>
          </Row>
          <Row>
            <Col>8123kcal을 태우셨어용</Col>
          </Row>
          <Row>
            <Col>목표달성률</Col>
          </Row>
          <Row>
            <Col>차트</Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default MonthlyReport;

const Wrapper = styled.div`
  width: 450px;
`;
