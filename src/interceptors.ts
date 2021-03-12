import axios from 'axios';
import store from './store';

axios.interceptors.request.use(
  function (config) {
    config.headers.Year = store.getState().config.year;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
