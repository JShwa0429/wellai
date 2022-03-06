import { Category, SearchResult } from 'components/search';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
const SearchPage = () => {
  const { state } = useLocation();
  return (
    <Div>
      <Category keyword={state as string} />
      <SearchResult searchTitle="검색결과" />
    </Div>
  );
};

export default SearchPage;

const Div = styled.div`
  width: 100%;
  height: 100%;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  h2 {
    font-size: 1.2em;
  }
`;
