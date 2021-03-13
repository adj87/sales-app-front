import React, { useMemo, useState } from 'react';
import Modal from '../../../../components/Modal/Modal';
import { ModalProps } from '../../../../components/Modal/Modal';
import InputWithCarrousel from '../../../../components/InputWithCarrousel';
import Input from '../../../../components/Inputs/InputText';
import { IProduct } from '../../../Products/duck/types/Product';
import { IOrderLine, IOrder } from '../../duck/types/Order';
import { useFormik } from 'formik';
import LabelAndAmount from '../../../../components/LabelAndAmount';
import withFormikValues from '../../../../components/Inputs/withFormikValues';
import { validationSchemaOrderLine } from '../../constants';
import { IFare, IFareLine } from '../../../Fares/duck/types/Fare';
import SelectComponent from '../../../../components/Select';
import { TAXES_RATE, RECHARGE_RATE } from '../../../../constants';
import { roundToTwoDec, isDefaultFare } from '../../../../utils';
import { useTranslation } from 'react-i18next';
import LabelError from '../../../../components/LabelError';
import Button from '../../../../components/Button';
import { LogisticSheet } from '../../../../components/LogisticSheet';

const InputWithFormikValues = withFormikValues(Input);
const SelectWithFV = withFormikValues(SelectComponent);
const backEnd = process.env.REACT_APP_BACK;

interface OrderLineModalProps extends ModalProps {
  children?: undefined;
  products: IProduct[];
  orderLine: IOrderLine | null;
  onConfirm: any;
  fare: IFare | null;
  isGreenPoint: boolean;
  isSurcharge: boolean;
  isTypeA: boolean;
  fetchProductCost: Function;
}

const OrderLineModal = ({
  onCancel,
  onConfirm,
  products,
  orderLine,
  fare,
  isTypeA,
  isGreenPoint,
  isSurcharge,
  fetchProductCost,
}: OrderLineModalProps) => {
  const formik = useFormik<IOrderLine | any>({
    validationSchema: validationSchemaOrderLine,
    initialValues: orderLine,
    onSubmit: onConfirm,
  });

  const { values, setFieldValue, submitForm, setValues, errors } = formik;
  // @ts-ignore
  const productsInFare = useMemo(() => products.filter((pr: IProduct) => fare?.fare_lines.map((fl: IFareLine) => fl.product_id).includes(pr.id)), [
    products,
  ]);

  const fareLineSelected = useMemo(() => fare?.fare_lines.find((el: IFareLine) => el.product_id === values.product_id), [values.product_id]);

  const productSelected = useMemo(() => products.find((el: IProduct) => el.id === values.product_id) ?? null, [values.product_id]);
  const [productInLS, setProductInLS] = useState<null | IProduct>(null);

  const onChangeProduct = (product: IProduct) => {
    const { name: product_name, id: product_id, units_per_box, green_point_amount, capacity, cost } = product;
    const price = fare?.fare_lines.find((el: IFareLine) => el.product_id === product_id)?.price_1 ?? 0;
    if (backEnd === 'PHP') {
      fetchProductCost(product.id, (cost: number) => {
        setValues({ ...values, product_name, product_id, price, units_per_box, green_point_amount, capacity, cost });
      });
    } else {
      setValues({ ...values, product_name, product_id, price, units_per_box, green_point_amount, capacity, cost });
    }
  };

  const calculateAmounts = (values: IOrderLine, isGreenPoint: boolean, isSurcharge: boolean, isTypeA: boolean, products: IProduct[]) => {
    // @ts-ignore
    let net = 0,
      tax = 0,
      surcharge = 0,
      total = 0,
      greenPoint = 0;
    if (values.product_id) {
      const { price = 0, quantity = 0, green_point_amount = 0, units_per_box = 0 } = values;
      const isPerformable = Boolean(price) && Boolean(quantity);
      // @ts-ignore
      const amountOfBottles = isPerformable ? quantity * units_per_box : 0;
      // @ts-ignore
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
    <>
      <Modal
        title={Boolean(values.line_number) ? 'orders.form.products-form.title-edit' : 'orders.form.products-form.title'}
        size="lg"
        centered
        onConfirm={submitForm}
        onCancel={onCancel}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
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
            {errors.cost && <LabelError error={`Cost ${errors.cost}`} />}
            <div className=" flex justify-end flex-col items-end w-4/5 m-auto">
              <LabelAndAmount amount={roundToTwoDec(net)} label={'Base'} />
              <LabelAndAmount amount={roundToTwoDec(tax)} label={'Iva'} isDisabled={!isTypeA} />
              <LabelAndAmount amount={roundToTwoDec(greenPoint)} label={'P. Verde'} isDisabled={!isGreenPoint} />
              <LabelAndAmount amount={roundToTwoDec(surcharge)} label={'Recargo'} isDisabled={!isSurcharge} />
              <LabelAndAmount amount={roundToTwoDec(total)} label={'Total'} isTotal />
            </div>
          </div>
          <div className="w-4/5 m-auto">
            <InputWithCarrousel onChange={onChangeProduct} data={productsInFare} value={values.product_id} />

            {values.product_id && (
              <div className="pt-5 px-5">
                <Button text={'FL'} onClick={() => setProductInLS(productSelected)} color="primary" size="block" className="py-0" outline />
                {isDefaultFare(fare) && (
                  <Element
                    /* 
                // @ts-ignore */
                    value={`${fareLineSelected?.to_charge} + ${fareLineSelected?.to_sell - fareLineSelected?.to_charge}`}
                    label="commons.promo"
                  />
                )}
                <Element value={fareLineSelected?.price_1} label="commons.price-1" />
                <Element value={values.capacity} label="commons.capacity" />
                <Element value={values.units_per_box} label="commons.units-per-box" />
                <Element value={values.green_point_amount} label="commons.green-point" />
                {/*    <p className="text-secondary-dark text-right my-4">{`${t('commons.capacity')} ${productSelected.capacity}`}</p> */}
              </div>
            )}
          </div>
        </div>
      </Modal>
      {productInLS && <LogisticSheet product={productInLS} onClose={() => setProductInLS(null)} onAdd={() => setProductInLS(null)} />}
    </>
  );
};

const Element = (props: { label: string; value: string | number | undefined | null }) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between my-2">
      <span className="text-primary-main">{t(props.label)}</span>
      <span className="text-grey-400">{props.value}</span>
    </div>
  );
};

export default OrderLineModal;
