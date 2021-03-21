import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Modal from '../../../components/Modal/Modal';
import SelectComponent from '../../../components/Select';
import { ICustomer } from '../../Customers/duck/types/Customer';

import Input from '../../../components/Inputs/InputText';
import InputCheckBox from '../../../components/Inputs/InputCheckbox';
import OrderLinesTable from './OrderLinesTable';

interface ProductModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProductModal = ({ onCancel }: ProductModalProps) => {
  const values = { id: 'as' };
  return (
    <Modal
      onCancel={onCancel}
      onConfirm={() => console.log('object')}
      size="lg"
      title={`${values.id ? 'products.form.title-edit' : 'products.form.title'}`}
    >
      <div>Hallooo</div>
    </Modal>
  );
};

export default ProductModal;
