import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CourseApi } from 'api';
import Summary from 'components/common/Summary';
import { detailResponse } from 'api/common';
import { Empty } from 'antd';

const SearchResult: React.FunctionComponent<{ keyword: string }> = ({ keyword }) => {
  const [datas, setDatas] = useState<detailResponse[]>([]);
  useEffect(() => {
    async function searchCourse() {
      const course = CourseApi();
      await course.searchCourse(keyword).then((res) => setDatas(res.data.results));
    }
    searchCourse();
  }, [keyword]);

  return (
    <Div>
      <h2>검색 결과</h2>
      <CardDiv>
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
      {datas.length < 1 && <Empty description={'검색 결과가 없습니다'} />}
    </Div>
  );
};

export default SearchResult;

const Div = styled.div`
  width: 90%;
  margin: 0 0 0 180px;
  font-size: 1.5em;
  h2 {
    color: ${(props) => props.theme.defaultText};
    width: 100%;
    //border-bottom: 1px solid #888;
    padding-top: 25px;
    margin-top: 25px;
    font-size: 1.2em;
  }
`;

const CardDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  gap: 2%;
  margin: auto;
  align-items: center;
  justify-content: left;
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
