import axios from 'axios';
import store from './store';

const BACK = process.env.REACT_APP_BACK;

axios.interceptors.request.use(
  function (config) {
    if(BACK === 'PHP'){
      config.headers.Year = store.getState().config.year;
      config.headers.Agent = store.getState().config.agent.id;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
