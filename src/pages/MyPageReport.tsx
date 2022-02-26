import styled from 'styled-components';
import { Header } from 'components/headerTemp';

import MypageLayout from 'components/mypage/MyPageLayout';

const MyPageReport = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);

  return (
    <Wrapper>
      <Header />
      <MypageLayout />
    </Wrapper>
  );
};

export default MyPageReport;

const Wrapper = styled.div``;
