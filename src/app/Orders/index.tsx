import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainLayout from '../../layouts/Main';
import Table from '../../components/Table';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { operations } from './duck';
import { IOrder } from './duck/types/Order';
import OrderModal from './Modal';
import { columns } from './constants';

interface OrdersComponentProps {
  orders: IOrder[];
  orderToForm: IOrder | null;
  fetchOrders: Function;
  fetchOrder: Function;
  fetchProducts: Function;
  fetchFares: Function;
  fetchFare: Function;
  fetchCustomers: Function;
  onCancelOrderModal: Function;
  deleteOrder: Function;
  isOpenModal: boolean;
}

const OrdersComponent = ({
  orders,
  orderToForm,
  onCancelOrderModal,
  fetchOrders,
  fetchOrder,
  fetchFares,
  fetchFare,
  fetchProducts,
  fetchCustomers,
  deleteOrder,
  isOpenModal,
}: OrdersComponentProps) => {
  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchFares();
    fetchCustomers();
  }, []);

  return (
    <MainLayout>
      <Table
        columns={columns}
        data={orders}
        onAddButton={() => {
          fetchFares();
          fetchOrder();
        }}
        tableName={'orders'}
        withSearching
        withPagination
        onRowClick={(datatableRowInfo: any) => {
          const order: IOrder = datatableRowInfo.original;
          fetchOrder(`${order.type}-${order.id}`);
          fetchFares();
          fetchFare(order.customer_id);
        }}
        deleteOnRowPress={(row: any) => {
          const order: IOrder = row.original;
          deleteOrder(order);
        }}
        messageOnDelete={(order: IOrder) => `${order.type}/${order.id}   ${order.customer_name}   ${order.total}`}
      />
      {isOpenModal && (
        <OrderModal
          onCancel={() => onCancelOrderModal()}
          // @ts-ignore
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
  isOpenModal:
    (Boolean(state.orders.fare?.customer_id) && Boolean(state.orders.elementToCreateOrEdit)) ||
    Boolean(state.orders.elementToCreateOrEdit?.customer_id === null),
});

const mapDispatch = {
  ...operations,
};

export const Orders = connect(mapState, mapDispatch)(OrdersComponent);
