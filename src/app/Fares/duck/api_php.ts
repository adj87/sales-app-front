import axios from 'axios';

const BACK_HOST = process.env.REACT_APP_BACK_HOST;
const API_FARES = `${BACK_HOST}/fares`;

const fetchFares = (fareId?: Number) => {
  const url = fareId ? `${API_FARES}/${fareId}` : API_FARES;
  return axios.get(url);
};

export default {
  fetchFares,
};
