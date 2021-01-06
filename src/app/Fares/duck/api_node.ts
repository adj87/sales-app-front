import axios from 'axios';
import { fareLinesToFares } from '../constants';

const BACK_HOST = process.env.REACT_APP_BACK_HOST;
const API_FARES = `${BACK_HOST}/fares`;

const fetchFareLines = (customerId?: Number, byCustomersGrouping?: boolean) => {
  const url = customerId ? `${API_FARES}/${customerId}` : API_FARES;
  return axios.get(url).then((res) => {
    if (byCustomersGrouping) {
      debugger;
      const dataReorganized = fareLinesToFares(res.data);
      return { data: customerId ? dataReorganized[0] : dataReorganized };
    } else {
      return res;
    }
  });
};

export default {
  fetchFareLines,
};
