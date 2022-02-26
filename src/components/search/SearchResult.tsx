import Summary from 'components/common/Summary';
import { useState } from 'react';
import styled from 'styled-components';
import { SummaryProps } from 'components/common/Summary';

const SearchResult = () => {
  const [cardData, setCardData] = useState<SummaryProps[]>([
    {
      title: '절대 빠진다, 하루 1시간! 복부 군살 제거 홈트',
      duration: ['3주', '주3회', '60분'],
      hashTags: ['#초중급', '#군살', '#다이어트'],
    },
    {
      title: '절대 빠진다, 하루 3시간! 복부 군살 제거 홈트',
      duration: ['3주', '주3회', '60분'],
      hashTags: ['#초중급', '#군살', '#다이어트'],
    },
    {
      title: '절대 빠진다, 하루 5시간! 복부 군살 제거 홈트',
      duration: ['3주', '주3회', '60분'],
      hashTags: ['#초중급', '#군살', '#다이어트'],
    },
    {
      title: '절대 빠진다, 하루 7시간! 복부 군살 제거 홈트',
      duration: ['3주', '주3회', '60분'],
      hashTags: ['#초중급', '#군살', '#다이어트'],
    },
    {
      title: '절대 빠진다, 하루 7시간! 복부 군살 제거 홈트',
      duration: ['3주', '주3회', '60분'],
      hashTags: ['#초중급', '#군살', '#다이어트'],
    },
  ]);
  return (
    <Div>
      <h2>검색결과</h2>
      <CardDiv>
        {cardData.map((data: SummaryProps, idx: number) => {
          return <Summary key={idx} {...data} />;
        })}
      </CardDiv>
    </Div>
  );
};

export default SearchResult;

const Div = styled.div`
  font-size: 1.5em;
  width: 100%;
  h2 {
    color: ${(props) => props.theme.defaultText};
    width: 100%;
    border-bottom: 1px solid #888;
    padding: 25px 0;
    margin: 25px 0;
  }
`;

const CardDiv = styled.div`
  place-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  padding: 2.5%;
  gap: 3em;
`;
