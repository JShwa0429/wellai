import Input from 'components/atom/input';
import { Button } from './Signup';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { Essential, saveEssential } from 'features/signupSlice';

type Props = { pageNumber: number; handleNextPage: () => void };

const SignUpEssential: React.FunctionComponent<Props> = ({ pageNumber, handleNextPage }) => {
  const [email, setEmail] = useState(useSelector((state: RootState) => state.signUp.email));
  const [nickname, setNickname] = useState(useSelector((state: RootState) => state.signUp.nickname));
  const [password, setPassword] = useState(useSelector((state: RootState) => state.signUp.password));
  const [passwordCheck, setPasswordCheck] = useState(useSelector((state: RootState) => state.signUp.passwordCheck));
  const dispatch = useDispatch();
  const handleSaveEssential = () => {
    const essential: Essential = {
      email: email,
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
        <Input type="email" placeholder="example@email.com" value={email} setValue={setEmail}>
          이메일
        </Input>
        <Input type="text" placeholder="닉네임" value={nickname} setValue={setNickname}>
          닉네임
        </Input>
        <Input type="password" placeholder="********" value={password} setValue={setPassword}>
          비밀번호
        </Input>
        <Input type="password" placeholder="********" value={passwordCheck} setValue={setPasswordCheck}>
          비밀번호 확인
        </Input>
        {password !== passwordCheck && <p style={{ color: 'red', marginTop: '1vh' }}>비밀번호를 확인해주세요!</p>}
        <Button pageNumber={pageNumber} disabled={password !== passwordCheck || password === ''}>
          다음으로
        </Button>
      </form>
    </>
  );
};

export default SignUpEssential;
