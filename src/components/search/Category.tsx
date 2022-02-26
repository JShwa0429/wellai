import styled from 'styled-components';

type Props = {
  keyword: string;
};
const Category: React.FunctionComponent<Props> = ({ keyword }) => {
  return (
    <Div>
      <h3>카테고리</h3>
      <h1>{keyword}</h1>
    </Div>
  );
};
export default Category;

const Div = styled.div`
  margin-right: auto;
  padding: 10vh 0 0 5vw;
  h3 {
    color: ${(props) => props.theme.defaultText};
  }
  background: linear-gradient(rgba(255, 114, 114, 0.6), rgba(255, 114, 114, 0.2));
  font-size: 1.5em;
  display: flex;
  flex-direction: column;
  justity-content: center;

  height: 30vh;
  width: 100%;
`;
