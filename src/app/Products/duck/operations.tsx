import actions from './actions';
import api_php from './api_php';
import api_node from './api_node';
import { operations as loadingOperations } from '../../Loading/duck';
import { SetElementToCreateOrEditAction } from './types';
import { Dispatch } from 'react';
const { fetchOperationWithLoading } = loadingOperations;

const api = process.env.REACT_APP_BACK === 'NODE' ? api_node : api_php;

const fetchProducts = () => fetchOperationWithLoading(api.fetchProducts, actions.setProducts);

const fetchProduct = (productId: string) => {
  if (productId) {
    return fetchOperationWithLoading(() => api.fetchProducts(productId), actions.setProductToCreateOrEdit);
  }
};

const removeElementToCreateOrEdit = () => (dispatch: Dispatch<SetElementToCreateOrEditAction>) => dispatch(actions.setProductToCreateOrEdit(null));

export default { fetchProducts, fetchProduct, removeElementToCreateOrEdit };
