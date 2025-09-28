import axios from "axios";

export const axiosInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_DEV_URL,
  });
  instance.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("Axios error:", error);
      return Promise.reject(error);
    }
  );

  return instance;
};
