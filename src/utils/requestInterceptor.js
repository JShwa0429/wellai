import Cookies from 'js-cookie';
const signout = () => {
  Cookies.remove('access');
  Cookies.remove('refresh');
  window.location.reaload();
};
export default function putInterceptor(axios) {
  axios.defaults.withCredentials = true;
  let isAlreadyFetchingAccessToken = false;
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
        error.response.status === 401 &&
        !Cookies.get('access')
      ) {
        isAlreadyFetchingAccessToken = true;
        try {
          const res = await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_BASE_URL}/users/token/refresh`, {
            refresh: Cookies.get('refresh'),
          });
          const { refresh, access } = res.data;

          Cookies.set('access', access, { path: '/', expires: 1 });
          Cookies.set('refresh', refresh, { path: '/', expires: 7 });

          originalRequest.headers['Authorization'] = access;
          axios.defaults.headers.common['Authorization'] = access;

          return axios(originalRequest);
        } catch (error) {
          signout();
          isAlreadyFetchingAccessToken = false;
          return Promise.reject(error);
        } finally {
          window.location.reload();
        }
      }

      return Promise.reject(error);
    },
  );
}
