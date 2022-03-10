import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://127.0.0.1:3000';
const DOMAIN = 'http://127.0.0.1:8030';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `http://127.0.0.1:3000`;

const req = (
  method,
  url,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  cb = () => {},
  { params = {}, data = {}, headers = {}, responseType = 'json' },
  is_based = true,
) => {
  const accessToken = Cookies.get('accessToken') || undefined;
  return axios({
    method,
    url: is_based ? BASE_URL + url : url,
    params,
    data,
    headers: { Authorization: accessToken || null, ...headers },
    responseType,
  })
    .then((res) => {
      return cb(res);
    })
    .catch((e) => {
      const { status, data, config } = e.response;
      if (!e.response || e.message === 'Network Error') {
        return { status, data, config };
      }
      if (status === 401) {
        Cookies.remove('ownerToken');
        window.location.reload();
        return { status, data, config };
      }

      return { status, data, config };
    });
};

export default req;
