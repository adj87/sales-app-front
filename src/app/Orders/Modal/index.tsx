import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

const dateFormat = process.env.REACT_APP_FORMAT_DATE;

import Modal from '../../../components/Modal/Modal';
import { roundToTwoDec } from '../../../utils';
import SelectComponent from '../../../components/Select';
import { ICustomer } from '../../Customers/duck/types/Customer';
import Input from '../../../components/Inputs/InputText';
import InputCheckBox from '../../../components/Inputs/InputCheckbox';
import InputRadio from '../../../components/Inputs/InputRadio';
import OrderLinesTable from './OrderLinesTable';
import { IOrder, IOrderLine } from '../duck/types/Order';
import LabelAndAmount from '../../../components/LabelAndAmount';
import withFormikValues from '../../../components/Inputs/withFormikValues';
import { IFare, IFareLine } from '../../Fares/duck/types/Fare';
import { IProduct } from '../../Products/duck/types/Product';
import MoreInfo from './MoreInfo';
import { operations } from '../duck';
import { AppStoreInterface } from '../../../store/AppStoreInterface';
import useDidUpdateEffect from '../../../hooks/useDidUpdateEffect';
import { validationSchemaOrder, calculateTotals } from '../constants';
import LabelError from '../../../components/LabelError';

const InputWithFV = withFormikValues(Input);
const InputRadioWithFV = withFormikValues(InputRadio);
const InputCheckBoxWithFV = withFormikValues(InputCheckBox);
const SelectComponentWithFV = withFormikValues(SelectComponent);

interface OrdersModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  customers: ICustomer[];
  products: IProduct[];
  order: IOrder;
  fare: IFare;
  createFare: Function;
  fetchFare: Function;
  createOrder: Function;
  editOrder: Function;
}

const OrdersModal = ({ onCancel, customers, order, products, createFare, fetchFare, fare, createOrder, editOrder }: OrdersModalProps) => {
  const [totalGreenPoint, setTotalGreenPoint] = useState<number>(0);
  const formik = useFormik<IOrder>({
    initialValues: order,
    onSubmit: (order: IOrder) => {
      if (!order.id) return createOrder(order);
      return editOrder(order);
    },

    validationSchema: validationSchemaOrder,
  });
  const { values, setFieldValue, setValues, errors, submitForm, submitCount } = formik;

  useEffect(() => {
    if (values.id) {
      const { total_green_point } = calculateTotals(values, products);
      setTotalGreenPoint(total_green_point);
    }
  }, []);

  useDidUpdateEffect(() => {
    setPricesToNewFareAndSetTotals(values, setValues, fare, products);
  }, [fare?.customer_id]);

  useDidUpdateEffect(() => {
    const { total, total_net, total_taxes, total_surcharge, total_green_point } = calculateTotals(values, products);
    setTotalGreenPoint(total_green_point);
    setValues({ ...values, total_net, total, total_taxes, total_surcharge });
  }, [values?.type, values.is_surcharge, values.is_green_point]);

  return (
    <Modal onCancel={onCancel} onConfirm={submitForm} size="lg" title={`${values.id ? 'orders.form.title-edit' : 'orders.form.title'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectComponentWithFV
          name="customer_id"
          formikObject={formik}
          options={customers}
          labelText="orders.form.label-customer"
          onChange={(input_name: string, customer: ICustomer) => {
            const { address, fiscal_id, zip_code, id: customer_id, name: customer_name, is_surcharge, is_green_point } = customer;
            setValues({ ...values, address, fiscal_id, shipping_place: address, customer_id, customer_name, zip_code, is_surcharge, is_green_point });
            fetchFare(customer_id);
          }}
        />

        <InputWithFV label="orders.form.label-shipping-place" name="shipping_place" onChange={setFieldValue} formikObject={formik} />
        <div>
          <InputWithFV label="orders.form.label-delivery-date" name="delivery_date" onChange={setFieldValue} formikObject={formik} type="date" />
          <DeliveryDaysRemaining date={values.delivery_date ?? undefined} />
        </div>
      </div>
      <div className="flex items-end mb-5 justify-between">
        <InputRadioWithFV
          label="orders.form.label-type"
          name="type"
          onChange={(field: string, value: string) => {
            const is_surcharge = value === 'B' ? false : values.is_surcharge;
            const newValues = { ...values, [field]: value, is_surcharge };
            setValues(newValues);
          }}
          formikObject={formik}
          options={[
            { value: 'A', label: 'A' },
            { value: 'B', label: 'B' },
          ]}
        />
        <InputCheckBoxWithFV formikObject={formik} label={'orders.form.label-surcharge'} name="is_surcharge" onChange={setFieldValue} />
        <InputCheckBoxWithFV formikObject={formik} label={'orders.form.label-green-point'} name="is_green_point" onChange={setFieldValue} />
        <InputCheckBoxWithFV formikObject={formik} label={'orders.form.label-together'} name="show_together_with_others" onChange={setFieldValue} />
      </div>
      <div className="w-full pt-2">
        <OrderLinesTable
          values={values}
          onConfirmOrderLineModal={(orderLine: IOrderLine) => {
            const { order_lines } = values;
            const orderLineToEdit = order_lines.find((el: IOrderLine) => el.line_number === orderLine.line_number);
            let newOrderLines = [...order_lines];
            //EDITING
            if (orderLineToEdit) {
              newOrderLines = order_lines.map((el: IOrderLine) => {
                if (el.line_number === orderLine.line_number) return orderLine;
                return el;
              });

              //CREATING
            } else {
              newOrderLines.push({
                ...orderLine,
                line_number: newOrderLines.length + 1,
                order_id: values.id,
                order_type: values.type,
              });
            }
            let newValues = { ...values, order_lines: newOrderLines };
            const { total, total_net, total_taxes, total_surcharge, total_green_point } = calculateTotals(newValues, products);
            newValues = { ...newValues, total, total_net, total_taxes, total_surcharge };
            setValues(newValues);
            setTotalGreenPoint(total_green_point);
          }}
          deleteOnRowPress={(row: any) => {
            const rowToDelete: IOrderLine = row.original;
            const newOrderLines = [...values.order_lines].filter((el: IOrderLine) => el.line_number !== rowToDelete.line_number);
            let newValues = { ...values, order_lines: newOrderLines };
            const { total, total_net, total_taxes, total_surcharge, total_green_point } = calculateTotals(newValues, products);
            newValues = { ...newValues, total, total_net, total_taxes, total_surcharge };
            setValues(newValues);
            setTotalGreenPoint(total_green_point);
          }}
        />
        <LabelError error={submitCount > 0 && errors.order_lines} className="text-center" />
      </div>
      {values.order_lines.length > 0 && (
        <div className="flex justify-end mt-20">
          <div className="w-2/6 flex flex-col mt-6">
            <LabelAndAmount amount={roundToTwoDec(values.total_net)} label={'Base'} />
            <LabelAndAmount amount={roundToTwoDec(values.total_taxes)} label={'Iva'} isDisabled={values.type === 'B'} />
            <LabelAndAmount amount={roundToTwoDec(values.total_surcharge)} label={'Recargo'} isDisabled={!values.is_surcharge} />
            <LabelAndAmount amount={roundToTwoDec(totalGreenPoint)} label={'P. Verde'} isDisabled={!values.is_green_point} />
            <LabelAndAmount amount={roundToTwoDec(values.total)} label={'Total'} isTotal />
          </div>
        </div>
      )}
      <MoreInfo
        // @ts-ignore
        customerId={values.customer_id}
        onFareModalConfirm={(fare: IFare) => {
          createFare(fare, (newFare: IFare) => setPricesToNewFareAndSetTotals(values, setValues, newFare, products));
        }}
      />
    </Modal>
  );
};

const setPricesToNewFareAndSetTotals = (values: IOrder, setValues: any, fare: IFare, products: IProduct[]) => {
  const getPriceFromFare = (ol: IOrderLine, fare: IFare) => fare.fare_lines.find((fl: IFareLine) => fl.product_id === ol.product_id)?.price_1 || 0;

  const newOrderLines = values.order_lines.map((ol: IOrderLine) => {
    const price = getPriceFromFare(ol, fare);
    const green_point_amount = values.is_green_point ? products.find((pr: IProduct) => pr.id === ol.product_id)?.green_point_amount ?? 0 : 0;
    return {
      ...ol,
      price,
      green_point_amount,
    };
  });

  let newValues = { ...values, order_lines: newOrderLines };

  const { total, total_net, total_taxes, total_surcharge } = calculateTotals(newValues, products);

  newValues = { ...newValues, total_net, total, total_taxes, total_surcharge };
  setValues(newValues);
};

const DeliveryDaysRemaining = ({ date }: { date: string | undefined }) => {
  const today = dayjs();
  const naturalDays = today.to(dayjs(date, dateFormat));

  return (
    <div className="-mt-3">
      <p className="text-primary-light text-right">{naturalDays}</p>
    </div>
  );
};

const mapState = (state: AppStoreInterface) => ({
  customers: state.customers.data,
  products: state.products.data,
  orders: state.orders.data,
  fare: state.orders.fare,
});

const mapDispatch = {
  ...operations,
};

//@ts-ignore
export default connect(mapState, mapDispatch)(OrdersModal);
