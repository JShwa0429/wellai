import { Page, SignUpPage, AuthPage, PublicPage, TestPage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'styles/global-styles';
import { AuthRoute, PublicRoute } from './routes';
import './styles/antd.css';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Page />}>
          <Route path="/home" element={<SignUpPage />} />
          <Route path="/course" element={<SignUpPage />} />
          <Route path="/menu1" element={<SignUpPage />} />
          <Route path="/menu2" element={<SignUpPage />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/private" element={<AuthRoute element={AuthPage} />} />
        <Route path="/mypage/report" element={<PublicRoute element={PublicPage} />} />
        <Route path="/mypage/like" element={<PublicRoute element={PublicPage} />} />
        <Route path="/mypage/comment" element={<PublicRoute element={PublicPage} />} />
        <Route path="/mypage/edit" element={<PublicRoute element={PublicPage} />} />
        <Route path="/test" element={<PublicRoute element={TestPage} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
