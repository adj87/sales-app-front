import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import Axios from 'axios';
import SelectComponent from '../../components/Select';
import { ICustomer } from '../Customers/duck/types/Customer';
import Input from '../../components/Input';
import InputCheckBox from '../../components/InputCheckbox';
import Label from '../../components/Label';

interface OrdersModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fetchOrder: Function;
  fetchCustomers: Function;
  customers: ICustomer[];
}

const OrdersModal = ({ onCancel, fetchOrder, fetchCustomers, customers }: OrdersModalProps) => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const [customerSelected, setCustomer] = useState<any>(null);
  useEffect(() => {
    fetchOrder(type, id);
    fetchCustomers();
  }, []);
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
            onChange={(customer: ICustomer) => setCustomer(customer)}
          />
        </div>

        {customerSelected && <CustomerInfo customer={customerSelected} />}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          label="orders.form.label-fare"
          name="fare"
          onChange={(value: string) => console.log(value)}
          value="asdasd"
        />
        <Input
          label="orders.form.label-address-delivery"
          name="fare"
          onChange={(value: string) => console.log(value)}
          value="asdasd"
        />
        <div className="col-span-2 flex items-center justify-center">
          <InputCheckBox checked={false} label={'orders.form.label-together'} />
        </div>
      </div>
      <div className="w-full pt-2">
        <Label>orders.form.label-orders-lines</Label>
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
