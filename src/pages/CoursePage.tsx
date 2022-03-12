import styled from 'styled-components';
import { CourseList2, Banner } from 'components';

const CoursePage: React.FunctionComponent = () => {
  return (
    <DivCourse>
      <Banner />
      <CourseList2 />
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
