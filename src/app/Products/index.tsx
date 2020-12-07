import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainLayout from '../../layouts/Main';
import Table from '../../components/Table';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { operations } from './duck';
import { IProduct } from './duck/types/Product';
import OrderModal from './Modal';
import { columns } from './constants';
import { useOpenModalByRoutes } from '../../components/Table/useOpenModalByRoutes';

const OrdersComponent = ({
  orders,
  fetchOrders,
  fetchOrder,
  history,
  fetchCustomers,
  customers,
}: any) => {
  useEffect(() => {
    fetchOrders();
  }, []);

  const openModal = useOpenModalByRoutes();

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
          const product: IProduct = datatableRowInfo.original;
          history.push(`/products/${product.id}`);
        }}
      />
      {openModal && (
        <OrderModal
          onCancel={() => history.push(`/products`)}
          fetchOrder={fetchOrder}
          fetchCustomers={fetchCustomers}
          customers={customers}
        />
      )}
    </MainLayout>
  );
};

const mapState = (state: AppStoreInterface) => ({
  products: state.products.data,
});

const mapDispatch = {
  ...operations,
};

const OrdersComponentWithHistory = withRouter(OrdersComponent);

export const Orders = connect(mapState, mapDispatch)(OrdersComponentWithHistory);
