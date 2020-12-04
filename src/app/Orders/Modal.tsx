import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import Axios from 'axios';
import SelectComponent from '../../components/Select';

interface OrdersModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fetchOrder: Function;
}

const OrdersModal = ({ onCancel, fetchOrder }: OrdersModalProps) => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const [state, setstate] = useState<any>([]);
  useEffect(() => {
    fetchOrder(type, id);
    Axios.get('http://localhost:3001/customers').then((data) => setstate(data.data));
  }, []);
  return (
    <Modal open={true} onCancel={onCancel} onConfirm={() => console.log('hello confirm')} size="lg">
      <div className="w-full">
        asd asd asd ads ads ads
        <SelectComponent options={state} labelText="orders.form.label-customers" />
      </div>
    </Modal>
  );
};

export default OrdersModal;
