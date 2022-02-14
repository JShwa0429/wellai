import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL= 'http://localhost:3000';
const DOMAIN = 'http://localhost:8030';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `http://localhost:3000`;

const req = (
    method,
    url,
    cb = () => { },
    { params = {}, data = {}, headers = {}, responseType = "json" },
    is_based = true
) => {
    const accessToken = Cookies.get('accessToken') || undefined;
    return axios({
        method,
        url: is_based ? BASE_URL + url : url,
        params,
        data,
        headers: { Authorization: accessToken || null, ...headers },
        responseType
    })
        .then((res) => {
            return cb(res);
        })
        .catch((e) => {
            // for development
            // console.log(e);
            // console.log(e.response);
            const { status, data, config } = e.response;
            if (!e.response || e.message === 'Network Error') {
                console.log('Server Error!');
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