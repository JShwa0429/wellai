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
        {pageNumber === 2 && (
          <SignUpOption pageNumber={pageNumber} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} />
        )}
        {pageNumber === 3 && (
          <div className="finish">
            <h2>
              가입이 완료되었어요! <br />
              바로 운동을 시작 해볼까요?
            </h2>
            <Button pageNumber={pageNumber}>로그인</Button>
          </div>
        )}
      </Div>
    </>
  );
};

export default SignUp;

const Div = styled.div`
  width: 480px;
  height: 500px;
  color: ${(props) => props.theme.text};
  display: flex;
  margin-bottom: auto;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.theme.border};
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
  padding-bottom: 2vh;
  z-index: 98;
  background-color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  flex-direction: column;
  
  h2 {
    margin: 10% 0 5% 0;
    font-weight:bold;
    text-align: center;
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
      border-radius: 8px;
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
  border-radius: 8px;
  border: 1px solid ${(props) => (props.pageNumber === 1 ? props.theme.main : props.theme.text)};

  :disabled {
    background-color: #acacac;
    color: ${(props) => props.theme.sub};
    border: none;
  }
`;
