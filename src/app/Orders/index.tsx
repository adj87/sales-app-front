import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MainLayout from '../../layouts/Main';
import Table from '../../components/Table';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { operations } from './duck';

const OrdersComponent = ({ orders, fetchOrders }: any) => {
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
    fetchOrders();
  }, []);
  return (
    <MainLayout>
      <Table
        columns={columns}
        data={orders}
        onAddButton={() => console.log('yeah')}
        tableName={'orders'}
        withSearching
        withPagination
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

export const Orders = connect(mapState, mapDispatch)(OrdersComponent);
