import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MainLayout from '../../layouts/Main';
import Table from '../../components/Table';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { operations } from './duck';
import Modal from '../../components/Modal';
import TableWithModal from '../../components/Table/TableWithModal';
import { Order } from './mainInterfaces';
import OrderModal from './Modal';
import { withRouter, useParams } from 'react-router-dom';

interface params {
  id: string;
}
const OrdersComponent = ({ orders, fetchOrders, history }: any) => {
  const pathname = history.location.pathname;
  let params = useParams<params>();
  let [openModal, setOpenModal] = useState<boolean>(false);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          { Header: 'type', accessor: 'type' },
          { Header: 'id', accessor: 'id' },
          { Header: 'customer_name', accessor: 'customer_name' },
          { Header: 'address', accessor: 'address' },
          { Header: 'date', accessor: 'date' },
          { Header: 'delivery_date', accessor: 'delivery_date' },
          { Header: 'zip_code', accessor: 'zip_code' },
          { Header: 'green_point', accessor: 'green_point' },
          { Header: 'customer_route_id', accessor: 'customer_route_id' },
          { Header: 'total', accessor: 'total' },
          { Header: 'total_net', accessor: 'total_net' },
          { Header: 'total_taxes', accessor: 'total_taxes' },
        ],
      },
    ],
    [],
  );

  useEffect(() => {
    console.log('pasa 1 vez');
    fetchOrders();
  }, []);

  useEffect(() => {
    if (params.id) {
      setOpenModal(true);
    }
    if (openModal) {
      setOpenModal(false);
    }
  }, [pathname]);

  console.log('the params', history);
  return (
    <MainLayout>
      <TableWithModal
        openModal={openModal}
        columns={columns}
        data={orders}
        onAddButton={() => history.push('/orders/new')}
        tableName={'orders'}
        withSearching
        withPagination
        onRowClick={(row: Order) => history.push(`/orders/${row.id}`)}
        modal={() => <OrderModal onCancel={() => history.push(`/orders`)} />}
      />
    </MainLayout>
  );
};

const mapState = (state: AppStoreInterface) => ({
  orders: state.orders.orders,
});

const mapDispatch = {
  ...operations,
};

const OrdersComponentWithHistory = withRouter(OrdersComponent);

export const Orders = connect(mapState, mapDispatch)(OrdersComponentWithHistory);
