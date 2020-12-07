import React, { useState } from 'react';
import Table from '../../../components/Table';
import { columns } from '../constants';
import Label from '../../../components/Label';
import Modal from '../../../components/Modal';
import InputWithCarrousel from '../../../components/InputWithCarrousel';
import { useTranslation } from 'react-i18next';
import Input from '../../../components/Input';

const OrderLinesTable = () => {
  const { t } = useTranslation();
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
        title={t('orders.form.products-form.title')}
        size="md"
      >
        {/*  <InputWithCarrousel label="orders.form.products-form.label-product" /> */}
        <div className="grid grid-cols-3 gap-4 mt-2">
          <Input
            value="asd"
            label="orders.form.products-form.label-quantity"
            name="quantity"
            onChange={() => console.log('hola')}
          />
          <Input
            value="asd"
            label="orders.form.products-form.label-promotion"
            name="promotion"
            onChange={() => console.log('hola')}
          />
          <Input value="asd" label="Precio" name="price" onChange={() => console.log('hola')} />
        </div>
      </Modal>
    </>
  );
};

export default OrderLinesTable;
