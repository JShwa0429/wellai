import styled from 'styled-components';

const SearchResult = () => {
  return (
    <Div>
      <h2>검색결과</h2>
    </Div>
  );
};

export default SearchResult;

const Div = styled.div`
  font-size: 1.5em;
  h2 {
    color: ${(props) => props.theme.defaultText};
    width: 100%;
    border-bottom: 1px solid #888;
    padding: 50px 0;
  }
  width: 100%;
`;
