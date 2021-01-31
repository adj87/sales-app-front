import React, { useEffect } from 'react';
import Modal from '../../../../components/Modal/Modal';
import { ModalProps } from '../../../../components/Modal/Modal';
import InputWithCarrousel from '../../../../components/InputWithCarrousel';
import Input from '../../../../components/Inputs/InputText';
import { IProduct } from '../../../Products/duck/types/Product';
import { IOrderLine, IOrder } from '../../duck/types/Order';
import { useFormik } from 'formik';
import LabelAndAmount from '../../../../components/LabelAndAmount';
import withFormikValues from '../../../../components/Inputs/withFormikValues';
import Button from '../../../../components/Button';
import { validationSchemaOrderLine } from '../../constants';
import { IFare, IFareLine } from '../../../Fares/duck/types/Fare';
import SelectComponent from '../../../../components/Select';
import { TAXES_RATE, RECHARGE_RATE } from '../../../../constants';
import { roundToTwoDec } from '../../../../utils';

const InputWithFormikValues = withFormikValues(Input);
const SelectWithFV = withFormikValues(SelectComponent);

interface OrderLineModalProps extends ModalProps {
  children?: undefined;
  products: IProduct[];
  orderLine: IOrderLine | null;
  onConfirm: any;
  fare: IFare | null;
  isGreenPoint: boolean;
  isSurcharge: boolean;
  isTypeA: boolean;
}

const OrderLineModal = ({ onCancel, onConfirm, products, orderLine, fare, isTypeA, isGreenPoint, isSurcharge }: OrderLineModalProps) => {
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

  const calculateAmounts = (values: IOrderLine, isGreenPoint: boolean, isSurcharge: boolean, isTypeA: boolean, products: IProduct[]) => {
    const productSelected = products.find((el: IProduct) => el.id === values.product_id);
    // @ts-ignore
    let net = 0,
      tax = 0,
      surcharge = 0,
      total = 0,
      greenPoint = 0;
    if (productSelected) {
      const { green_point_amount = 0, units_per_box = 0 } = productSelected;
      const { price = 0, quantity = 0 } = values;
      const isPerformable = Boolean(price) && Boolean(quantity);
      // @ts-ignore
      const amountOfBottles = isPerformable ? quantity * units_per_box : 0;
      greenPoint = isGreenPoint ? amountOfBottles * green_point_amount : 0;
      // @ts-ignore
      net = amountOfBottles * price + greenPoint;

      tax = isTypeA ? net * TAXES_RATE : 0;

      surcharge = isSurcharge ? net * RECHARGE_RATE : 0;

      total = net + tax + surcharge;
    }

    return { net, greenPoint, tax, surcharge, total };
  };

  const { net, greenPoint, tax, surcharge, total } = calculateAmounts(values, isGreenPoint, isSurcharge, isTypeA, products);

  return (
    <Modal title={Boolean(values.line_number) ? 'orders.form.products-form.title-edit' : 'orders.form.products-form.title'} size="xs" centered>
      <InputWithCarrousel onChange={onChangeProduct} data={productsInFare} value={values.product_id} />
      <>
        <div className="flex flex-col w-4/5 m-auto">
          <SelectWithFV
            options={productsInFare}
            onChange={(name: string, product: IProduct) => onChangeProduct(product)}
            labelText="orders.form.products-form.label-product"
            formikObject={formik}
            name={'product_id'}
          />
          <InputWithFormikValues formikObject={formik} type="number" label="Precio" name="price" onChange={setFieldValue} step="0.01" />
          <InputWithFormikValues
            formikObject={formik}
            label="orders.form.products-form.label-quantity"
            name="quantity"
            type="number"
            onChange={setFieldValue}
          />
        </div>
        <div className=" flex justify-end flex-col items-end w-4/5 m-auto">
          <LabelAndAmount amount={roundToTwoDec(net)} label={'Base'} />
          <LabelAndAmount amount={roundToTwoDec(tax)} label={'Iva'} isDisabled={!isTypeA} />
          <LabelAndAmount amount={roundToTwoDec(greenPoint)} label={'P. Verde'} isDisabled={!isGreenPoint} />
          <LabelAndAmount amount={roundToTwoDec(surcharge)} label={'Recargo'} isDisabled={!isSurcharge} />
          <LabelAndAmount amount={roundToTwoDec(total)} label={'Total'} isTotal />
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
