import { Category, SearchResult } from 'components/search';
import styled from 'styled-components';
const CourseSearchPage = () => {
  return (
    <Div>
      <Category />
      <SearchResult />
    </Div>
  );
};

export default CourseSearchPage;

const Div = styled.div`
  padding: 10%;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
