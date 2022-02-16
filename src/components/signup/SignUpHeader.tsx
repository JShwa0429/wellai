import styled from 'styled-components';
import { DivHeader } from 'components/header/Header';
const SignUpHeader = () => {
  const logoName = 'WellAi.';
  return (
    <DivSignUpHeader>
      <h1>{logoName}</h1>
    </DivSignUpHeader>
  );
};

export default SignUpHeader;

const DivSignUpHeader = styled(DivHeader)`
  display: flex;
  justify-content: center;
`;
