import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainLayout from '../../layouts/Main';
import Table from '../../components/Table';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { operations } from './duck';
import { IFare } from './duck/types/Fare';
import { columns, defaultValues } from './constants';
import { useOpenModalByRoutes } from '../../components/Table/useOpenModalByRoutes';

const OrdersComponent = ({
  orders,
  fetchOrders,
  fetchOrder,
  history,
  fetchCustomers,
  customers,
  orderToForm,
  setOrderToCreateOrEdit,
}: any) => {
  return <div></div>;
};

const mapState = (state: AppStoreInterface) => ({
  orders: state.orders.data,
  orderToForm: state.orders.elementToCreateOrEdit,
  customers: state.customers.data,
});

const mapDispatch = {
  ...operations,
};

const OrdersComponentWithHistory = withRouter(OrdersComponent);

export const Orders = connect(mapState, mapDispatch)(OrdersComponentWithHistory);
