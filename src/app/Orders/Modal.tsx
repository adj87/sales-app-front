import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import Axios from 'axios';
import SelectComponent from '../../components/Select';
import { ICustomer } from '../Customers/duck/types/Customer';

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
      <div className="flex">
        <div className="flex-1">
          <SelectComponent
            options={customers}
            labelText="orders.form.label-customers"
            onChange={(customer: ICustomer) => setCustomer(customer)}
          />
        </div>

        {customerSelected && <CustomerInfo customer={customerSelected} />}
      </div>
    </Modal>
  );
};

const CustomerInfo = ({ customer }: { customer: ICustomer }) => {
  return (
    <div className="flex-1 border-grey-300 rounded-md border px-2 py-5 flex flex-wrap">
      {Object.keys(customer).map((property: string) => {
        return (
          <div className="flex-1 flex justify-between">
            <label className="text-primary-light">{property}</label>
            {/* 
  // @ts-ignore */}
            <label className="text-grey-300">{customer[property]}</label>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersModal;
