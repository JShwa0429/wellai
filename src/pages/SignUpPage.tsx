import { SignUp } from 'components';
import styled from 'styled-components';
import { SignUpHeader } from 'components/signup';
const SignUpPage = () => {
  return (
    <DivSignUp>
      <>
        <SignUpHeader />
        <Div>
          <Section>
            <SignUp />
            {/* <Waves /> */}
          </Section>
        </Div>
      </>
      <DivImage>
        <img alt="회원가입 사진" src="/image/signup.jpg" />
      </DivImage>
    </DivSignUp>
  );
};

export default SignUpPage;

const DivSignUp = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const Div = styled.div`
  position: relative;
  width: 60vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Section = styled.section`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DivImage = styled.div`
  img {
    width: 40vw;
    height: 100%;
    object-fit: cover;
  }
`;
