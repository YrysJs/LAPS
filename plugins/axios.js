import axios from 'axios';
import { getCookie, setCookie } from '~/utlis/cookie';

export default defineNuxtPlugin(nuxtApp => {
  const axiosNoAuth = axios.create({
    baseURL: 'http://94.247.129.222:8080/api/v1',
  });

  const axiosWithAuth = axios.create({
    baseURL: 'http://94.247.129.222:8080/api/v1',
  });

  axiosWithAuth.interceptors.request.use(config => {
    const token = getCookie('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  axiosWithAuth.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      if (error.response && error.response.status === 401) {
        try {
          const refreshToken = getCookie('refresh_token'); 
          const refreshResponse = await axios.post('http://94.247.129.222:8080/api/v1/auth/refresh', {
            refresh_token: refreshToken,
          });

          const newToken = refreshResponse.data.data.access_token;
          setCookie('access_token', newToken);
          error.config.headers['Authorization'] = `Bearer ${newToken}`;

          return axios(error.config);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  nuxtApp.provide('axiosNoAuth', axiosNoAuth);
  nuxtApp.provide('axiosWithAuth', axiosWithAuth);
});
