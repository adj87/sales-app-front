import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainLayout from '../../layouts/Main';
import Table from '../../components/Table';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { operations } from './duck';
import { ICustomer, IRoute, IPaymentMethod } from './duck/types/ICustomer';
import { columns } from './constants';
import CustomerModal from './Modal';

interface CustomersComponentProps {
  customers: ICustomer[];
  fetchCustomers: Function;
  fetchCustomer: Function;
  fetchPaymentMethods: Function;
  deleteCustomer: Function;
  fetchRoutes: Function;
  isOpenModal: boolean;
  removeElementToCreateOrEdit: Function;
  customer: ICustomer | null;
  editCustomer: Function;
  createCustomer: Function;
  paymentMethods: IPaymentMethod[];
  routes: IRoute[];
}

const CustomersComponent = ({
  customers,
  fetchCustomers,
  fetchCustomer,
  isOpenModal,
  fetchPaymentMethods,
  fetchRoutes,
  deleteCustomer,
  customer,
  routes,
  paymentMethods,
  editCustomer,
  createCustomer,
  removeElementToCreateOrEdit,
}: CustomersComponentProps) => {
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
        deleteOnRowPress={(row: any) => {
          const c: ICustomer = row.original;
          deleteCustomer(c);
        }}
      />
      {isOpenModal && (
        <CustomerModal
          customer={customer}
          routes={routes}
          paymentMethods={paymentMethods}
          onSubmit={(c: ICustomer) => {
            if (c.id) {
              editCustomer(c, removeElementToCreateOrEdit);
            } else {
              createCustomer && createCustomer(c, removeElementToCreateOrEdit);
            }
          }}
          onCancel={removeElementToCreateOrEdit}
        />
      )}
    </MainLayout>
  );
};

const mapState = (state: AppStoreInterface) => ({
  customers: state.customers.data,
  isOpenModal: Boolean(state.customers.elementToCreateOrEdit),
  customer: state.customers.elementToCreateOrEdit,
  routes: state.customers.routes,
  paymentMethods: state.customers.paymentMethods,
});

const mapDispatch = {
  fetchCustomers: operations.fetchCustomers,
  fetchCustomer: operations.fetchCustomer,
  fetchPaymentMethods: operations.fetchPaymentMethods,
  fetchRoutes: operations.fetchRoutes,
  deleteCustomer: operations.deleteCustomer,
  editCustomer: operations.editCustomer,
  createCustomer: operations.createCustomer,
  removeElementToCreateOrEdit: operations.removeElementToCreateOrEdit,
};

export const Customers = connect(mapState, mapDispatch)(CustomersComponent);
