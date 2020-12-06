import React from 'react';
import Table from '../../../components/Table';
import { columns } from '../constants';
import Label from '../../../components/Label';
import Modal from '../../../components/Modal';

const OrderLinesTable = () => {
  return (
    <>
      <Label>orders.form.label-orders-lines</Label>
      <Table
        data={[]}
        columns={columns}
        tableName="orderLines"
        onAddButton={(event: React.MouseEvent<HTMLButtonElement>) => console.log(event)}
      />
      <Modal
        onCancel={() => console.log('hola')}
        onConfirm={() => console.log('hola')}
        open={false}
        title="Hola"
        size="md"
      >
        {<div>Hola</div>}
      </Modal>
    </>
  );
};

export default OrderLinesTable;
