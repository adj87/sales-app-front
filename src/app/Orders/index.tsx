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
  fetchOrderAndCustomersAndFaresAndProducts: Function;
  setOrderToCreateOrEdit: Function;
}

const OrdersComponent = ({
  orders,
  fetchOrdersAndProducts,
  fetchOrderAndCustomersAndFaresAndProducts,
  customers,
  orderToForm,
  setOrderToCreateOrEdit,
  products,
  fareLines,
}: OrdersComponentProps) => {
  const state = useOpenModalByRoutes();
  // @ts-ignore

  useEffect(() => {
    if (state?.actionModal)
      switch (state?.actionModal.name) {
        case 'new':
          return setOrderToCreateOrEdit(defaultValues);
        case 'close':
          return setOrderToCreateOrEdit(null);
        case 'edit':
          return fetchOrderAndCustomersAndFaresAndProducts(state?.actionModal?.params);
        case 'nothing':
          return fetchOrdersAndProducts();
      }
  }, [state]);

  return (
    <MainLayout>
      <Table
        columns={columns}
        data={orders}
        onAddButton={() => state && state.history.push('/orders/new')}
        tableName={'orders'}
        withSearching
        withPagination
        onRowClick={(datatableRowInfo: any) => {
          const order: IOrder = datatableRowInfo.original;
          state && state.history.push(`/orders/${order.type}-${order.id}`);
        }}
      />
      {Boolean(orderToForm) && (
        <OrderModal
          onCancel={() =>
            state && state.history.push({ pathname: `/orders`, state: { closeModal: true } })
          }
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
