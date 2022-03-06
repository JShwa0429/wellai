import styled from 'styled-components';

const Description = () => {
  return (
    <Div>
      <TitleDiv>
        <h1>no5.Downward dog(다운독)</h1>
        <h1>
          2/3<small>reps</small>
        </h1>
      </TitleDiv>

      <p>
        얼굴을 아래로 향한 개자새로, 개가 기지개를 펴는 자세와
        <br />
        유사하여 붙여진 이름입니다.
      </p>
    </Div>
  );
};

export default Description;
const Div = styled.div`
  width: 100%;
  p {
    margin: 0;
  }
`;
const TitleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  h1 {
    color: ${(props) => props.theme.main};
  }
`;
