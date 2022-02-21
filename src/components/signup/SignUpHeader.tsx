import styled from 'styled-components';
import { DivHeader } from 'components/header/Header';
import { Link } from 'react-router-dom';
const SignUpHeader = () => {
  const logoName = 'WellAi.';
  return (
    <DivSignUpHeader>
      <Link to="/">
        <h1>{logoName}</h1>
      </Link>
    </DivSignUpHeader>
  );
};

export default SignUpHeader;

const DivSignUpHeader = styled(DivHeader)`
  display: flex;
  justify-content: center;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.defaultText};
  }

  h1 {
    padding: 0;
  }
`;
