import styled from 'styled-components';
const MainRenderPage = () => {
  return (
    <Div>
      <p>메인랜더링페이지입니다.</p>
    </Div>
  );
};

export default MainRenderPage;

const Div = styled.div`
  diplay: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.light};
`;
