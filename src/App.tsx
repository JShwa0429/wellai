import {
  Page,
  AuthPage,
  TestPage,
  ExercisePage,
  SearchPage,
  CoursePage,
  MainRenderPage,
  GuidePage,
  CourseDetailPage,
  SignUpPage,
  MyPageLike,
  MyPageReport,
  MyPageEdit,
  MyPageComment,
} from './pages';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
          <Route path="/course" element={<CoursePage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/guide/:id" element={<GuidePage />} />

          <Route path="/search" element={<SearchPage />} />
          <Route path="/community" element={<p>커뮤니티 페이지</p>} />
          <Route path="/mypage/report" element={<PublicRoute element={MyPageReport} />} />
          <Route path="/mypage/like" element={<PublicRoute element={MyPageLike} />} />
          <Route path="/mypage/comment" element={<PublicRoute element={MyPageComment} />} />
          <Route path="/mypage/edit" element={<PublicRoute element={MyPageEdit} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="/exercise/:id" element={<ExercisePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/private" element={<AuthRoute element={AuthPage} />} />
        <Route path="/test" element={<PublicRoute element={TestPage} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
