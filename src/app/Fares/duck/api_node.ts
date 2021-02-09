import axios from 'axios';
import { fareLinesToFares } from '../constants';
import { IFare } from './types/Fare';

const BACK_HOST = process.env.REACT_APP_BACK_HOST;
const API_FARES = `${BACK_HOST}/fares`;

const fetchFareLines = (customerId?: Number, byCustomersGrouping?: boolean) => {
  const url = customerId ? `${API_FARES}/${customerId}` : API_FARES;
  return axios.get(url);
};

const fetchFares = (customerId?: Number) => {
  const url = customerId ? `${API_FARES}/${customerId}` : API_FARES;
  return axios.get(url).then((res) => {
    const dataReorganized = fareLinesToFares(res.data);
    return { data: customerId ? dataReorganized[0] : dataReorganized };
  });
};

const createFare = (fare: IFare) => {
  const url = `${API_FARES}`;
  return axios.post(url, fare);
};

const editFare = (fare: IFare) => {
  const url = `${API_FARES}/customerId/${fare.customer_id}`;
  return axios.put(url, fare);
};

export default {
  fetchFareLines,
  fetchFares,
  createFare,
  editFare,
};
