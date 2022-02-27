import { SearchResult } from 'components/search';
import styled from 'styled-components';
import { Banner } from 'components';

const CoursePage: React.FunctionComponent = () => {
  return (
    <DivCourse>
      <Banner>
        <p>
          {`“차차”`}님을 위한
          <br /> 오늘의 코스
        </p>
      </Banner>
      <div className="search">
        <SearchResult searchTitle="직장인을 위한 코스" />
      </div>
    </DivCourse>
  );
};

export default CoursePage;

const DivCourse = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  p {
    text-align: center;
  }
  .summary {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
