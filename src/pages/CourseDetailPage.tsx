import { Comment, ReviewDiv, CourseExplain } from 'components';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
const CourseDetailPage = () => {
  const id = useParams();
  const data = {
    id: id.id,
    title: '절대빠진다, 하루 1시간! 복부 군살 제거 홈트',
    rate: 4.5,
    explain:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra sem sit amet rhoncus pretium. Curabitur sit amet interdum risus, at feugiat tortor. Class aptent taciti ',
  };
  return (
    <Div>
      <CourseExplain {...data} />
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
