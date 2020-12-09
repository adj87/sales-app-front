import React, { useEffect } from 'react';
import Modal from '../../../../components/Modal';
import { ModalProps } from '../../../../components/Modal';
import InputWithCarrousel from '../../../../components/InputWithCarrousel';
import Input from '../../../../components/Input';
import { IProduct } from '../../../Products/duck/types/Product';
import { IOrderLine } from '../../duck/types/Order';
import { useFormik } from 'formik';

interface OrderLineModalProps extends ModalProps {
  children?: undefined;
  products: IProduct[];
  fetchProducts: Function;
  orderLine: IOrderLine | null;
  onConfirm: any;
}

const OrderLineModal = ({
  onCancel,
  onConfirm,
  open,
  title,
  products,
  fetchProducts,
  orderLine,
}: OrderLineModalProps) => {
  useEffect(() => {
    fetchProducts();
  }, []);
  const { values, setFieldValue, submitForm } = useFormik<IOrderLine | any>({
    initialValues: orderLine,
    onSubmit: onConfirm,
  });

  console.log('the new values', values);
  return (
    <Modal onCancel={onCancel} onConfirm={submitForm} open={open} title={title} size="md">
      <InputWithCarrousel label="orders.form.products-form.label-product" data={products} />
      <div className="grid grid-cols-3 gap-4 mt-2">
        <Input
          value={values}
          label="orders.form.products-form.label-quantity"
          name="quantity"
          type="number"
          onChange={setFieldValue}
        />
        <Input
          value={values}
          type="number"
          label="Precio"
          name="price"
          onChange={setFieldValue}
          step="0.01"
        />
        <Input
          value={values}
          label="orders.form.products-form.label-promotion"
          name="promotion"
          type="number"
          onChange={setFieldValue}
        />
      </div>
    </Modal>
  );
};

export default OrderLineModal;
