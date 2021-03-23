import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainLayout from '../../layouts/Main';
import Table from '../../components/Table';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { operations } from './duck';
import { IProduct } from './duck/types/Product';
import { columns } from './constants';
import ProductModal from './Modal';

const ProductsComponent = ({ products, fetchProducts, fetchProduct, isOpenModal, removeElementToCreateOrEdit, productToEdit, editProduct }: any) => {
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <MainLayout>
      <Table
        columns={columns}
        data={products}
        tableName={'products'}
        withSearching
        withPagination
        onRowClick={(datatableRowInfo: any) => {
          const product: IProduct = datatableRowInfo.original;
          fetchProduct(product.id);
        }}
      />
      {isOpenModal && <ProductModal onCancel={() => removeElementToCreateOrEdit()} product={productToEdit} editProduct={editProduct} />}
    </MainLayout>
  );
};

const mapState = (state: AppStoreInterface) => ({
  products: state.products.data,
  productToEdit: state.products.elementToCreateOrEdit,
  isOpenModal: Boolean(state.products.elementToCreateOrEdit),
});

const mapDispatch = {
  ...operations,
};

const ProductsComponentWithHistory = withRouter(ProductsComponent);

export const Products = connect(mapState, mapDispatch)(ProductsComponentWithHistory);
