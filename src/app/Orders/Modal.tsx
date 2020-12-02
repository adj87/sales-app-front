import React, { useEffect } from 'react';
import Modal from '../../components/Modal';
import { useParams } from 'react-router-dom';

interface OrdersModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fetchOrder: Function;
}

const OrdersModal = ({ onCancel, fetchOrder }: OrdersModalProps) => {
  const { id, type } = useParams<{ id: string; type: string }>();
  useEffect(() => {
    fetchOrder(type, id);
  }, []);
  return (
    <Modal open={true} onCancel={onCancel} onConfirm={() => console.log('hello confirm')}>
      <div>Este es el body</div>
    </Modal>
  );
};

export default OrdersModal;
