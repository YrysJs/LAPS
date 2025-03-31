import axios, { type AxiosResponse } from "axios";
import axiosRetry from "axios-retry";
const BaseUrl = process.env.BASE_URL;
const CancelerToken = () => axios.CancelToken.source();

export interface RestClientResponse<D> {
	success: boolean;
	message: string;
	client_id?: number;
	data: D;
}

const Provider = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: `${BaseUrl}/api/`,
  timeout: 100000,
});

axiosRetry(Provider, {
  retries: 1, // Количество попыток
  retryDelay: (retryCount) => retryCount * 2000, // Задержка между попытками
  //@ts-ignore
  retryCondition: (error) => !!error.config.retry, // Условие повторной отправки запроса
});
Provider.interceptors.request.use((request) => {
  //@ts-ignore
  const token = window.$nuxt.$store.$cookies.get("token");
  //@ts-ignore
  request.headers.common.Authorization = `Bearer ${token}`;
  return request;
});

Provider.interceptors.response.use(
  (res) => {
    return res.data || res;
  },
  (err) => {
    if (axios.isCancel(err)) {
      throw err;
    }
    if (err.response.status === 401) {
      window.$nuxt.$toast.open({
        message: "Ошибка авторизации",
        type: "error",
      });
      window.$nuxt.$router.push("/auth/login");
      throw err;
    }
    throw err;
  }
);

// Добавим новый провайдер для запросов с статичным токеном
const StaticTokenProvider = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer Cz6cOclnso5nsnO1fMAVPAKPs798NyFS0850SjzE"
  },
  baseURL: `${BaseUrl}/api/`,
  timeout: 100000,
});

// Добавим те же интерцепторы что и у основного провайдера, кроме токена
StaticTokenProvider.interceptors.response.use(
  (res) => {
    return res.data || res;
  },
  (err) => {
    if (axios.isCancel(err)) {
      throw err;
    }
    if (err.response.status === 401) {
      window.$nuxt.$toast.open({
        message: "Ошибка авторизации",
        type: "error",
      });
      window.$nuxt.$router.push("/auth/login");
      throw err;
    }
    throw err;
  }
);

export { Provider, StaticTokenProvider, BaseUrl, CancelerToken };
