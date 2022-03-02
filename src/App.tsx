import {
  Page,
  AuthPage,
  TestPage,
  ListenPage,
  SearchPage,
  CoursePage,
  MainRenderPage,
  MainRenderPageTemp,
  CourseDetailPage,
  SignUpPage,
  MyPageLike,
  MyPageReport,
  MyPageEdit,
  MyPageComment,
} from './pages';
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
          <Route path="" element={<MainRenderPage />} />
          <Route path="/main" element={<MainRenderPageTemp />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/listen/:id" element={<ListenPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/community" element={<p>커뮤니티 페이지</p>} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/private" element={<AuthRoute element={AuthPage} />} />
        <Route path="/" element={<Page />}>
          <Route path="/mypage/report" element={<PublicRoute element={MyPageReport} />} />
          <Route path="/mypage/like" element={<PublicRoute element={MyPageLike} />} />
          <Route path="/mypage/comment" element={<PublicRoute element={MyPageComment} />} />
          <Route path="/mypage/edit" element={<PublicRoute element={MyPageEdit} />} />
        </Route>
        <Route path="/test" element={<PublicRoute element={TestPage} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
