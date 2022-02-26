import { SearchResult } from 'components/search';
import styled from 'styled-components';
import { Banner } from 'components';

const CoursePage: React.FunctionComponent = (props: any) => {
  return (
    <DivCourse>
      <Banner>
        <p>
          {`"차차"`}님을 위한
          <br /> 오늘의 코스
        </p>
      </Banner>

      <SearchResult />
    </DivCourse>
  );
};

export default CoursePage;

const DivCourse = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
