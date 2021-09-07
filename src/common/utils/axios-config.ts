import { set } from 'lodash';
import axios from 'axios';
import Cookie from 'js-cookie';
import errorHandler from '../error-handler';

let initialized = false;

export const initAxios = () => {
  if (initialized) {
    return;
  }
  // interceptor request
  axios.interceptors.request.use(
    (config) => {
      const { headers, method = 'GET' } = config;
      if (!['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(method)) {
        const token = Cookie.get('OPENAPI-CSRF-TOKEN');
        if (token) {
          headers['OPENAPI-CSRF-TOKEN'] = token;
        }
      }

      const cancelToken = axios.CancelToken.source();
      set(config, 'cancelToken', cancelToken.token);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // interceptor response
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response) {
        errorHandler(error);
        if (error.response.status === 401) {
          // 401 跳转
          const data = await axios.get('/api/openapi/login');
          if (data.data && data.data.url) {
            window.location.href = data.data.url;
          }
        }
      }
      return Promise.reject(error);
    },
  );
  initialized = true;
};
