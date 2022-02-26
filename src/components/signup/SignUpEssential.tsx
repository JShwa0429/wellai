import { Input } from 'components/Input';
import { Button } from './SignUp';
import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveEssential } from 'features/signupSlice';
import styled from 'styled-components';
import axios from 'axios';

type RegisterUserForm = {
  userId: string;
  nickname: string;
  password: string;
  passwordCheck: string;
};
type Props = { pageNumber: number; handleNextPage: () => void };

const SignUpEssential: React.FunctionComponent<Props> = ({ pageNumber, handleNextPage }) => {
  const [userAccountInfo, setUserAccountInfo] = useState<RegisterUserForm>({
    userId: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  });

  // 서버측의 validation을 통해 중복 메세지를 담는 state
  const [userAccountMessage, setUserAccountMessage] = useState<RegisterUserForm>({
    userId: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  });

  const dispatch = useDispatch();

  const userIdError = useMemo(() => {
    const userId = userAccountInfo.userId;
    const userIdMessage = userAccountMessage.userId;

    const userIdRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (userIdMessage) return userIdMessage;
    else if (!userId) return '';
    else if (!userIdRegex.test(userId)) {
      return '이메일 형식을 지켜주세요';
    }
    return '';
  }, [userAccountInfo, userAccountMessage]);

  const nicknameError = useMemo(() => {
    const nickname = userAccountInfo.nickname;
    const nicknameMessage = userAccountMessage.nickname;
    const nicknameRegex = /^[가-힣|a-z|A-Z]{2,8}$/;
    if (nicknameMessage) return nicknameMessage;
    else if (!nicknameRegex.test(nickname)) {
      return '한글/영어 2글자 이상 8글자 이하';
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
    } else if (passwordMessage) return passwordMessage;
    return '';
  }, [userAccountInfo, userAccountMessage]);

  const passwordCheckError = useMemo(() => {
    const password = userAccountInfo.password;
    const passwordCheck = userAccountInfo.passwordCheck;
    const passwordCheckMessage = userAccountMessage.passwordCheck;
    if (passwordCheckMessage) return passwordCheckMessage;
    else if (!passwordCheck) {
      return '';
    }
    if (password !== passwordCheck) {
      return '비밀번호가 일치하지 않습니다';
    }
  }, [userAccountInfo, userAccountMessage]);

  const isError = useMemo(() => {
    if (
      userAccountInfo.userId &&
      userAccountInfo.nickname &&
      userAccountInfo.password &&
      userAccountInfo.passwordCheck &&
      !(userIdError || nicknameError || passwordError || passwordCheckError)
    )
      return false;
    else return true;
  }, [userAccountInfo, userIdError, nicknameError, passwordError, passwordCheckError]);

  const handleSaveEssential = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(saveEssential(userAccountInfo));
    axios
      .post('/users/check/', {
        user_id: userAccountInfo.userId,
        nickname: userAccountInfo.nickname,
        password: userAccountInfo.password,
        password2: userAccountInfo.passwordCheck,
      })
      .then((res) => {
        if (res.status === 200) {
          handleNextPage();
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setUserAccountMessage({
            userId: err.response.data.user_id,
            nickname: err.response.data.nickname,
            password: err.response.data.password,
            passwordCheck: err.response.data.password2,
          });
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
          value={userAccountInfo.userId}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserAccountInfo((current) => {
              const newUserAccountInfo = { ...current };
              newUserAccountInfo.userId = event.target.value;
              return newUserAccountInfo;
            });
            setUserAccountMessage((current) => {
              const newUserAccountMessage = { ...current };
              newUserAccountMessage.userId = '';
              return newUserAccountMessage;
            });
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
          value={userAccountInfo.nickname}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserAccountInfo((current) => {
              const newUserAccountInfo = { ...current };
              newUserAccountInfo.nickname = event.target.value;
              return newUserAccountInfo;
            });
            setUserAccountMessage((current) => {
              const newUserAccountMessage = { ...current };
              newUserAccountMessage.nickname = '';
              return newUserAccountMessage;
            });
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
            <small>{passwordError}</small>
          </DivInput>
        </Input>
        <Input
          type="password"
          placeholder="********"
          value={userAccountInfo.passwordCheck}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserAccountInfo((current) => {
              const newUserAccountInfo = { ...current };
              newUserAccountInfo.passwordCheck = event.target.value;
              return newUserAccountInfo;
            });
            setUserAccountMessage((current) => {
              const newUserAccountMessage = { ...current };
              newUserAccountMessage.passwordCheck = '';
              return newUserAccountMessage;
            });
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
