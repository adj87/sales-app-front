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
import { validationSchemaOrderLine } from '../../constants';
import { IFare, IFareLine } from '../../../Fares/duck/types/Fare';
import SelectComponent from '../../../../components/Select';

const InputWithFormikValues = withFormikValues(Input);
const SelectWithFV = withFormikValues(SelectComponent);

interface OrderLineModalProps extends ModalProps {
  children?: undefined;
  products: IProduct[];
  orderLine: IOrderLine | null;
  onConfirm: any;
  fare: IFare | null;
}

const OrderLineModal = ({ onCancel, onConfirm, products, orderLine, fare }: OrderLineModalProps) => {
  const formik = useFormik<IOrderLine | any>({
    validationSchema: validationSchemaOrderLine,
    initialValues: orderLine,
    onSubmit: onConfirm,
  });
  const { values, setFieldValue, submitForm } = formik;
  // @ts-ignore
  const productsInFare = products.filter((pr: IProduct) => fare?.fare_lines.map((fl: IFareLine) => fl.product_id).includes(pr.id));

  const onChangeProduct = (product: IProduct) => {
    const { name, id } = product;
    setFieldValue('product_id', id);
    setFieldValue('product_name', name);
    setFieldValue('price', fare?.fare_lines.find((el: IFareLine) => el.product_id === id)?.price_1);
  };

  return (
    <Modal title={Boolean(values.line_number) ? 'orders.form.products-form.title-edit' : 'orders.form.products-form.title'} size="xs" centered>
      <InputWithCarrousel onChange={onChangeProduct} data={productsInFare} value={values.product_id} />
      <>
        <div className="flex flex-col w-4/5 m-auto">
          <SelectWithFV
            options={productsInFare}
            onChange={onChangeProduct}
            labelText="orders.form.products-form.label-product"
            formikObject={formik}
            name={'product_id'}
          />
          <InputWithFormikValues
            formikObject={formik}
            label="orders.form.products-form.label-quantity"
            name="quantity"
            type="number"
            onChange={setFieldValue}
          />
          <InputWithFormikValues formikObject={formik} type="number" label="Precio" name="price" onChange={setFieldValue} step="0.01" />
        </div>
        <div className=" flex justify-end flex-col items-end w-4/5 m-auto">
          <LabelAndAmount amount={12} label={'Base'} />
          <LabelAndAmount amount={2.5} label={'Iva'} isDisabled />
          <LabelAndAmount amount={4} label={'P. Verde'} isDisabled />
          <LabelAndAmount amount={17.85} label={'Total'} isTotal />
        </div>
        <div className="flex flex-col mt-10 ">
          <Button text="commons.ok" color="secondary" onClick={submitForm} size="block" className="mb-2" />
          <Button
            text="commons.cancel"
            color="secondary"
            // @ts-ignore
            onClick={onCancel}
            size="block"
            outline
          />
        </div>
      </>
    </Modal>
  );
};

export default OrderLineModal;
