import styled from 'styled-components';
import { DivHeader } from 'components/header/Header';
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

const DivSignUpHeader = styled(DivHeader)`
  width: 50vw;
  display: flex;
  justify-content: center;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.defaultText};
  }

  a {
    padding: 0;
    font-size: 40px;
  }
`;
