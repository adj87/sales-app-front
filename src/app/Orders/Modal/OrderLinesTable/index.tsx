import React, { useState } from 'react';
import Table from '../../../../components/Table';
import { defaultOrderLineValues, columnsOrderLineTable } from '../../constants';
import Label from '../../../../components/Label';
import { connect } from 'react-redux';
import { operations } from '../../duck';
import { AppStoreInterface } from '../../../../store/AppStoreInterface';
import OrderLineModal from './OrderLineModal';
import { IProduct } from '../../../Products/duck/types/Product';
import { IOrderLine } from '../../duck/types/Order';

interface OrderLinesTableProps {
  products: IProduct[];
  fetchProducts: Function;
  onConfirmOrderLineModal: Function;
  data: IOrderLine[];
}

const OrderLinesTable = ({
  products,
  fetchProducts,
  onConfirmOrderLineModal,
  data,
}: OrderLinesTableProps) => {
  const [orderLineToEdit, setOrderLineToEdit] = useState<IOrderLine | null>(null);
  return (
    <div className="mt-3">
      <Label style={{ position: 'absolute' }}>orders.form.label-orders-lines</Label>
      <Table
        data={data}
        columns={columnsOrderLineTable}
        tableName="orderLines"
        onRowClick={(values: any) => {
          const orderLine: IOrderLine = values.original;
          setOrderLineToEdit(orderLine);
        }}
        onAddButton={() => setOrderLineToEdit(defaultOrderLineValues)}
      />

      {Boolean(orderLineToEdit) && (
        <OrderLineModal
          open={true}
          title="orders.form.products-form.title"
          onCancel={() => setOrderLineToEdit(null)}
          onConfirm={(values: IOrderLine) => {
            setOrderLineToEdit(null);
            onConfirmOrderLineModal(values);
          }}
          size="md"
          products={products}
          fetchProducts={fetchProducts}
          orderLine={orderLineToEdit}
        />
      )}
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
