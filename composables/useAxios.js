export const useAxios = () => {
  const { $axiosWithAuth, $axiosNoAuth } = useNuxtApp();
  return { axiosWithAuth: $axiosWithAuth, axiosNoAuth: $axiosNoAuth };
};