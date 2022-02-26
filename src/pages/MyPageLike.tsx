import styled from 'styled-components';
import { Header } from 'components/headerTemp';

import MypageLayout from 'components/mypage/MyPageLayout';

const MyPageLike = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);

  return (
    <Wrapper>
      <Header />
      <MypageLayout />
    </Wrapper>
  );
};

export default MyPageLike;

const Wrapper = styled.div``;
