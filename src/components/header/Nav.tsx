import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Nav = () => {
  return (
    <nav>
      <Ul>
        <li>
          <Link to="home">홈</Link>
        </li>
        <li>
          <Link to="course">코스듣기</Link>
        </li>
        <li>
          <Link to="menu1">메뉴</Link>
        </li>
        <li>
          <Link to="menu2">메뉴</Link>
        </li>
      </Ul>
    </nav>
  );
};

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  min-width: 200px;
  font-size: 1.2em;
  margin: auto;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.defaultText};
    font-weight: bold;
  }
`;

export default Nav;
