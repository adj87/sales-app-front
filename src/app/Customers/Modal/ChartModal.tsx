import React from 'react';

import Modal from '../../../components/Modal/Modal';

interface ChartModalProps {
  onCancel: Function;
}

export const ChartModal = ({ onCancel }: ChartModalProps) => {
  return (
    <Modal onCancel={() => onCancel()} onConfirm={() => onCancel()} size="lg" title={'customers.form.title-edit'}>
      <div>Hiiiiii</div>
    </Modal>
  );
};
