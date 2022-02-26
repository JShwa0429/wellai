import { Category, SearchResult } from 'components/search';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
const SearchPage = () => {
  const { state } = useLocation();
  return (
    <Div>
      <Category keyword={state as string} />
      <SearchResult />
    </Div>
  );
};

export default SearchPage;

const Div = styled.div`
  padding: 0 5vw;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
