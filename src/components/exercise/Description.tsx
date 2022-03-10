import { exercise } from 'api/common';
import styled from 'styled-components';

const Description: React.FunctionComponent<exercise> = ({ description, exercise_name }) => {
  return (
    <Div>
      <TitleDiv>
        <h1>{exercise_name}</h1>
      </TitleDiv>

      <p>{description}</p>
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
