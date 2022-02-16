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
  width: 426.8px;
  max-height: 680px;
  height: 60vh;
  min-height: 400px;
  color: ${(props) => props.theme.defaultText};
  display: flex;
  justify-content: center;
  margin-bottom: auto;
  align-items: center;
  border: 1px solid #888;
  border-radius: 16px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
  padding-bottom: 2vh;
  z-index: 98;
  background-color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
  flex-direction: column;

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
    height: 100%;
    margin 0;
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
  color: ${(props) => (props.pageNumber === 1 ? props.theme.buttonText : props.theme.defaultText)};
  background: ${(props) => (props.pageNumber === 1 ? props.theme.main : props.theme.sub)};
  width: 40%;
  min-height: 3em;
  font-weight: bold;
  margin-top: auto;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.pageNumber === 1 ? props.theme.main : props.theme.defaultText)};

  :disabled {
    background-color: #acacac;
    color: ${(props) => props.theme.sub};
    border: none;
  }
`;
