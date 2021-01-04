import axios from 'axios';
import { reduceToCustomersGrouping } from '../constants';

const BACK_HOST = process.env.REACT_APP_BACK_HOST;
const API_FARES = `${BACK_HOST}/fares`;

const fetchFares = (fareId?: Number, byCustomersGrouping?: boolean) => {
  const url = fareId ? `${API_FARES}/${fareId}` : API_FARES;
  return axios.get(url).then((res) => {
    if (byCustomersGrouping) {
      const dataReorganized = res.data.reduce(reduceToCustomersGrouping,[]);
      return { data: fareId ? dataReorganized[0] : dataReorganized };
    } else {
      return res;
    }
  });
};

export default {
  fetchFares,
};
