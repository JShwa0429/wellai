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
        {pageNumber === 1 && <SignUpEssential pageNumber={pageNumber} handleNextPage={handleNextPage} />}
        {pageNumber === 2 && <SignUpOption pageNumber={pageNumber} />}
      </Div>
    </>
  );
};

export default SignUp;

const Div = styled.div`
  width:480px;
  min-height:450px;
  height:50vh;
  color: ${(props) => props.theme.text};
  display: flex;
  margin-bottom: auto;
  justify-content: center;
  align-items: center;
  border: 0px solid ${(props) => props.theme.border};
  border-radius: 8px;
  
  padding-bottom: 2vh;
  z-index: 98;
  background-color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  flex-direction: column;
  
  h2 {
    margin: 5vh 0 5vh 0;
    font-weight:bold;
    text-align: center;
    line-height:120%;
    color: ${(props) => props.theme.defaultText};
  }


  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin 0;
    padding: 0 10% 5% 10%;
    input {
      max-height: 2.5em;
      height: 5vh;
      border-radius: 4px;
      outline: 1px solid 'C4C4C4';
    }
  }

  .finish {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;

    button {
      max-height: 3em;
      height: 2vh;
      color: ${(props) => props.theme.buttonText};
      background: ${(props) => props.theme.main};
      border: none;
    }
  }
`;

export const Button = styled.button<{ pageNumber: number }>`
  color: ${(props) => (props.pageNumber === 1 ? props.theme.buttonText : props.theme.text)};
  background: ${(props) => (props.pageNumber === 1 ? props.theme.main : props.theme.sub)};
  width: 100%;
  min-height: 3em;
  margin-top: auto;
  border-radius: 4px;
  border: 1px solid ${(props) => (props.pageNumber === 1 ? props.theme.main : props.theme.text)};

  :disabled {
    background-color: #acacac;
    color: ${(props) => props.theme.sub};
    border: none;
  }
`;
