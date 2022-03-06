import styled from 'styled-components';
import { Rating } from 'components/course/Comment';
import { Link, useParams } from 'react-router-dom';
type Props = {
  id: string | undefined;
  title: string;
  rate: number;
  explain: string;
};

const CourseExplain: React.FunctionComponent = () => {
  const { id } = useParams();
  const data = {
    id: id,
    title: '절대빠진다, 하루 1시간! 복부 군살 제거 홈트',
    rate: 4.5,
    explain:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra sem sit amet rhoncus pretium. Curabitur sit amet interdum risus, at feugiat tortor. Class aptent taciti ',
  };
  return (
    <DivCourseDetail>
      <DivBanner>
        <div className="image">
          <img src="/image/yoga.png" alt="요가" />
        </div>
        <Explain>
          <h1>{data.title}</h1>
          <div className="rate">
            <Rating allowHalf disabled defaultValue={data.rate} />
            {data.rate}
          </div>
          <div className="explain">{data.explain}</div>
        </Explain>
      </DivBanner>
      <Link to={`/guide/${data.id}`}>
        <Button>수업 시작하기</Button>
      </Link>
    </DivCourseDetail>
  );
};

export default CourseExplain;

const DivCourseDetail = styled.div`
  width: 100vw;
  background: linear-gradient(to right, rgba(255, 114, 114, 0.3), rgba(255, 114, 114, 0.1));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DivBanner = styled.div`
  height: 50vh;
  margin: 2em 0;
  display: flex;
  .image {
    width: 50%;
    display: flex;

    justify-content: center;
    align-items: center;
  }

  img {
    margin-left: 10vw;
    height: 70%;
  }
`;
const Explain = styled.div`
  width: 30%;
  margin: 1em 10vw;
  display: flex;
  flex-direction: column;
  padding: 2em 2em;

  h1 {
    margin: 10% 0 0 0;
    color: ${(props) => props.theme.main};
  }

  .explain {
    margin-top: 2em;
  }
`;

const Button = styled.button`
  border-radius: 64px;
  width: 10em;
  height: 3em;
  font-size: 1.5em;
  color: white;
  background-color: ${(props) => props.theme.main};
  margin-top: auto;
  margin-bottom: 1em;
  a {
    color: white;
  }
`;
