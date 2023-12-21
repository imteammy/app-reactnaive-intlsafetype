import _axios from "axios";

const axios = () => {
  const instance = _axios.create({
    baseURL: "http://localhost:4000",
  });

  instance.interceptors.request.use(
    (value) => {
      return Promise.resolve(value);
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default axios;
