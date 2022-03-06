import { Comment, ReviewDiv, CourseExplain } from 'components';
import styled from 'styled-components';
const CourseDetailPage = () => {
  return (
    <Div>
      <CourseExplain />
      <div className="hr-sect">
        <h1>코스 후기</h1>
      </div>
      <Comment />
      <ReviewDiv />
    </Div>
  );
};

export default CourseDetailPage;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  }
  .hr-sect {
    width: 90%;
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 0.35);
    margin: 1em 0px;
    h1{
      margin : 0 2em;
    }
  }
  .hr-sect::before,
  .hr-sect::after {
    content: '';
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;
