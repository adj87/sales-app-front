import { operations as fareOperations } from '../../Fares/duck';
import { Dispatch } from 'react';
import { SetProducts, SetFare } from './types';
import actions from './actions';
import { IFare } from '../../Fares/duck/types/Fare';
import { IProduct } from '../../Products/duck/types/Product';
import { operations as productsOperations } from '../../Products/duck';
import { actions as loadingActions } from '../../Loading/duck';

const fetchProducts = productsOperations.fetchProducts;
const fetchFares = fareOperations.fetchFareAndFareLines;
const setProducts = (products: IProduct[]) => (dispatch: Dispatch<SetProducts>) => dispatch(actions.setProducts(products));
const setFare = (fare: IFare) => (dispatch: Dispatch<SetFare>) => dispatch(actions.setFare(fare));
const setLoadingOn = () => (dispatch: Dispatch<any>) => dispatch(loadingActions.addPendingRequest());
const setLoadingOff = () => (dispatch: Dispatch<any>) => dispatch(loadingActions.removePendingRequest());

export default { fetchFares, setProducts, setFare, fetchProducts, setLoadingOn, setLoadingOff };
