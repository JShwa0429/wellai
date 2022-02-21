import { Link } from 'react-router-dom';
import styled from 'styled-components';

type link = {
  to: string;
  text: string;
};
const Nav = () => {
  const links: link[] = [
    { to: 'course', text: '코스탐색' },
    { to: 'community', text: '커뮤니티' },
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
  align-items:center;
  width: 30%;
  min-width: 200px;
  font-size: 1.2em;
  margin-right; auto;
  margin-left:5em;
  margin-bottom:0;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.defaultText};
    font-weight: bold;
  }
`;

export default Nav;
