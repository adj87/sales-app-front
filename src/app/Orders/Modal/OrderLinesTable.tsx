import React, { useState } from 'react';
import Table from '../../../components/Table';
import { columns } from '../constants';
import Label from '../../../components/Label';
import Modal from '../../../components/Modal';
import InputWithCarrousel from '../../../components/InputWithCarrousel';

const OrderLinesTable = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Label>orders.form.label-orders-lines</Label>
      <Table
        data={[]}
        columns={columns}
        tableName="orderLines"
        onRowClick={() => setOpenModal(true)}
        onAddButton={() => setOpenModal(true)}
      />
      <Modal
        onCancel={() => setOpenModal(false)}
        onConfirm={() => console.log('hola')}
        open={openModal}
        title="Hola"
        size="md"
      >
        <InputWithCarrousel />
      </Modal>
    </>
  );
};

export default OrderLinesTable;
