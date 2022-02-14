import styled from 'styled-components';
import Nav from './Nav';
import LoginSignUp from './LoginSignUp';
const Header = () => {
  const logoName = 'WellAi.';
  return (
    <Div>
      <Nav />
      <h1>{logoName}</h1>
      <LoginSignUp />
    </Div>
  );
};

export default Header;

const Div = styled.div`
  position: absolute;
  z-index: 99;
  display: grid;
  border-bottom: 1px solid ${(props) => props.theme.defaultText};
  grid-template-columns: 4fr 2fr 4fr;
  background-color: white;
  align-items: center;

  font-size: 1.5vh;
  color: ${(props) => props.theme.defaultText};
  h1 {
    margin: auto;
  }
  width: 100vw;
  height: 5vh;
  min-height: 4em;
`;
