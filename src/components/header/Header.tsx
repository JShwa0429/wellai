import styled from 'styled-components';
import Nav from './Nav';
import LoginSignUp from './LoginSignUp';
const Header = () => {
  const logoName = 'WellAi.';
  return (
    <DivHeader>
      <Nav />
      <h1>{logoName}</h1>
      <LoginSignUp />
    </DivHeader>
  );
};

export default Header;

export const DivHeader = styled.div`
  width: 100vw;
  height: 5vh;
  min-height: 70px;
  position: absolute;
  z-index: 99;
  display: grid;

  grid-template-columns: 4fr 2fr 4fr;

  align-items: center;
  font-size: 1em;
  color: ${({ theme }) => theme.defaultText};
  border-bottom: 1px solid ${({ theme }) => theme.defaultText};
  background-color: white;

  h1 {
    margin: auto;
  }
`;
