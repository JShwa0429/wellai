import { Link } from 'react-router-dom';
import styled from 'styled-components';

type link = {
  to: string;
  text: string;
};
const Nav = () => {
  const links: link[] = [
    { to: 'home', text: '홈' },
    { to: 'course', text: '코스듣기' },
  ];

  return (
    <nav>
      <UlNav>
        {links.map((link) => (
          <li key={link.text}>
            <Link to={link.to}>{link.text}</Link>
          </li>
        ))}
      </UlNav>
    </nav>
  );
};

const UlNav = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
  min-width: 200px;
  font-size: 1.2em;
  margin-right; auto;
  margin-left:5em;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.defaultText};
    font-weight: bold;
  }
`;

export default Nav;
