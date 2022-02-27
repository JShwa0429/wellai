import styled from 'styled-components';
import { Header } from 'components/headerTemp';

import { MyPageLayout } from 'components';

const MyPageReport = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);

  return (
    <Wrapper>
      <Header />
      <MyPageLayout />
    </Wrapper>
  );
};

export default MyPageReport;

const Wrapper = styled.div``;
