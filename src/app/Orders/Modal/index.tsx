import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import Modal from '../../../components/Modal';
import SelectComponent from '../../../components/Select';
import { ICustomer } from '../../Customers/duck/types/Customer';
import Input from '../../../components/Inputs/InputText';
import InputCheckBox from '../../../components/Inputs/InputCheckbox';
import InputRadio from '../../../components/Inputs/InputRadio';
import OrderLinesTable from './OrderLinesTable';
import { IOrder, IOrderLine } from '../duck/types/Order';
import LabelAndAmount from '../../../components/LabelAndAmount';
import withFormikValues from '../../../components/Inputs/withFormikValues';

const InputWithFV = withFormikValues(Input);
const InputRadioWithFV = withFormikValues(InputRadio);
const InputCheckBoxWithFV = withFormikValues(InputCheckBox);

interface OrdersModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  customers: ICustomer[];
  order: IOrder;
  fares: any;
}

const OrdersModal = ({ onCancel, customers, order, fares }: OrdersModalProps) => {
  const [customerSelected, setCustomer] = useState<any>(null);
  const { values, setFieldValue } = useFormik<IOrder>({
    initialValues: order,
    onSubmit: (values: IOrder) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  console.log(values);

  return (
    <Modal
      open={true}
      onCancel={onCancel}
      onConfirm={() => console.log('hello confirm')}
      size="lg"
      title="orders.form.title"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
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
        </div>

        {customerSelected && <CustomerInfo customer={customerSelected} />}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectComponent
          labelText="orders.form.label-fare"
          onChange={setFieldValue}
          value={values}
          options={fares}
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
      <div className="flex items-end mb-5 mt-5 justify-between">
        <InputRadioWithFV
          label="orders.form.label-type"
          name="type"
          onChange={setFieldValue}
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
              });
            }
            setFieldValue('order_lines', newOrderLinesValues);
          }}
        />
      </div>
      <div className="m-auto w-1/2 flex justify-center flex-col items-center mt-6">
        <LabelAndAmount amount={12} label={'Base'} />
        <LabelAndAmount amount={2.5} label={'Iva'} isDisabled />
        <LabelAndAmount amount={4} label={'P. Verde'} isDisabled />
        <LabelAndAmount amount={17.85} label={'Total'} isTotal />
      </div>
    </Modal>
  );
};

const CustomerInfo = ({ customer }: { customer: ICustomer }) => {
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
                {/* 
  // @ts-ignore */}
                {customer[property]}
              </label>
            </div>
          );
        })}
    </div>
  );
};

export default OrdersModal;
