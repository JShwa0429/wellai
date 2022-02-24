import { Page, SignUpPage, AuthPage, PublicPage, TestPage, CoursePage, CourseSearchPage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'styles/global-styles';
import { AuthRoute, PublicRoute } from './components';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Page />}>
          <Route path="/home" element={<SignUpPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/search" element={<CourseSearchPage />} />
          <Route path="/community" element={<SignUpPage />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/private" element={<AuthRoute element={AuthPage} />} />
        <Route path="/public" element={<PublicRoute element={PublicPage} />} />
        <Route path="/test" element={<PublicRoute element={TestPage} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
