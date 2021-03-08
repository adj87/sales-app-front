import axios from 'axios';
import { getPhpBackHostUrl } from '../../../utils';
import { fareLinesToFares } from '../constants';
import { IFare } from './types/Fare';

const BACK_HOST = getPhpBackHostUrl();
const API_FARES = `${BACK_HOST}/tarifa`;

const fetchFareLines = (fareId?: Number) => {
  const url = fareId ? `${API_FARES}/?id=${fareId}` : API_FARES;
  return axios.get(url);
};

const fetchFares = (customerId?: Number) => {
  const url = customerId ? `${API_FARES}/?id=${customerId}` : API_FARES;
  return axios.get(url).then((res) => {
    const dataReorganized = fareLinesToFares(res.data);
    return { data: customerId ? dataReorganized[0] : dataReorganized };
  });
};

const createFare = (fare: IFare) => {
  const url = `${API_FARES}`;
  return axios.post(url, fare).then((res) => {
    const dataReorganized = fareLinesToFares(res.data);
    return { data: dataReorganized[0] };
  });
};

const editFare = (fare: IFare) => {
  const url = `${API_FARES}/customerId/${fare.customer_id}`;
  return axios.put(url, fare);
};

const deleteFare = (customerId: string) => {
  const url = `${API_FARES}/${customerId}`;
  return axios.delete(url);
};

export default {
  fetchFareLines,
  fetchFares,
  createFare,
  editFare,
  deleteFare,
};
