import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';

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
import { TAXES_RATE, RECHARGE_RATE } from '../../../constants';
import MoreInfo from './MoreInfo';
import { operations } from '../duck';
import { AppStoreInterface } from '../../../store/AppStoreInterface';
import useDidUpdateEffect from '../../../hooks/useDidUpdateEffect';

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
}

const OrdersModal = ({ onCancel, customers, order, products, createFare, fetchFare, fare }: OrdersModalProps) => {
  const [totalGreenPoint, setTotalGreenPoint] = useState<number>(0);
  const formik = useFormik<IOrder>({
    initialValues: order,
    onSubmit: (values: IOrder) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const { values, setFieldValue, setValues } = formik;

  useEffect(() => {
    if (values.id) {
      const { total_green_point } = calculateTotals(values, products);
      setTotalGreenPoint(total_green_point);
    }
  }, [values.is_green_point]);

  useDidUpdateEffect(() => {
    setPricesToNewFareAndSetTotals(values, setValues, fare, products);
  }, [fare?.customer_id]);

  useDidUpdateEffect(() => {
    const { total, total_net, total_taxes, total_surcharge, total_green_point } = calculateTotals(values, products);
    setTotalGreenPoint(total_green_point);
    setValues({ ...values, total_net, total, total_taxes, total_surcharge });
  }, [values?.type, values.is_surcharge, values.is_green_point]);

  console.log('los values', values);
  return (
    <Modal onCancel={onCancel} onConfirm={() => console.log('hello confirm')} size="lg" title="orders.form.title">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectComponentWithFV
          name="customer_id"
          formikObject={formik}
          options={customers}
          labelText="orders.form.label-customer"
          onChange={(input_name: string, customer: ICustomer) => {
            const { address, fiscal_id, zip_code, id, name } = customer;
            setFieldValue('address', address);
            setFieldValue('shipping_place', address);
            setFieldValue('customer_id', id);
            setFieldValue('customer_name', name);
            setFieldValue('fiscal_id', fiscal_id);
            setFieldValue('zip_code', zip_code);
            fetchFare(id);
          }}
        />

        <InputWithFV label="orders.form.label-shipping-place" name="shipping_place" onChange={setFieldValue} formikObject={formik} />
        <InputWithFV label="orders.form.label-delivery-date" name="delivery_date" onChange={setFieldValue} formikObject={formik} type="date" />
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
          data={values.order_lines}
          onConfirmOrderLineModal={(orderLine: IOrderLine) => {
            const { order_lines } = values;
            const orderLineToEdit = order_lines.find((el: IOrderLine) => el.line_number === orderLine.line_number);
            let newOrderLinesValues = [...order_lines];
            //EDITING
            if (orderLineToEdit) {
              newOrderLinesValues = order_lines.map((el: IOrderLine) => {
                if (el.line_number === orderLine.line_number) return orderLine;
                return el;
              });

              //CREATING
            } else {
              newOrderLinesValues.push({
                ...orderLine,
                line_number: newOrderLinesValues.length + 1,
                order_id: values.id,
                order_type: values.type,
              });
            }
            const totalNet = sum(newOrderLinesValues, 'price');
            const totalTaxes = totalNet ? totalNet * 0.21 : 0;
            setFieldValue('total_net', totalNet);
            setFieldValue('total_taxes', totalTaxes);
            setFieldValue('total', totalNet ?? 0 + totalTaxes);
            setFieldValue('order_lines', newOrderLinesValues);
          }}
        />
      </div>
      <div className="flex justify-end mt-5">
        <div className="w-2/6 flex flex-col mt-6">
          <LabelAndAmount amount={roundToTwoDec(values.total_net)} label={'Base'} />
          <LabelAndAmount amount={roundToTwoDec(values.total_taxes)} label={'Iva'} isDisabled={values.type === 'B'} />
          <LabelAndAmount amount={roundToTwoDec(values.total_surcharge)} label={'Recargo'} isDisabled={!values.is_surcharge} />
          <LabelAndAmount amount={roundToTwoDec(totalGreenPoint)} label={'P. Verde'} isDisabled={!values.is_green_point} />
          <LabelAndAmount amount={roundToTwoDec(values.total)} label={'Total'} isTotal />
        </div>
      </div>

      <MoreInfo
        // @ts-ignore
        customerId={values.customer_id}
        onFareModalConfirm={(fare: IFare) => {
          createFare(fare, (res: any) => console.log('hello', res));
        }}
      />
    </Modal>
  );
};

const calculateTotals = (values: IOrder, products: IProduct[]) => {
  if (values && products) {
    return values.order_lines.reduce(
      (acc: any, oL: IOrderLine) => {
        const product = products.find((pr: IProduct) => pr.id === oL.product_id);
        // @ts-ignore
        const amountOfBottles = oL.quantity * product.units_per_box;

        // @ts-ignore
        const green_point = values.is_green_point ? amountOfBottles * product.green_point_amount * oL.price : 0;
        acc.total_green_point += green_point;

        // @ts-ignore
        const net = amountOfBottles * oL.price + green_point;
        acc.total_net += net;

        const taxes = values.type === 'A' ? net * TAXES_RATE : 0;
        acc.total_taxes += taxes;

        const surcharge = values.is_surcharge ? net * RECHARGE_RATE : 0;
        acc.total_surcharge += surcharge;

        acc.total += net + taxes + surcharge;

        return acc;
      },
      {
        total_net: 0,
        total_green_point: 0,
        total_taxes: 0,
        total: 0,
        total_surcharge: 0,
      },
    );
  }
  return null;
};

const sum = (orderLines: IOrderLine[], type: string) => {
  if (orderLines) {
    return orderLines.reduce((acc: number, el: IOrderLine) => {
      // @ts-ignore
      if (el[type] && el.quantity && el.units_per_box) {
        // @ts-ignore
        acc += el[type] * el.quantity * el.units_per_box;
      }
      return acc;
    }, 0);
  }
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

/* const CustomerInfo = ({ customer }: { customer: ICustomer }) => {
  const infoElementsExcluded = ['created_at', 'updated_at', 'id', 'zip_code', 'name'];
  return (
    <div className="border-grey-300 rounded-md border px-2 py-5 flex flex-wrap">
      {Object.keys(customer)
        .filter((el) => !infoElementsExcluded.includes(el))
        .map((property: string) => {
          return (
            <div className="flex-2 flex justify-between w-1/2 p-1">
              <label className="text-primary-light text-sm">{property}</label>

              <label
                className="text-grey-300 pl-1 text-sm"
                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >

                {customer[property]}
              </label>
            </div>
          );
        })}
    </div>
  );
}; */
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
