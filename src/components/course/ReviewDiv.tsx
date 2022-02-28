import { Pagination } from 'antd';
import styled from 'styled-components';
import Review, { ReviewProps } from './Review';

const ReviewDiv = () => {
  const datas: ReviewProps[] = [
    {
      nickname: '헬창',
      rate: 5,
      comment:
        '필라테스 경험이 없어서 구매 하기 전에 조금 고민했는데 강사님들이 설명 자세하게 해주셔서 문제없이 강의 수강 중이에요~~~',
    },
    {
      nickname: '강경원',
      rate: 4.5,
      comment:
        '상체비만이라 무릎 아파서 운동 잘 못 했는데 보드30으로 운동하면서 관절에 부담도 없고 누워서 할 수 있는 운동도 많아서 꾸준히 할 수 있을 것 같아요',
    },
    {
      nickname: '롸니',
      rate: 4,
      comment:
        '처음하는 홈트 운동에 혼자서 잘 할 수 있을지 걱정했는데 설명이 잘 나와서 혼자도 문제 없이 할 수 없었습니다.',
    },
  ];
  return (
    <Div>
      {datas.map((data: ReviewProps, idx: number) => {
        return <Review {...data} key={idx} />;
      })}
      <Pagination defaultCurrent={1} total={15} pageSize={3} style={{ margin: '2em 0' }} />
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
