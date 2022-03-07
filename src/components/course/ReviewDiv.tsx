import { Pagination } from 'antd';
import { CourseApi } from 'api/CourseApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Review, { ReviewProps } from './Review';

const ReviewDiv = () => {
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [datas, setDatas] = useState<ReviewProps[]>([]);

  useEffect(() => {
    const course = CourseApi();
    course
      .getReview(id as string)
      .then((res) => {
        setDatas(res.data.results);
      })
      .catch((err) => console.log(err.response));
  }, []);
  return (
    <Div>
      {datas.map((data: ReviewProps, idx: number) => {
        return pageNumber * 10 > idx && idx > (pageNumber - 1) * 10 - 1 && <Review {...data} key={idx} />;
      })}
      <Pagination
        current={pageNumber}
        onChange={(page) => setPageNumber(page)}
        defaultCurrent={1}
        total={datas.length}
        pageSize={10}
        style={{ margin: '2em 0' }}
      />
    </Div>
  );
};
export default ReviewDiv;

const Div = styled.div`
  width: 80%;
  margin: 1em 0;
  border-top: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
