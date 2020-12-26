import React, { useEffect } from 'react';
import Modal from '../../../../components/Modal/Modal';
import { ModalProps } from '../../../../components/Modal/Modal';
import InputWithCarrousel from '../../../../components/InputWithCarrousel';
import Input from '../../../../components/Inputs/InputText';
import { IProduct } from '../../../Products/duck/types/Product';
import { IOrderLine } from '../../duck/types/Order';
import { useFormik } from 'formik';
import LabelAndAmount from '../../../../components/LabelAndAmount';
import withFormikValues from '../../../../components/Inputs/withFormikValues';
import Button from '../../../../components/Button';

const InputWithFormikValues = withFormikValues(Input);

interface OrderLineModalProps extends ModalProps {
  children?: undefined;
  products: IProduct[];
  orderLine: IOrderLine | null;
  onConfirm: any;
}

const OrderLineModal = ({
  onCancel,
  onConfirm,
  title,
  products,
  orderLine,
}: OrderLineModalProps) => {
  const { values, setFieldValue, submitForm } = useFormik<IOrderLine | any>({
    initialValues: orderLine,
    onSubmit: onConfirm,
  });

  return (
    <Modal onCancel={onCancel} onConfirm={submitForm} title={title} size="xs" centered>
      <InputWithCarrousel
        label="orders.form.products-form.label-product"
        data={products}
        onChange={(product: IProduct) => {
          const { name, id } = product;
          setFieldValue('product_id', id);
          setFieldValue('product_name', name);
        }}
        value={{ id: values.product_id, name: values.product_name }}
      />
      {values.product_id && (
        <>
          <div className="flex flex-col w-4/5 m-auto">
            <InputWithFormikValues
              formikValues={values}
              label="orders.form.products-form.label-quantity"
              name="quantity"
              type="number"
              onChange={setFieldValue}
            />
            <InputWithFormikValues
              formikValues={values}
              type="number"
              label="Precio"
              name="price"
              onChange={setFieldValue}
              step="0.01"
            />
          </div>
          <div className=" flex justify-end flex-col items-end w-4/5 m-auto">
            <LabelAndAmount amount={12} label={'Base'} />
            <LabelAndAmount amount={2.5} label={'Iva'} isDisabled />
            <LabelAndAmount amount={4} label={'P. Verde'} isDisabled />
            <LabelAndAmount amount={17.85} label={'Total'} isTotal />
          </div>
          <div className="flex flex-col mt-10 ">
            <Button
              text="commons.ok"
              color="secondary"
              onClick={submitForm}
              size="block"
              className="mb-2"
            />
            <Button
              text="commons.cancel"
              color="secondary"
              onClick={onCancel}
              size="block"
              outline
            />
          </div>
        </>
      )}
    </Modal>
  );
};

export default OrderLineModal;
