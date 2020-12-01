import React from 'react';
import Modal from '../../components/Modal';

interface OrdersModalProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const OrdersModal = ({ onCancel }: OrdersModalProps) => {
  console.log('object');
  return (
    <Modal open={true} onCancel={onCancel} onConfirm={() => console.log('hello confirm')}>
      <div>Este es el body</div>
    </Modal>
  );
};

export default OrdersModal;
