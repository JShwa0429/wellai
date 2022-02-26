import styled from 'styled-components';

const Category = (props: any) => {
  return (
    <Div>
      <h2>카테고리</h2>
      <h1>서서 #앉아서 #밸런스 등 해쉬태그 등등등</h1>
    </Div>
  );
};
export default Category;

const Div = styled.div`
  margin-right: auto;
  h2 {
    color: ${(props) => props.theme.defaultText};
  }
  font-size: 1.5em;
  height: 30%;
  width: 100%;
`;
