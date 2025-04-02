import axios from 'axios';

export default defineNuxtPlugin(nuxtApp => {
  const axiosNoAuth = axios.create({
    baseURL: process.env.API_BASE_URL,
  });

  const axiosWithAuth = axios.create({
    baseURL: process.env.API_BASE_URL,
  });

  axiosWithAuth.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
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
          const refreshToken = localStorage.getItem('refresh_token'); 
          const refreshResponse = await axios.post('https://your-auth-api-url.com/refresh', {
            refresh_token: refreshToken,
          });

          const newToken = refreshResponse.data.token;
          localStorage.setItem('token', newToken);
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
