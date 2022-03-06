import LoginModal from 'components/header/LoginModal';
import { Button } from './SignUp';
import { useState } from 'react';
const SignUpLogin = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <div>
      <div className="finish">
        <h2>
          가입이 완료되었어요! <br />
          바로 운동을 시작 해볼까요?
        </h2>
        <Button onClick={() => setIsModalVisible(true)} pageNumber={3}>
          로그인
        </Button>
      </div>
      <LoginModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
  );
};

export default SignUpLogin;
