import { Rate } from 'antd';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
const CourseDetailPage = () => {
  const id = useParams();

  const data = {
    title: '절대빠진다, 하루 1시간! 복부 군살 제거 홈트',
    score: 4.7,
    explain:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra sem sit amet rhoncus pretium. Curabitur sit amet interdum risus, at feugiat tortor. Class aptent taciti ',
  };
  return (
    <Div>
      <DivCourseDetail>
        <div className="explain">
          <div className="title">{data.title}</div>
          <div className="rate">
            <Rate disabled defaultValue={data.score} />
            {data.score}
          </div>
          <div className="explain">{data.explain}</div>
        </div>
        <Button>
          <Link to={`/listen/${id.id}`}>수업 시작하기</Link>
        </Button>
      </DivCourseDetail>

      <div className="hr-sect">
        <h1>코스 후기</h1>
      </div>

      <Rate allowHalf defaultValue={2.5} />
    </Div>
  );
};

export default CourseDetailPage;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  .hr-sect {
    width: 80%;
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 0.35);
    margin: 8px 0px;
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
const DivCourseDetail = styled.div`
  width: 100vw;
  background: linear-gradient(to right, rgba(255, 114, 114, 0.5), rgba(255, 114, 114, 0.2));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10vh 0;
`;

const Button = styled.button`
  border-radius: 8px;
  height: 3em;
  color: white;
  background-color: ${(props) => props.theme.main};

  margin-top: auto;
`;
