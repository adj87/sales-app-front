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
import { ICustomer } from '../Customers/duck/types/Customer';
import { IProduct } from '../Products/duck/types/Product';
import { IFareLine } from '../Fares/duck/types/Fare';

interface OrdersComponentProps {
  orders: IOrder[];
  customers: ICustomer[];
  products: IProduct[];
  fareLines: IFareLine[];
  orderToForm: IOrder | null;
  fetchOrdersAndProducts: Function;
  fetchOrderAndCustomersAndFareAndProducts: Function;
  setOrderToCreateOrEdit: Function;
}

const OrdersComponent = ({
  orders,
  fetchOrderAndCustomersAndFareAndProducts,
  customers,
  orderToForm,
  setOrderToCreateOrEdit,
  products,
  fetchOrdersAndProducts,
  fareLines,
}: OrdersComponentProps) => {
  useEffect(() => {
    fetchOrdersAndProducts();
  }, []);

  return (
    <MainLayout>
      <Table
        columns={columns}
        data={orders}
        onAddButton={() => fetchOrderAndCustomersAndFareAndProducts('new')}
        tableName={'orders'}
        withSearching
        withPagination
        onRowClick={(datatableRowInfo: any) => {
          const order: IOrder = datatableRowInfo.original;
          fetchOrderAndCustomersAndFareAndProducts(`${order.type}-${order.id}`, order.customer_id);
        }}
      />
      {Boolean(orderToForm) && (
        <OrderModal
          onCancel={() => setOrderToCreateOrEdit(null)}
          customers={customers}
          fares={fareLines}
          products={products}
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
  fareLines: state.fares.data.fareLines,
});

const mapDispatch = {
  ...operations,
};

export const Orders = connect(mapState, mapDispatch)(OrdersComponent);
