import Summary from 'components/common/Summary';
import { useState } from 'react';
import styled from 'styled-components';
import { SummaryProps } from 'components/common/Summary';
import { Link } from 'react-router-dom';

const SearchResult: React.FunctionComponent<{ searchTitle: string }> = ({ searchTitle }) => {
  const [cardData, setCardData] = useState<SummaryProps[]>([
    {
      id: '0',
      title: '절대 빠진다, 하루 1시간! 복부 군살 제거 홈트',
      duration: ['3주', '주3회', '60분'],
      hashTags: ['#초중급', '#군살', '#다이어트'],
    },
    {
      id: '1',
      title: '절대 빠진다, 하루 3시간! 복부 군살 제거 홈트',
      duration: ['3주', '주3회', '60분'],
      hashTags: ['#초중급', '#군살', '#다이어트'],
    },
    {
      id: '2',
      title: '절대 빠진다, 하루 5시간! 복부 군살 제거 홈트',
      duration: ['3주', '주3회', '60분'],
      hashTags: ['#초중급', '#군살', '#다이어트'],
    },
    {
      id: '3',
      title: '절대 빠진다, 하루 7시간! 복부 군살 제거 홈트',
      duration: ['3주', '주3회', '60분'],
      hashTags: ['#초중급', '#군살', '#다이어트'],
    },
  ]);
  return (
    <Div>
      <h2>{searchTitle}</h2>
      <CardDiv>
        {cardData.map((data: SummaryProps, idx: number) => {
          return (
            <SummaryDiv key={idx}>
              <Link to={`${data.id}`}>
                <Summary {...data} />
              </Link>
            </SummaryDiv>
          );
        })}
      </CardDiv>
    </Div>
  );
};

export default SearchResult;

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
  }
`;

const CardDiv = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fill, 20%);
  gap: 5%;
  padding-left: 5%;
`;

const SummaryDiv = styled.div`
display: flex;
flex-direction: column;
border 1px solid #BDBDBD;
overflow: hidden;
margin:4%;
font-size:1rem;
font-weight:bold;
a{
  text-decoration:none;
}
.image {
    background-color:#F5F5F5;
    img {
      width:100%;
      object-fit:cover;
    }
}



.explain {
    display:flex;
    flex-direction:column;
    padding : 1%;
    padding-left:3%;
    text-align:left;
    background-color:white;
    div{
        margin:0.5%;
    }
    float:bottom;
    
  }
`;
