import axios from 'axios';
import Cookies from 'js-cookie';

let lastErrorResponse = null;

const request = axios.create({
  baseURL: `https://api.yukumkm.my.id/api/v1`,
  timeout: 10000,
  headers: {
    // 'Content-Type': ' application/json',
    'Content-Type': ' multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
});

const requestHandler = (request) => {
  let token = Cookies.get('token');

  if (token !== undefined) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
};

const responseHandler = (response) => {
  return response;
};

const expiredTokenHandler = () => {
  localStorage.clear();
  Cookies.remove('token');
  window.location.href = '/login';
};

const errorHandler = (error) => {
  lastErrorResponse = error.response;

  if (error.response && error.response.status === 401) {
    expiredTokenHandler();
  } else if (error.code === 'ERR_NETWORK') {
    window.history.pushState({}, 'Redirect Network Error', '/login');

    if (error.response?.status === 401) {
      expiredTokenHandler();
    }
  }
  return Promise.reject(error);
};

request.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

request.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: (url, params = null, headers = {}) =>
    request({ method: 'get', url, params, headers }),
  post: (url, data, headers = {}) =>
    request({ method: 'post', url, data, headers }),
  put: (url, data, headers) => request({ method: 'put', url, data, headers }),
  patch: (url, data, headers) =>
    request({ method: 'patch', url, data, headers }),
  delete: (url, data) => request({ method: 'delete', url, data }),
  setToken: (token) => {
    if (token) {
      request.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete request.defaults.headers.common.Authorization;
    }
  },
  // Ekspor lastErrorResponse untuk digunakan di luar
  getLastErrorResponse: () => lastErrorResponse,
};
