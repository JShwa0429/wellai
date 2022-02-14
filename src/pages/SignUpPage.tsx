import { SignUp } from 'components';
import Waves from 'components/wave/Waves';
import styled from 'styled-components';
const SignUpPage = () => {
  return (
    <Div>
      <Section>
        <SignUp />
        <Waves />
      </Section>
    </Div>
  );
};

export default SignUpPage;

const Div = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Section = styled.section`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
