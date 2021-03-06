import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainLayout from '../../layouts/Main';
import Table from '../../components/Table';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { operations } from './duck';
import { IOrder } from './duck/types/Order';
import OrderModal from './Modal';
import { columns, defaultValues } from './constants';
import { useOpenModalByRoutes } from '../../components/Table/useOpenModalByRoutes';

const OrdersComponent = ({
  orders,
  fetchOrdersAndProducts,
  fetchOrderAndCustomersAndFaresAndProducts,
  history,
  customers,
  orderToForm,
  setOrderToCreateOrEdit,
  products,
  fares,
}: any) => {
  useEffect(() => {
    fetchOrdersAndProducts();
  }, []);

  const openModal = useOpenModalByRoutes();
  useEffect(() => {
    if (openModal === 'new') {
      //CREATE
      return setOrderToCreateOrEdit(defaultValues);
    }
    // @ts-ignore
    if (openModal) {
      //EDIT
      return fetchOrderAndCustomersAndFaresAndProducts(openModal);
    }
    //CLOSE
    if (orderToForm !== null) return setOrderToCreateOrEdit(null);
  }, [openModal]);

  return (
    <MainLayout>
      <Table
        columns={columns}
        data={orders}
        onAddButton={() => history.push('/orders/new')}
        tableName={'orders'}
        withSearching
        withPagination
        onRowClick={(datatableRowInfo: any) => {
          const order: IOrder = datatableRowInfo.original;
          history.push(`/orders/${order.type}-${order.id}`);
        }}
      />
      {Boolean(orderToForm) && (
        <OrderModal
          onCancel={() => history.push(`/orders`)}
          customers={customers}
          fares={fares}
          products={products}
          order={orderToForm}
        />
      )}
    </MainLayout>
  );
};

const mapState = (state: AppStoreInterface) => ({
  orders: state.orders.data,
  products: state.products.data,
  orderToForm: state.orders.elementToCreateOrEdit,
  customers: state.customers.data,
  fares: state.fares.data,
});

const mapDispatch = {
  ...operations,
};

const OrdersComponentWithHistory = withRouter(OrdersComponent);

export const Orders = connect(mapState, mapDispatch)(OrdersComponentWithHistory);
