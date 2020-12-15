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
  orderToEdit,
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
    if (orderToEdit !== null) return setOrderToCreateOrEdit(null);
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
      {Boolean(orderToEdit) && (
        <OrderModal
          onCancel={() => history.push(`/orders`)}
          fetchCustomers={fetchCustomers}
          customers={customers}
          orderToEdit={orderToEdit}
        />
      )}
    </MainLayout>
  );
};

const mapState = (state: AppStoreInterface) => ({
  orders: state.orders.data,
  orderToEdit: state.orders.elementToCreateOrEdit,
  customers: state.customers.data,
});

const mapDispatch = {
  ...operations,
};

const OrdersComponentWithHistory = withRouter(OrdersComponent);

export const Orders = connect(mapState, mapDispatch)(OrdersComponentWithHistory);
