import { Page, AuthPage, PublicPage, TestPage, ListenPage, SearchPage, CoursePage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'styles/global-styles';
import { AuthRoute, PublicRoute } from './components';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Page />}>
          <Route path="/home" element={<p>메인 랜더링 페이지</p>} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/course/:id" element={<ListenPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/community" element={<p>커뮤니티 페이지</p>} />
        </Route>
        <Route path="/signup" element={<p>Sign Up 페이지</p>} />
        <Route path="/private" element={<AuthRoute element={AuthPage} />} />
        <Route path="/public" element={<PublicRoute element={PublicPage} />} />
        <Route path="/test" element={<PublicRoute element={TestPage} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
