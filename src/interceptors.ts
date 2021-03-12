import axios from 'axios';

axios.interceptors.request.use(
  function (config) {
    config.headers.Year = '2020';

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
