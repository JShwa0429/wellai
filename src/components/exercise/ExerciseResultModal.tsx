import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Modal, Card, Progress, Button, Timeline, Divider } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { UserApi } from 'api';
import { useDispatch } from 'react-redux';
import { nicknameChange } from 'features/myPageSlice';

type Props = {
  isResultModalVisible: boolean;
  setIsResultModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  exerciseResultMap: { name: string; time: number }[];
  totalTimeCounter: number;
  totalTimeLimit: number;
  EXERCISE_TIME: number;
};

const ExerciseResultModal = ({
  setIsResultModalVisible,
  isResultModalVisible,
  exerciseResultMap,
  totalTimeCounter,
  totalTimeLimit,
  EXERCISE_TIME,
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(exerciseResultMap);
  // const onFinish = ({ email, password }: LoginForm) => {};
  const onCancel = () => {
    navigate('/');
  };
  return (
    <Modal width="500px" visible={isResultModalVisible} onCancel={onCancel} footer={null}>
      <Wrapper>
        <Row justify="space-around" align="middle" style={{ marginBottom: '30px', marginTop: '20px' }}>
          <Col style={{ fontSize: '25px' }}>
            <Row>
              <Col>{moment().format('YYYY년 MM월 DD일')}</Col>
            </Row>
            <Row justify="center">
              <Col style={{ fontStyle: 'italic' }}>헬스 레포트</Col>
            </Row>
          </Col>
          <Col style={{ marginRight: '20px' }}>
            {/* 총운동 시간: {totalTimeCounter} */}

            <Row style={{}}>
              <Col>
                <Progress
                  strokeColor={{
                    '0%': '#fabfa8',
                    '100%': '#ff7273',
                  }}
                  type="circle"
                  percent={Number(((totalTimeCounter / totalTimeLimit) * 100).toFixed())}
                  format={(percent) => (
                    <>
                      <div style={{ fontSize: '13px', marginBottom: '3px' }}>코스완주</div>
                      <div style={{ fontSize: '13px' }}>{percent}%</div>
                    </>
                  )}
                  success={{
                    percent: 0,
                    strokeColor: '#ff7273',
                  }}
                  width={90}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        {exerciseResultMap.map((item, index) => (
          <Row key={index} style={{ marginBottom: '10px' }}>
            <Col span={24}>
              <Card hoverable style={{}}>
                <Row justify="space-between" align="middle">
                  <Col style={{ fontSize: '20px' }}>{item.name}</Col>
                  <Col>
                    <Row>
                      <Col>
                        <Progress
                          // strokeColor="#ff7273"
                          percent={Number(((item.time / EXERCISE_TIME) * 100).toFixed())}
                          steps={10}
                        />
                      </Col>
                    </Row>
                    <Row justify="end">
                      <Col style={{ fontSize: '15px', fontStyle: 'italic' }}>
                        {moment([
                          2020,
                          1,
                          1,
                          0,
                          item.time >= 60 ? item.time / 60 : 0,
                          item.time >= 60 ? item.time % 60 : item.time,
                        ]).format('mm:ss')}
                        /
                        {moment([
                          2020,
                          1,
                          1,
                          0,
                          EXERCISE_TIME >= 60 ? EXERCISE_TIME / 60 : 0,
                          EXERCISE_TIME >= 60 ? EXERCISE_TIME % 60 : EXERCISE_TIME,
                        ]).format('mm:ss')}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        ))}
        <Row justify="center" style={{ margin: '30px 0', fontSize: '20px', color: '#ff7273' }}>
          <Col>🧘‍♀️ 오늘 하루도 열심히 운동한 당신을 응원합니다 🏃</Col>
        </Row>
        <Divider />
        <Row justify="space-between" align="middle">
          <Col style={{ marginLeft: '20px' }}>TOTAL {totalTimeCounter}</Col>

          <Col>
            <Button size="large" type="primary" onClick={onCancel}>
              운동 종료
            </Button>
          </Col>
        </Row>
      </Wrapper>
    </Modal>
  );
};

export default ExerciseResultModal;

const Wrapper = styled.div`
  .ant-card-body {
    padding: 15px;
  }
  .ant-modal-close-x {
    display: none;
  }
  .ant-modal-close-icon {
    display: none;
  }
  // padding: 0 10% 10% 10%;
`;
