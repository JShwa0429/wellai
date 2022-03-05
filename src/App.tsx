import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {
  Page,
  AuthPage,
  TestPage,
  ListenPage,
  SearchPage,
  CoursePage,
  MainRenderPage,
  CourseDetailPage,
  SignUpPage,
  MyPageLike,
  MyPageReport,
  MyPageEdit,
  MyPageComment,
} from './pages';
import { Routes, Route } from 'react-router-dom';
import GlobalStyle from 'styles/global-styles';
import { AuthRoute, PublicRoute } from './routes';
import './styles/antd.css';

function App() {
  const navigate = useNavigate();
  // let isAlreadyFetchingAccessToken = false;
  axios.defaults.baseURL = process.env.REACT_APP_NEXT_PUBLIC_BASE_URL;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('access')}` || false;

  const signout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    navigate('/');
  };
  // useEffect(() => {

  // }, []);
  // axios.interceptors.response.use(
  //   (response) => {
  //     isAlreadyFetchingAccessToken = false;
  //     return response;
  //   },
  //   async (error) => {
  //     console.log('여기옴?');
  //     console.log(error);
  //     const originalRequest = error.config;

  //     // //무한 루프 방지
  //     // //AT001 === 토큰 만료
  //     // //AT002 === 리프레시 토큰 만료
  //     // if (error.response.data.code === 'AT002') {
  //     //   signout();
  //     //   return Promise.reject(error);
  //     // }

  //     // if (!isAlreadyFetchingAccessToken && error.response.data.code === 'AT001') {
  //     //   isAlreadyFetchingAccessToken = true;
  //     //   try {
  //     //     const res = await axios.post('user/renew_token', {
  //     //       refreshToken: Cookies.get('refreshToken'),
  //     //     });
  //     //     const { refresh, access } = res.data;

  //     //     Cookies.set('access', access, { path: '/', maxAge: 3600 });
  //     //     Cookies.set('refresh', refresh, { path: '/', maxAge: 7200 });

  //     //     originalRequest.headers['Authorization'] = access;
  //     //     axios.defaults.headers.common['Authorization'] = access;

  //     //     return axios(originalRequest);
  //     //   } catch (error) {
  //     //     signout();
  //     //     isAlreadyFetchingAccessToken = false;
  //     //     return Promise.reject(error);
  //     //   }
  //     // }

  //     return Promise.reject(error);
  //   },
  // );

  return (
    // <BrowserRouter>
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Page />}>
          <Route path="" element={<MainRenderPage />} />
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
    </>
    // </BrowserRouter>
  );
}

export default App;
