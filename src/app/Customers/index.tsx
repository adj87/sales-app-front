import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainLayout from '../../layouts/Main';
import Table from '../../components/Table';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { operations } from './duck';
import { ICustomer } from './duck/types/ICustomer';
import { columns } from './constants';

//import ProductModal from './Modal';

const ProductsComponent = ({ customers, fetchCustomers }: any) => {
  useEffect(() => {
    fetchCustomers();
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
          fetchCustomers(c.id);
        }}
      />
      {/*       {isOpenModal && <ProductModal onCancel={() => removeElementToCreateOrEdit()} product={productToEdit} editProduct={editProduct} />}
       */}{' '}
    </MainLayout>
  );
};

const mapState = (state: AppStoreInterface) => ({
  customers: state.customers.data,
  productToEdit: state.customers.elementToCreateOrEdit,
  isOpenModal: Boolean(state.customers.elementToCreateOrEdit),
});

const mapDispatch = {
  ...operations,
};

const ProductsComponentWithHistory = withRouter(ProductsComponent);

export const Customers = connect(mapState, mapDispatch)(ProductsComponentWithHistory);
