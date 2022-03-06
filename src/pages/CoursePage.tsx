import { SearchResult } from 'components/search';
import styled from 'styled-components';
import { Banner } from 'components';
import { useEffect } from 'react';
import axios from 'axios';

const CoursePage: React.FunctionComponent = () => {
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ2Mzg3ODk0LCJpYXQiOjE2NDYzODYwOTQsImp0aSI6IjFhMWVkOTBjMDhlZjRiNzI5MDU1MDgxNGQ3ZTlkNzIyIiwidXNlcl9pZCI6NH0.0VeASqXB3hAokC2gAi3cPsVi__41g8DWfPZBIg13Vmk`,
      },
    };
    axios.get('/api/course/list', config).then((res) => console.log(res));
  }, []);

  return (
    <DivCourse>
      <Banner>
        <p>
          {`“차차”`}님을 위한
          <br /> 오늘의 코스
        </p>
      </Banner>
      <div className="search">
        <SearchResult searchTitle="직장인을 위한 코스" />
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
