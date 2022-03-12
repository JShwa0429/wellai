import styled from 'styled-components';
import { useOutlet } from 'react-router-dom';
import { Header, Footer } from 'components';
const Page = () => {
  const outlet = useOutlet();
  return (
    <Div>
      <Header />
      <section>{outlet}</section>
      <Footer />
    </Div>
  );
};

const Div = styled.div`
  width: 100vw;
  height: max-content;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
  section {
    width: 100vw;
    min-width: 1000px;
    padding-top: 80px;
    display: flex;
    justify-content: center;
    height: max-content;
  }
`;
export default Page;
