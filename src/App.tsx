import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'hooks/useStoreHooks';
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
import * as myPageAction from 'features/myPageSlice';
import './styles/antd.css';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.myPage, shallowEqual);
  let isAlreadyFetchingAccessToken = false;
  axios.defaults.baseURL = process.env.REACT_APP_NEXT_PUBLIC_BASE_URL;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('access')}` || false;

  const signout = () => {
    Cookies.remove('access');
    Cookies.remove('refresh');
    navigate('/');
  };

  // axios.interceptors.request.use(function (config) {
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('access')}` || false;
  //   return config;
  // });
  axios.interceptors.response.use(
    (response) => {
      isAlreadyFetchingAccessToken = false;
      return response;
    },
    async (error) => {
      const fromWhere = error.response.config.url;

      const originalRequest = error.config;

      // 리프레시 토큰으로 재요청 보냈는데 리프레시 토큰 마저 만료된경우
      if (fromWhere === '/users/token/refresh') {
        signout();
        return Promise.reject(error);
      }
      //무한 루프 방지
      // 엑세스토큰 만료된 경우
      if (
        !isAlreadyFetchingAccessToken &&
        fromWhere !== '/users/token/refresh' &&
        error.response.data.code === 'token_not_valid'
      ) {
        isAlreadyFetchingAccessToken = true;
        try {
          const res = await axios.post('/users/token/refresh', {
            refresh: Cookies.get('refresh'),
          });
          const { refresh, access } = res.data;

          Cookies.set('access', access, { path: '/', expires: 1 });
          Cookies.set('refresh', refresh, { path: '/', expires: 7 });
          dispatch(myPageAction.tokenChange(access));

          originalRequest.headers['Authorization'] = access;
          axios.defaults.headers.common['Authorization'] = access;

          return axios(originalRequest);
        } catch (error) {
          signout();
          isAlreadyFetchingAccessToken = false;
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    },
  );

  return (
    // <BrowserRouter>
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Page />}>
          <Route path="" element={<MainRenderPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/guide/:id" element={<GuidePage />} />

          <Route path="/search" element={<SearchPage />} />
          <Route path="/community" element={<p>커뮤니티 페이지</p>} />
        </Route>

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<Page />}>
          <Route path="/mypage/report" element={<AuthRoute element={MyPageReport} />} />
          <Route path="/mypage/like" element={<AuthRoute element={MyPageLike} />} />
          <Route path="/mypage/comment" element={<AuthRoute element={MyPageComment} />} />
          <Route path="/mypage/edit" element={<AuthRoute element={MyPageEdit} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="/exercise/:id" element={<ExercisePage />} />
        <Route path="/private" element={<AuthRoute element={AuthPage} />} />
        <Route path="/test" element={<PublicRoute element={TestPage} />} />
      </Routes>
    </>
    // </BrowserRouter>
  );
}

export default App;
