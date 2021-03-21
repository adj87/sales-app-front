import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Modal from '../../../components/Modal/Modal';
import SelectComponent from '../../../components/Select';
import { ICustomer } from '../../Customers/duck/types/Customer';

import Input from '../../../components/Inputs/InputText';
import InputCheckBox from '../../../components/Inputs/InputCheckbox';
import OrderLinesTable from './OrderLinesTable';
import { IProduct } from '../duck/types/Product';
import { useFormik } from 'formik';

interface ProductModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  product: IProduct;
  editProduct: Function;
}

const ProductModal = ({ onCancel, product, editProduct }: ProductModalProps) => {
  const formik = useFormik<IProduct>({
    initialValues: product,
    onSubmit: (ord: IProduct) => {
      editProduct(ord);

      // @ts-ignore
      return onCancel();
    },
    //validationSchema: validationSchemaOrder,
  });
  return (
    <Modal onCancel={onCancel} onConfirm={() => console.log('object')} size="lg" title={'products.form.title-edit'}>
      <div>Hallooo</div>
    </Modal>
  );
};

export default ProductModal;
