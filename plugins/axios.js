import axios from 'axios';
import { getCookie } from '~/utlis/cookie';
import { useAuthStore } from '~/store/useAuthStore';


export default defineNuxtPlugin(nuxtApp => {
  const axiosNoAuth = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  const axiosWithAuth = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  axiosWithAuth.interceptors.request.use(config => {
    const token = getCookie('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
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
          await useAuthStore().refreshToken({refresh_token: getCookie('refresh_token')})
          error.config.headers['Authorization'] = `Bearer ${getCookie('access_token')}`;

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
