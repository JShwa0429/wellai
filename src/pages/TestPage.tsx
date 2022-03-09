import { Row, Col, Form, Input, Button } from 'antd';

const TestPage = () => {
  return (
    <Row
      style={{
        width: '100%',
        height: '100vh',
      }}
      justify="center"
      align="middle"
    >
      <Col>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          autoComplete="off"
          style={{
            width: '350px',
          }}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '이름을 입력해주세요' },
              {
                pattern: new RegExp('^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$'),
                message: '한글 또는 영문을 입력해주세요',
              },
            ]}
          >
            <Input placeholder="이름" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: '이메일을 입력해주세요',
              },
              {
                pattern: new RegExp('^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@][-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.][A-Za-z]{1,5}$'),
                message: '이메일 형식에 맞춰 입력해주세요',
              },
            ]}
          >
            <Input placeholder="이메일" />
          </Form.Item>

          <Form.Item
            name="password1"
            rules={[
              { required: true, message: '비밀번호를 입력해주세요' },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                message: '영문, 숫자, 특수문자 포함하여 8자 이상 입력해주세요',
              },
            ]}
          >
            <Input.Password placeholder="비밀번호" />
          </Form.Item>
          <Form.Item name="password2" rules={[{ required: true, message: '비밀번호 확인을 입력해주세요' }]}>
            <Input.Password placeholder="비밀번호확인" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: '100%',
                height: '45px',
                fontSize: '25px',
                fontFamily: 'Black Han Sans',
              }}
            >
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
export default TestPage;
