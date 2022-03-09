import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Loading = () => {
  const [countDown, setCountDown] = useState(5);
  useEffect(() => {
    if (countDown > 0) setTimeout(() => setCountDown((current) => current - 1), 1000);
  }, [countDown]);
  return (
    <Div>
      <Spinner />
      <h1>
        잠시 후 운동이 시작합니다!
        <br />
        {countDown}
      </h1>
    </Div>
  );
};

export default Loading;

const Div = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #888;
  color: white;
  position: absolute;

  text-align: center;
`;

const Spinner = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  animation: spin 2s linear infinite;

  /* 아래는 위에서 설정한 기본 설정 */

  margin: 0 auto;
  width: 100px;
  height: 100px;
  border: 15px solid rgba(163, 151, 198, 0.2);
  border-top: 15px solid rgba(163, 151, 198, 1);
  border-radius: 50%;

  /* 아래는 기본 래퍼 설정 */
  #wrapper {
    margin: 0 auto;
    padding: 30px;
    max-width: 1170px;
  }
`;
