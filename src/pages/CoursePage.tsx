import styled from 'styled-components';
import { useEffect } from 'react';
import { CourseApi } from 'api';
import { CourseList, Banner } from 'components';

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
      <CourseList />
    </DivCourse>
  );
};

export default CoursePage;

const DivCourse = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  .summary {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
