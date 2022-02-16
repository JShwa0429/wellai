import { Input } from 'components/element/input';
import { Button } from './Signup';
import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { Essential, saveEssential } from 'features/signupSlice';
import styled from 'styled-components';

type Props = { pageNumber: number; handleNextPage: () => void };

const SignUpEssential: React.FunctionComponent<Props> = ({ pageNumber, handleNextPage }) => {
  const [userId, setUserId] = useState(useSelector((state: RootState) => state.signUp.userId));
  const [nickname, setNickname] = useState(useSelector((state: RootState) => state.signUp.nickname));
  const [password, setPassword] = useState(useSelector((state: RootState) => state.signUp.password));
  const [passwordCheck, setPasswordCheck] = useState(useSelector((state: RootState) => state.signUp.passwordCheck));
  const dispatch = useDispatch();

  const userIdError = useMemo(() => {
    return '';
  }, [userId]);

  const nicknameError = useMemo(() => {
    return '';
  }, [nickname]);

  const passwordError = useMemo(() => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!password) {
      return '영문 대소문자/숫자/특수문자 8글자 이상';
    } else if (password.length < 8) {
      return '비밀번호는 8자리 이상이어야합니다';
    } else if (!regex.test(password)) {
      return '영문 숫자 특수문자를 포함시켜주세요';
    }
    return '';
  }, [password]);

  const passwordCheckError = useMemo(() => {
    if (!passwordCheck) {
      return '';
    }
    if (password !== passwordCheck) {
      return '비밀번호가 일치하지 않습니다';
    }
  }, [password, passwordCheck]);

  const isError = useMemo(() => {
    if (
      userId &&
      nickname &&
      password &&
      passwordCheck &&
      !(userIdError || nicknameError || passwordError || passwordCheckError)
    )
      return false;
    else return true;
  }, [userId, nickname, password, passwordCheck, userIdError, nicknameError, passwordError, passwordCheckError]);

  const handleSaveEssential = (event: React.FormEvent) => {
    event.preventDefault();
    const essential: Essential = {
      userId: userId,
      nickname: nickname,
      password: password,
      passwordCheck: passwordCheck,
    };
    dispatch(saveEssential(essential));
    handleNextPage();
  };

  return (
    <>
      <h2>반갑습니다!</h2>
      <form onSubmit={handleSaveEssential}>
        <Input
          type="email"
          placeholder="example@email.com"
          value={userId}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserId(event.target.value);
          }}
        >
          <DivInput>
            이메일
            <small>{userIdError}</small>
          </DivInput>
        </Input>
        <Input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNickname(event.target.value);
          }}
        >
          <DivInput>
            닉네임
            <small>{nicknameError}</small>
          </DivInput>
        </Input>
        <Input
          type="password"
          placeholder="********"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        >
          <DivInput>
            비밀번호
            <small>{passwordError}</small>
          </DivInput>
        </Input>
        <Input
          type="password"
          placeholder="********"
          value={passwordCheck}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordCheck(event.target.value);
          }}
        >
          <DivInput>
            비밀번호 확인
            <small>{passwordCheckError}</small>
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
  small {
    color: ${({ theme }) => theme.main};
    margin: 1vh 0;
    margin-left: auto;
    text-verical-align-center;
  }
`;
