import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

import MainLayout from '../../layouts/Main';
import Table from '../../components/Table';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { operations } from './duck';
import { Order } from './mainInterfaces';
import OrderModal from './Modal';
import { columns } from './constants';

const OrdersComponent = ({ orders, fetchOrders, fetchOrder, history }: any) => {
  const { pathname } = history.location;
  let [openModal, setOpenModal] = useState<boolean>(false);
  let { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const isThisRouteForCreatingOrEdit = id || pathname.includes('new');
    if (isThisRouteForCreatingOrEdit) {
      setOpenModal(true);
    }
    if (openModal) {
      setOpenModal(false);
    }
  }, [pathname]);

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
          const order: Order = datatableRowInfo.original;
          history.push(`/orders/${order.id}/type/${order.type}`);
        }}
      />
      {openModal && <OrderModal onCancel={() => history.push(`/orders`)} fetchOrder={fetchOrder} />}
    </MainLayout>
  );
};

const mapState = (state: AppStoreInterface) => ({
  orders: state.orders.data,
});

const mapDispatch = {
  ...operations,
};

const OrdersComponentWithHistory = withRouter(OrdersComponent);

export const Orders = connect(mapState, mapDispatch)(OrdersComponentWithHistory);
