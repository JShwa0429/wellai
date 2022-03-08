import styled from 'styled-components';

const Loading = () => {
  return <Div>잠시 후 운동이 시작합니다!</Div>;
};

export default Loading;

const Div = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #888;
  color: white;
  position: absolute;
`;
