import Cookies from "js-cookie";

export const setCookie = (key, value, parameters) =>
  Cookies.set(key, value, parameters);
export const getCookie = (key) => Cookies.get(key);
export const removeCookie = (key) => Cookies.remove(key);