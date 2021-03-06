import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

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
import Button from '../../../components/Button';
import MoreInfo from './MoreInfo';

const InputWithFV = withFormikValues(Input);
const InputRadioWithFV = withFormikValues(InputRadio);
const InputCheckBoxWithFV = withFormikValues(InputCheckBox);
const SelectComponentWithFV = withFormikValues(SelectComponent);

interface OrdersModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  customers: ICustomer[];
  products: IProduct[];
  order: IOrder;
  fares: any;
}

const OrdersModal = ({ onCancel, customers, order, fares, products }: OrdersModalProps) => {
  const [customerSelected, setCustomer] = useState<any>(null);
  const [fare, setFare] = useState<IFare | null>(null);
  const { values, setFieldValue } = useFormik<IOrder>({
    initialValues: order,
    onSubmit: (values: IOrder) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (fare) {
      const newOrderLines: IOrderLine[] = values.order_lines.map((oLine: IOrderLine) => {
        const match = fare.fare_lines.find(
          (fLine: IFareLine) => fLine.product_id === oLine.product_id,
        );
        if (match) return { ...oLine, price: match.price_1 };
        return { ...oLine };
      });
      setFieldValue('order_lines', newOrderLines);
      const totalNet = sum(newOrderLines, 'price');
      const totalTaxes = totalNet && values.type === 'A' ? totalNet * 0.21 : 0;
      setFieldValue('total_net', roundToTwoDec(totalNet ? totalNet : 0));
      setFieldValue('total_taxes', roundToTwoDec(totalTaxes));
      setFieldValue('total', totalNet ? roundToTwoDec(totalNet + totalTaxes) : 0);
    }
  }, [fare]);

  useEffect(() => {
    const total = calculateTotals(values, fare, products);
  }, [values.type, values.green_point]);

  return (
    <Modal
      onCancel={onCancel}
      onConfirm={() => console.log('hello confirm')}
      size="lg"
      title="orders.form.title"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectComponent
          options={customers}
          labelText="orders.form.label-customer"
          onChange={(customer: ICustomer) => {
            const { address, fiscal_id, zip_code, id, name } = customer;
            setCustomer(customer);
            setFieldValue('address', address);
            setFieldValue('shipping_place', address);
            setFieldValue('customer_id', id);
            setFieldValue('customer_name', name);
            setFieldValue('fiscal_id', fiscal_id);
            setFieldValue('zip_code', zip_code);
          }}
        />

        <InputWithFV
          label="orders.form.label-shipping-place"
          name="shipping_place"
          onChange={setFieldValue}
          formikValues={values}
        />
        <InputWithFV
          label="orders.form.label-delivery-date"
          name="delivery_date"
          onChange={setFieldValue}
          formikValues={values}
          type="date"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/*         <SelectComponent
          labelText="orders.form.label-fare"
          onChange={setFare}
          value={fare}
          optionLabel={(option: IFare) => option.customer_name}
          optionValue={(option: IFare) => option.customer_id.toString()}
          options={fares}
        /> */}
      </div>
      <div className="flex items-end mb-20 justify-between">
        <InputRadioWithFV
          label="orders.form.label-type"
          name="type"
          onChange={async (field: string, value: string) => {
            await setFieldValue(field, value);
          }}
          formikValues={values}
          options={[
            { value: 'A', label: 'A' },
            { value: 'B', label: 'B' },
          ]}
        />
        <InputCheckBoxWithFV
          formikValues={values}
          label={'orders.form.label-surcharge'}
          name="surcharge"
          onChange={setFieldValue}
        />
        <InputCheckBoxWithFV
          formikValues={values}
          label={'orders.form.label-green-point'}
          name="green_point"
          onChange={setFieldValue}
        />
        <InputCheckBoxWithFV
          formikValues={values}
          label={'orders.form.label-together'}
          name="show_together_with_others"
          onChange={setFieldValue}
        />
      </div>
      <div className="w-full pt-2">
        <OrderLinesTable
          data={values.order_lines}
          onConfirmOrderLineModal={(orderLine: IOrderLine) => {
            const { order_lines } = values;
            const orderLineToEdit = order_lines.find(
              (el: IOrderLine) => el.line_number === orderLine.line_number,
            );
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
          <LabelAndAmount
            amount={roundToTwoDec(values.total_taxes)}
            label={'Iva'}
            isDisabled={values.type === 'B'}
          />
          <LabelAndAmount amount={4} label={'P. Verde'} isDisabled={Boolean(!values.green_point)} />
          <LabelAndAmount amount={values.total} label={'Total'} isTotal />
        </div>
      </div>
      <MoreInfo />
    </Modal>
  );
};

const calculateTotals = (values: IOrder, fare: IFare | null, products?: IProduct[]) => {
  if (values && fare && products) {
    return values.order_lines.reduce(
      (acc: any, oL: IOrderLine) => {
        const product = products.find((pr: IProduct) => pr.id === oL.product_id);
        // @ts-ignore
        const total = oL.quantity * product.units_per_box * oL.price;
        acc.total += total;
        if (values.green_point)
          // @ts-ignore
          acc.total_green_point += oL.quantity * product.units_per_box * product.green_point_amount;
        // @ts-ignore
        if (values.type === 'A') acc.total_taxes += total * TAXES_RATE;
        if (Boolean(values.surcharge)) acc.total_recharge += total * RECHARGE_RATE;

        return acc;
      },
      {
        total: 0,
        total_taxes: 0,
        total_green_point: 0,
        total_recharge: 0,
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

export default OrdersModal;
