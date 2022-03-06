import styled from 'styled-components';

import { MyPageLayout } from 'components';

const MyPageReport = () => {
  // const dispatch = useAppDispatch();
  // const { value } = useAppSelector((state) => state.test, shallowEqual);

  return (
    <Wrapper>
      <MyPageLayout />
    </Wrapper>
  );
};

export default MyPageReport;

const Wrapper = styled.div``;
