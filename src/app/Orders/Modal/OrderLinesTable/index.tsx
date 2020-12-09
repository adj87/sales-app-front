import React, { useState } from 'react';
import Table from '../../../../components/Table';
import { columns, defaultOrderLineValues } from '../../constants';
import Label from '../../../../components/Label';
import { useTranslation } from 'react-i18next';
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
}

const OrderLinesTable = ({
  products,
  fetchProducts,
  onConfirmOrderLineModal,
}: OrderLinesTableProps) => {
  const { t } = useTranslation();
  const [orderLineToEdit, setOrderLineToEdit] = useState<IOrderLine | null>(null);
  return (
    <div className="mt-3">
      <Label style={{ position: 'absolute' }}>orders.form.label-orders-lines</Label>
      <Table
        data={[]}
        columns={columns}
        tableName="orderLines"
        onRowClick={(orderLine: IOrderLine) => setOrderLineToEdit(orderLine)}
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
