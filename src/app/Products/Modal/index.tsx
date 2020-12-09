import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Modal from '../../../components/Modal';
import SelectComponent from '../../../components/Select';
import { ICustomer } from '../../Customers/duck/types/Customer';
import Input from '../../../components/Input';
import InputCheckBox from '../../../components/InputCheckbox';
import OrderLinesTable from './OrderLinesTable';

interface OrdersModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fetchOrder: Function;
  fetchCustomers: Function;
  customers: ICustomer[];
}

const OrdersModal = ({ onCancel, fetchOrder, fetchCustomers, customers }: OrdersModalProps) => {
  return <div></div>;
};

export default OrdersModal;
