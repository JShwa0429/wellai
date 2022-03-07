import { SearchResult } from 'components/search';
import styled from 'styled-components';
import { Banner } from 'components';
import { useEffect } from 'react';
import { CourseApi } from 'api/CourseApi';
import { CourseList } from 'components/common';
const CoursePage: React.FunctionComponent = () => {
  useEffect(() => {
    const course = CourseApi();
    course
      .getCourse()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <DivCourse>
      <Banner />
      <div className="search">
        <CourseList />
      </div>
    </DivCourse>
  );
};

export default CoursePage;

const DivCourse = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  min-width: 1000px;
  .summary {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
