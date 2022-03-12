import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {
  Page,
  AuthPage,
  TestPage,
  ExercisePage,
  ExercisePage2,
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

import { Routes, Route, Navigate } from 'react-router-dom';

import GlobalStyle from 'styles/global-styles';
import { AuthRoute, PublicRoute } from './routes';
import * as myPageAction from 'features/myPageSlice';
import './styles/antd.css';
import { useAppDispatch } from 'hooks/useStoreHooks';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // axios.defaults.baseURL = process.env.REACT_APP_NEXT_PUBLIC_BASE_URL;
  axios.defaults.withCredentials = true;

  if (Cookies.get('access')) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('access')}`;
  }

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Page />}>
          <Route path="" element={<MainRenderPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />

          <Route path="/search" element={<SearchPage />} />
          <Route path="/guide/:id" element={<AuthRoute element={GuidePage} />} />
          <Route path="/mypage" element={<Navigate to="/mypage/report" />} />
          <Route path="/mypage/report" element={<AuthRoute element={MyPageReport} />} />
          <Route path="/mypage/like" element={<AuthRoute element={MyPageLike} />} />
          <Route path="/mypage/comment" element={<AuthRoute element={MyPageComment} />} />
          <Route path="/mypage/edit" element={<AuthRoute element={MyPageEdit} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/exercise/:id" element={<AuthRoute element={ExercisePage2} />} />
      </Routes>
    </>
  );
}

export default App;
