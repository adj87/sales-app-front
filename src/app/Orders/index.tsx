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
  fetchOrders,
  fetchOrder,
  history,
  fetchCustomers,
  customers,
  orderToForm,
  setOrderToCreateOrEdit,
}: any) => {
  useEffect(() => {
    fetchOrders();
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
      return fetchOrder(openModal);
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
          fetchCustomers={fetchCustomers}
          customers={customers}
          order={orderToForm}
        />
      )}
    </MainLayout>
  );
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
