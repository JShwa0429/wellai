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
  margin-top: 10vh;
  margin-right: auto;
  h3 {
    color: ${(props) => props.theme.defaultText};
  }
  font-size: 1.5em;
  height: 30%;
  width: 100%;
`;
