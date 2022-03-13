import { useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CourseApi } from 'api';
import Summary2 from '../common/Summary2';
import { detailResponse } from 'api/common';
import { Empty } from 'antd';
import { Footer } from 'components';

const SearchResult: React.FunctionComponent<{ keyword: string }> = ({ keyword }) => {
  const [datas, setDatas] = useState<detailResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function searchCourse() {
      setIsLoading(true);
      const course = CourseApi();
      await course.searchCourse(keyword).then((res) => setDatas(res.data.results));
      setIsLoading(false);
    }
    searchCourse();
  }, [keyword]);

  return (
    <>
      <Div>
        <h2>검색 결과</h2>
        {isLoading ? (
          <Row style={{ minHeight: 'calc(100vh - 400px)', marginTop: '100px' }} justify="center">
            <Col>
              <Spin size="large" tip="Loading" />
            </Col>
          </Row>
        ) : (
          <CardDiv>
            {datas.map((data: detailResponse, idx: number) => {
              return (
                <Col key={data.id} style={{ marginRight: '30px', marginBottom: '30px', width: '250px' }}>
                  <Summary2 key={data.id} {...data} />
                </Col>
              );
            })}
          </CardDiv>
        )}
        {datas.length < 1 && <Empty description={'검색 결과가 없습니다'} />}
      </Div>
    </>
  );
};

export default SearchResult;

const Div = styled.div`
  height: max-content;
  width: 70%;
  font-size: 1.5em;
  h2 {
    color: ${(props) => props.theme.defaultText};
    width: 100%;
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
