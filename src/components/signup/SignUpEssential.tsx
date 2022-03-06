import { Input } from 'components/Input';
import { Button } from './SignUp';
import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveEssential } from 'features/signupSlice';
import styled from 'styled-components';
import axios from 'axios';
import { SignUpApi } from 'api';

type RegisterUserForm = {
  email: string;
  password: string;
  confirmPassword: string;
};
type Props = { pageNumber: number; handleNextPage: () => void };

const SignUpEssential: React.FunctionComponent<Props> = ({ pageNumber, handleNextPage }) => {
  const [userAccountInfo, setUserAccountInfo] = useState<RegisterUserForm>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // 서버측의 validation을 통해 중복 메세지를 담는 state
  const [userAccountMessage, setUserAccountMessage] = useState<RegisterUserForm>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();

  const emailError = useMemo(() => {
    const email = userAccountInfo.email;
    const emailMessage = userAccountMessage.email;

    const emailIdRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (emailMessage) return emailMessage;
    else if (!email) return '';
    else if (!emailIdRegex.test(email)) {
      return '이메일 형식을 지켜주세요';
    }
    return '';
  }, [userAccountInfo, userAccountMessage]);

  const passwordError = useMemo(() => {
    const password = userAccountInfo.password;
    const passwordMessage = userAccountMessage.password;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!password) {
      return '영문/숫자/특수문자 8글자 이상';
    } else if (password.length < 8) {
      return '비밀번호는 8자리 이상이어야합니다';
    } else if (!regex.test(password)) {
      return '영문 숫자 특수문자를 포함시켜주세요';
    } else if (passwordMessage) {
      return passwordMessage;
    }
    return '';
  }, [userAccountInfo, userAccountMessage]);

  const confirmPasswordError = useMemo(() => {
    const password = userAccountInfo.password;
    const confirmPassword = userAccountInfo.confirmPassword;
    const passwordCheckMessage = userAccountMessage.confirmPassword;
    if (passwordCheckMessage) return passwordCheckMessage;
    else if (!confirmPassword) {
      return '';
    }
    if (password !== confirmPassword) {
      return '비밀번호가 일치하지 않습니다';
    }
  }, [userAccountInfo, userAccountMessage]);

  const isError = useMemo(() => {
    if (
      userAccountInfo.email &&
      userAccountInfo.password &&
      userAccountInfo.confirmPassword &&
      !(emailError || passwordError || confirmPasswordError)
    )
      return false;
    else return true;
  }, [userAccountInfo, emailError, passwordError, confirmPasswordError]);

  const handleSaveEssential = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(saveEssential(userAccountInfo));
    const signupApi = SignUpApi();
    signupApi
      .checkValidation(userAccountInfo)
      .then((res) => {
        if (res.status === 200) {
          handleNextPage();
        }
      })
      .catch((err) => {
        if (err.response.data.status_code === 400) {
          setUserAccountMessage({
            email: err.response.data.email,
            password: err.response.data.password,
            confirmPassword: err.response.data.confirm_password,
          });
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSaveEssential}>
        <h2>반갑습니다!</h2>
        <Input
          type="email"
          placeholder="example@email.com"
          value={userAccountInfo.email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserAccountInfo((current) => {
              const newUserAccountInfo = { ...current };
              newUserAccountInfo.email = event.target.value;
              return newUserAccountInfo;
            });
            setUserAccountMessage((current) => {
              const newUserAccountMessage = { ...current };
              newUserAccountMessage.email = '';
              return newUserAccountMessage;
            });
          }}
        >
          <DivInput>
            이메일
            <Small error={emailError ? true : false}>{emailError}</Small>
          </DivInput>
        </Input>

        <Input
          type="password"
          placeholder="********"
          value={userAccountInfo.password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserAccountInfo((current) => {
              const newUserAccountInfo = { ...current };
              newUserAccountInfo.password = event.target.value;
              return newUserAccountInfo;
            });
            setUserAccountMessage((current) => {
              const newUserAccountMessage = { ...current };
              newUserAccountMessage.password = '';
              return newUserAccountMessage;
            });
          }}
        >
          <DivInput>
            비밀번호
            {!userAccountInfo.password ? (
              <Small error={false}>영문/숫자/특수문자 8글자 이상</Small>
            ) : (
              <Small error={true}>{passwordError}</Small>
            )}
          </DivInput>
        </Input>
        <Input
          type="password"
          placeholder="********"
          value={userAccountInfo.confirmPassword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserAccountInfo((current) => {
              const newUserAccountInfo = { ...current };
              newUserAccountInfo.confirmPassword = event.target.value;
              return newUserAccountInfo;
            });
            setUserAccountMessage((current) => {
              const newUserAccountMessage = { ...current };
              newUserAccountMessage.confirmPassword = '';
              return newUserAccountMessage;
            });
          }}
        >
          <DivInput>
            비밀번호 확인
            <Small error={confirmPasswordError ? true : false}>{confirmPasswordError}</Small>
          </DivInput>
        </Input>

        <Button pageNumber={pageNumber} disabled={isError}>
          다음으로
        </Button>
      </form>
    </>
  );
};

export default SignUpEssential;

const DivInput = styled.div`
  width: 100%;
  height: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Small = styled.small<{ error: boolean }>`
  color: ${({ error, theme }) => (error ? theme.main : theme.border)};
    margin: 1vh 0;
    margin-left: auto;
    text-verical-align-center;
`;
