import axios from 'axios';
import store from './store';

axios.interceptors.request.use(
  function (config) {
    config.headers.Year = store.getState().config.year;
    config.headers.Agent = store.getState().config.agent.id;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
