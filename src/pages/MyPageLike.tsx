import styled from 'styled-components';
import { MyPageLayout } from 'components';

const MyPageLike = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);

  return (
    <Wrapper>
      <MyPageLayout />
    </Wrapper>
  );
};

export default MyPageLike;

const Wrapper = styled.div``;
