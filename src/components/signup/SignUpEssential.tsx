import Input from 'components/atom/input';
import { Button } from './Signup';
const SignUpEssential: React.FunctionComponent<{ pageNumber: number; handleNextPage: () => void }> = ({
  pageNumber,
  handleNextPage,
}) => {
  return (
    <>
      {pageNumber == 1 && (
        <>
          <h2>반갑습니다!</h2>
          <form>
            <Input type="text" placeholder="example@email.com">
              이메일
            </Input>
            <Input type="text" placeholder="닉네임">
              닉네임
            </Input>
            <Input type="password" placeholder="password">
              비밀번호
            </Input>
            <Input type="password" placeholder="password">
              비밀번호 확인
            </Input>
          </form>
          <Button onClick={handleNextPage} pageNumber={pageNumber}>
            다음으로
          </Button>
        </>
      )}
    </>
  );
};

export default SignUpEssential;
