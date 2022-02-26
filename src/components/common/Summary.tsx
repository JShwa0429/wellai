import styled from 'styled-components';
export type SummaryProps = {
  title: string;
  duration: string[];
  hashTags: string[];
};
const Summary: React.FunctionComponent<SummaryProps> = ({ title, duration, hashTags }) => {
  return (
    <Div>
      <div className="image">
        <img src={`${process.env.PUBLIC_URL}/image/yoga.svg`} alt="요가" />
      </div>
      <div className="explain">
        <div className="title">
          <p>{title}</p>
        </div>

        {/*
      길이가 일정이상 길면 뒷부분을 ...으로 대체한다
      */}
        <div className="duration">
          <p>{duration.join(' / ')}</p>{' '}
        </div>
        <div className="hashTag">
          <p>{hashTags.join(' ')}</p>
        </div>
      </div>
    </Div>
  );
};

export default Summary;

const Div = styled.div`
width:320px;
display: flex;
flex-direction: column;
border 1px solid #BDBDBD;
overflow: hidden;
margin:4%;
font-size:1rem;
font-weight:bold;
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
.duration{
  color:${(props) => props.theme.main};
}

.hashTag{
  color:${(props) => props.theme.defaultText};
  
}
`;
