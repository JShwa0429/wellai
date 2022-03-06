import { Pagination } from 'antd';
import { CourseApi } from 'api/CourseApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Review, { ReviewProps } from './Review';

const ReviewDiv = () => {
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const datas: ReviewProps[] = [
    {
      id: '5',
      user_id: '헬창',
      created_at: '2022-03-05T00:07:53.474817+09:00',
      modified_at: '2022-03-05T00:07:53.475183+09:00',
      content:
        '필라테스 경험이 없어서 구매 하기 전에 조금 고민했는데 강사님들이 설명 자세하게 해주셔서 문제없이 강의 수강 중이에요~~~',
      rating: 5,
      course_id: '1',
    },
    {
      id: '5',
      user_id: '강경원',
      created_at: '2022-03-05T00:07:53.474817+09:00',
      modified_at: '2022-03-05T00:07:53.475183+09:00',
      content:
        '상체비만이라 무릎 아파서 운동 잘 못 했는데 보드30으로 운동하면서 관절에 부담도 없고 누워서 할 수 있는 운동도 많아서 꾸준히 할 수 있을 것 같아요',
      rating: 4,
      course_id: '1',
    },
    {
      id: '5',
      user_id: '헬창',
      created_at: '2022-03-05T00:07:53.474817+09:00',
      modified_at: '2022-03-05T00:07:53.475183+09:00',
      content:
        '처음하는 홈트 운동에 혼자서 잘 할 수 있을지 걱정했는데 설명이 잘 나와서 혼자도 문제 없이 할 수 없었습니다.',
      rating: 5,
      course_id: '1',
    },
  ];

  useEffect(() => {
    const course = CourseApi();
    course
      .getReview(id)
      .then((res) => console.log(res))
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
