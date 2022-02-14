import { useState } from 'react';
import styled from 'styled-components';
import { SignUpInfo } from '.';
import SignUpEssential from './SignUpEssential';
import SignUpOption from './SignUpOption';
const SignUp = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const handleNextPage = () => {
    setPageNumber((current) => current + 1);
  };
  const handlePrevPage = () => {
    setPageNumber((current) => current - 1);
  };
  return (
    <>
      <SignUpInfo pageNumber={pageNumber} />
      <Div>
        <SignUpEssential pageNumber={pageNumber} handleNextPage={handleNextPage} />
        <SignUpOption pageNumber={pageNumber} handlePrevPage={handlePrevPage} />
      </Div>
    </>
  );
};

export default SignUp;

const Div = styled.div`
  min-width: 388px;
  width: 25vw;
  height: 60vh;
  min-height: 445px;
  color: ${(props) => props.theme.defaultText};
  display: flex;
  align-items: center;
  border: 3px solid #888;
  border-radius: 15px;
  z-index: 98;
  background-color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  flex-direction: column;
  padding: 0 2vw 4vh 2vw;
  h2 {
    margin: 3vh 0;
  }

  h3 {
    text-align: center;
    margin: 3vh 0;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0vh 2vw;

    input {
      min-width: 271px;
      width: 15vw;
      min-height: 1em;
      height: 4vh;
    }
  }
`;

export const Button = styled.button<{ pageNumber: number }>`
  color: ${(props) => (props.pageNumber === 1 ? props.theme.buttonText : props.theme.defaultText)};
  background: ${(props) => (props.pageNumber === 1 ? props.theme.main : props.theme.sub)};
  height: 10%;
  min-height: 2em;
  width: 40%;
  font-weight: bold;
  margin-top: auto;
  border-radius: 10px;
  border: 1px solid ${(props) => (props.pageNumber === 1 ? props.theme.main : props.theme.defaultText)};
`;
