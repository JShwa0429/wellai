import { Input } from 'components/Input';
import { Button } from './Signup';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { Essential, saveEssential } from 'features/signupSlice';
import styled from 'styled-components';

type Props = { pageNumber: number; handleNextPage: () => void };

const SignUpEssential: React.FunctionComponent<Props> = ({ pageNumber, handleNextPage }) => {
  const [userId, setUserId] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const dispatch = useDispatch();

  const userIdError = useMemo(() => {
    return '';
  }, [userId]);

  const nicknameError = useMemo(() => {
    const regex = /^[가-힣|a-z|A-Z]{2,8}$/;
    if (!regex.test(nickname)) {
      return '한글/영어 2글자 이상 8글자 이하';
    }
    return '';
  }, [nickname]);

  const passwordError = useMemo(() => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!password) {
      return '영문/숫자/특수문자 8글자 이상';
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

    // axios
    //   .post('/users/check/', {
    //     user_id: signUp.userId,
    //     nickname: signUp.nickname,
    //     password: signUp.password,
    //   })
    //   .then((res) => {
    //     if (res.statusText === 'Created') handleNextPage();
    //   })
    //   .catch((err) => console.log(err));

    handleNextPage();
  };
  return (
    <>
      <form onSubmit={handleSaveEssential}>
        <h2>반갑습니다!</h2>
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
