import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainLayout from '../../layouts/Main';
import Table from '../../components/Table';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { operations } from './duck';
import { ICustomer } from './duck/types/ICustomer';
import { columns } from './constants';
import CustomerModal from './Modal';

interface CustomersComponentProps {
  customers: ICustomer[];
  fetchCustomers: Function;
  fetchCustomer: Function;
  fetchPaymentMethods: Function;
  fetchRoutes: Function;
  isOpenModal: boolean;
}

const CustomersComponent = ({ customers, fetchCustomers, fetchCustomer, isOpenModal, fetchPaymentMethods, fetchRoutes }: CustomersComponentProps) => {
  useEffect(() => {
    fetchPaymentMethods();
    fetchCustomers();
    fetchRoutes();
  }, []);
  return (
    <MainLayout>
      <Table
        columns={columns}
        data={customers}
        tableName={'customers'}
        withSearching
        withPagination
        onRowClick={(datatableRowInfo: any) => {
          const c: ICustomer = datatableRowInfo.original;
          fetchCustomer(c.id);
        }}
        onAddButton={() => fetchCustomer()}
      />
      {isOpenModal && <CustomerModal />}
    </MainLayout>
  );
};

const mapState = (state: AppStoreInterface) => ({
  customers: state.customers.data,
  isOpenModal: Boolean(state.customers.elementToCreateOrEdit),
});

const mapDispatch = {
  fetchCustomers: operations.fetchCustomers,
  fetchCustomer: operations.fetchCustomer,
  fetchPaymentMethods: operations.fetchPaymentMethods,
  fetchRoutes: operations.fetchRoutes,
};

export const Customers = connect(mapState, mapDispatch)(CustomersComponent);
