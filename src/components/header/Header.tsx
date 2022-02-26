import styled from 'styled-components';
import Nav from './Nav';
import LoginSignUp from './LoginSignUp';
import { Link } from 'react-router-dom';
import { SearchInput } from 'components/Input/search';
const Header = () => {
  const logoName = 'WellAi.';
  return (
    <DivHeader>
      <Link to="home">
        <h1>{logoName}</h1>
      </Link>
      <Nav />
      <SearchInput />
      <LoginSignUp />
    </DivHeader>
  );
};

export default Header;

export const DivHeader = styled.div`
  width: 100vw;
  height: 5vh;
  min-height: 60px;
  max-height: 80px;
  position: absolute;
  z-index: 99;
  display: grid;

  grid-template-columns: 3fr 2fr 2fr 2fr;
  grid-gap: 5%;
  align-items: center;

  font-size: 1em;
  color: ${({ theme }) => theme.defaultText};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background-color: white;

  h1 {
    margin: auto;
    font-weight: bold;
    padding-left: 3em;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.defaultText};
  }
`;
