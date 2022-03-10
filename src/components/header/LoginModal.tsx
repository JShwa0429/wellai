import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Modal, Form, Button, Input, Divider, message } from 'antd';
import styled from 'styled-components';
import { MyPageApi, UserApi } from 'api';
type Props = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
type LoginForm = {
  email: string;
  password: string;
};

const LOGONAME = 'WellAi.';

const LoginModal = ({ setIsModalVisible, isModalVisible }: Props) => {
  const navigate = useNavigate();
  const onFinish = async ({ email, password }: LoginForm) => {
    const user = UserApi();
    const mypage = MyPageApi();
    await user
      .logIn(email, password)
      .then((res) => {
        const { refresh, access } = res.data;
        Cookies.set('access', access, { path: '/', expires: 1 });
        Cookies.set('refresh', refresh, { path: '/', expires: 7 });
        mypage.getUserInformation().then((res) => {
          const { nickname } = res.data;
          Cookies.set('nickname', nickname, { path: '/', expires: 7 });
          message.success(`${nickname}님 환영합니다.`);
        });
        setIsModalVisible(false);
        navigate('/');
      })
      .catch(() => message.info('아이디와 패스워드를 확인해주세요.'));
    // const result = await axios.post('/users/login', { email, password });
    // // const { refresh, access } = result.data;
    // // Cookies.set('access', access, { path: '/', expires: 1 });
    // // Cookies.set('refresh', refresh, { path: '/', expires: 7 });
    // // setIsModalVisible(false);
    // // navigate('/');

    return;
  };
  return (
    <Modal width="450px" visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
      <Wrapper>
        <Row justify="center">
          <Col>
            <Row justify="center">
              <Col
                style={{
                  fontSize: '50px',
                  fontWeight: 'bold',
                  marginBottom: '30px',
                }}
              >
                {LOGONAME}
              </Col>
            </Row>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              autoComplete="off"
              style={{}}
              requiredMark={false}
              colon={false}
            >
              <Form.Item
                name="email"
                label="아이디"
                rules={[{ required: true, message: '이메일을 입력해주세요' }]}
                style={{
                  marginBottom: '10px',
                }}
              >
                <Input placeholder="example@gmail.com" size="large" />
              </Form.Item>

              <Form.Item
                name="password"
                label="비밀번호"
                rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
              >
                <Input.Password placeholder="************" size="large" />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: '100%',
                    height: '45px',
                    fontSize: '20px',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                  }}
                >
                  로그인
                </Button>
              </Form.Item>
            </Form>
            <Divider />
          </Col>
        </Row>
      </Wrapper>
    </Modal>
  );
};

export default LoginModal;

const Wrapper = styled.div`
  label.ant-form-item-no-colon {
    color: #6f6e6f;
    font-size: 15px;
    font-weight: bold;
  }
  div.ant-form-item-label {
    padding-bottom: 0;
  }
  // padding: 0 10% 10% 10%;
`;
