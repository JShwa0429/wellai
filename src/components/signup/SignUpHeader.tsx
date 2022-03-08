import styled from 'styled-components';
import { Link } from 'react-router-dom';
const SignUpHeader = () => {
  const logoName = 'WellAi.';
  return (
    <DivSignUpHeader>
      <Link to="/">{logoName}</Link>
    </DivSignUpHeader>
  );
};

export default SignUpHeader;

const DivSignUpHeader = styled.div`
  width: 60vw;
  height: 5vh;
  min-height: 60px;
  max-height: 80px;
  position: absolute;
  z-index: 99;
  display: flex;
  justify-content: left;
  padding-left: 5em;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.defaultText};
  }

  a {
    padding: 0;
    font-size: 40px;
  }
`;
