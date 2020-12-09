import React, { useState } from 'react';
import Table from '../../../../components/Table';
import { columns } from '../../constants';
import Label from '../../../../components/Label';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { operations } from '../../duck';
import { AppStoreInterface } from '../../../../store/AppStoreInterface';
import ProductModal from './ProductModal';
import { IProduct } from '../../../Products/duck/types/Product';

interface OrderLinesTableProps {
  products: IProduct[];
  fetchProducts: Function;
}

const OrderLinesTable = ({ products, fetchProducts }: OrderLinesTableProps) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="mt-3">
      <Label style={{position:"absolute"}}>orders.form.label-orders-lines</Label>
      <Table
        data={[]}
        columns={columns}
        tableName="orderLines"
        onRowClick={() => setOpenModal(true)}
        onAddButton={() => setOpenModal(true)}
      />
      <ProductModal
        open={openModal}
        title="orders.form.products-form.title"
        onCancel={() => setOpenModal(false)}
        onConfirm={() => setOpenModal(false)}
        size="md"
        products={products}
        fetchProducts={fetchProducts}
      />
    </div>
  );
};

const mapState = (state: AppStoreInterface) => ({
  products: state.products.data,
});

const mapDispatch = {
  ...operations,
};

export default connect(mapState, mapDispatch)(OrderLinesTable);
