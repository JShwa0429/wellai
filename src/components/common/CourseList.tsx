import { detailResponse } from 'api/common';
import { CourseApi } from 'api/CourseApi';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Summary } from '.';
import SummaryTemp from './SummaryTemp';

const CourseList = () => {
  const [datas, setDatas] = useState<detailResponse[]>([]);
  useEffect(() => {
    const course = CourseApi();
    course
      .getCourse()
      .then((res) => {
        console.log(res);
        setDatas(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Div>
      <h2>코스 추천</h2>
      <CardDiv>
        {datas.map((data: detailResponse, idx: number) => {
          return (
            <SummaryDiv key={idx}>
              <Link to={`../course/${data.id}`}>
                <SummaryTemp {...data} />
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
  padding: 0 5vw;
  font-size: 1.5em;
  width: 100%;
  h2 {
    color: ${(props) => props.theme.defaultText};
    width: 100%;
    border-bottom: 1px solid #888;
    padding: 25px 0;
    margin: 25px 0;
    font-size: 1.2em;
  }
`;

const CardDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 20%);
  gap: 6.5%;
  margin: auto;
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
    top: 0;
    width: 30px;
  }
  .explain {
    display: flex;
    flex-direction: column;
    padding: 1%;
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
    display: flex;
    span {
      margin-right: 0.5em;
    }
  }
`;
