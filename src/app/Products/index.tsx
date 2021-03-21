import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainLayout from '../../layouts/Main';
import Table from '../../components/Table';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { operations } from './duck';
import { IProduct } from './duck/types/Product';
import { columns } from './constants';

const ProductsComponent = ({ products, fetchProducts }: any) => {
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <MainLayout>
      <Table
        columns={columns}
        data={products}
        onAddButton={() => console.log('as')}
        tableName={'products'}
        withSearching
        withPagination
        onRowClick={(datatableRowInfo: any) => {
          const product: IProduct = datatableRowInfo.original;
          console.log(product);
        }}
      />
      {/*       {openModal && (
        <OrderModal onCancel={() => history.push(`/products`)} fetchOrder={fetchOrder} fetchCustomers={fetchCustomers} customers={customers} />
      )} */}
    </MainLayout>
  );
};

const mapState = (state: AppStoreInterface) => ({
  products: state.products.data,
});

const mapDispatch = {
  ...operations,
};

const ProductsComponentWithHistory = withRouter(ProductsComponent);

export const Products = connect(mapState, mapDispatch)(ProductsComponentWithHistory);
