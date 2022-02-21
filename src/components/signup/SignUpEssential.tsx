import { Input } from 'components/Input';
import { Button } from './Signup';
import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Essential, saveEssential } from 'features/signupSlice';
import styled from 'styled-components';
import axios from 'axios';

type Props = { pageNumber: number; handleNextPage: () => void };

const SignUpEssential: React.FunctionComponent<Props> = ({ pageNumber, handleNextPage }) => {
  const [userId, setUserId] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const dispatch = useDispatch();

  // 서버측의 validation을 통해 중복 메세지를 담는 state
  const [userIdMessage, setUserIdMessage] = useState<string>('');
  const [nicknameMessage, setNicknameMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');

  const userIdError = useMemo(() => {
    const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!userId) return '';
    else if (userIdMessage) return userIdMessage;
    else if (!regex.test(userId)) {
      return '이메일 형식을 지켜주세요';
    }
    return '';
  }, [userId, userIdMessage]);

  const nicknameError = useMemo(() => {
    const regex = /^[가-힣|a-z|A-Z]{2,8}$/;
    if (nicknameMessage) return nicknameMessage;
    else if (!regex.test(nickname)) {
      return '한글/영어 2글자 이상 8글자 이하';
    }
    return '';
  }, [nickname, nicknameMessage]);

  const passwordError = useMemo(() => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!password) {
      return '영문/숫자/특수문자 8글자 이상';
    } else if (password.length < 8) {
      return '비밀번호는 8자리 이상이어야합니다';
    } else if (!regex.test(password)) {
      return '영문 숫자 특수문자를 포함시켜주세요';
    } else if (passwordMessage) return passwordMessage;
    return '';
  }, [password, passwordMessage]);

  const passwordCheckError = useMemo(() => {
    if (passwordCheckMessage) return passwordCheckMessage;
    else if (!passwordCheck) {
      return '';
    }
    if (password !== passwordCheck) {
      return '비밀번호가 일치하지 않습니다';
    }
  }, [password, passwordCheck, passwordCheckMessage]);

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
    axios
      .post('/users/check/', {
        user_id: userId,
        nickname: nickname,
        password: password,
        password2: passwordCheck,
      })
      .then((res) => {
        if (res.status === 200) {
          handleNextPage();
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setUserIdMessage(err.response.data.user_id);
          setNicknameMessage(err.response.data.nickname);
          setPasswordMessage(err.response.data.password);
          setPasswordMessage(err.response.data.password2);
        }
      });
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
            setUserIdMessage('');
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
            setNicknameMessage('');
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
            setPasswordMessage('');
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
            setPasswordCheckMessage('');
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
