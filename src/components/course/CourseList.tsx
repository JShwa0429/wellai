import { detailResponse } from 'api/common';
import { CourseApi } from 'api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Summary from '../common/Summary';

const CourseList = () => {
  const [datas, setDatas] = useState<detailResponse[]>([]);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    async function getCourse() {
      const course = CourseApi();
      await course.getCourse().then((res) => {
        setDatas(res.data.results);
      });
    }
    getCourse();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Div>
      <h2>코스 탐색</h2>
      <CardDiv count={Math.floor(width / 350)}>
        {datas.map((data: detailResponse, idx: number) => {
          return (
            <SummaryDiv key={idx}>
              <Link to={`../course/${data.id}`}>
                <Summary {...data} />
              </Link>
            </SummaryDiv>
          );
        })}
      </CardDiv>
    </Div>
  );
};

export default CourseList;
const Div = styled.div`
  width: 100%;
  font-size: 1.5em;
  h2 {
    color: ${(props) => props.theme.defaultText};
    width: 100%;
    //border-bottom: 1px solid #888;
    padding-top: 25px;
    margin-top: 25px;
    font-size: 1.2em;
    text-align: center;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardDiv = styled.div<{ count: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.count}, 250px);
  gap: 50px;
  margin: auto;
  place-items: center;
`;

const SummaryDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid #bdbdbd;
  overflow: hidden;
  margin: 4%;
  font-size: 1rem;
  font-weight: bold;
  a {
    text-decoration: none;
  }
  .image {
    background-color: #f5f5f5;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  .bookmark {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 30px;
  }
  .explain {
    display: flex;
    flex-direction: column;
    padding: 5%;
    padding-left: 3%;
    text-align: left;
    background-color: white;
    div {
      margin: 0.5%;
    }
    float: bottom;
  }

  font-weight: bold;
  .title {
    color: ${(props) => props.theme.defaultText};
  }
  .duration {
    color: ${(props) => props.theme.main};
  }

  .hashTag {
    color: #988d8d;
  }
`;
