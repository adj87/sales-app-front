import actions from './actions';
import api_php from './api_php';
import api_node from './api_node';
import { operations as loadingOperations } from '../../Loading/duck';
const { fetchOperationWithLoading } = loadingOperations;

const api = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const fetchProducts = () => fetchOperationWithLoading(api.fetchProducts, actions.setProducts);

export default { fetchProducts };
