import React, { useState, ReactNode } from 'react';
import Table from './index';
import Modal from '../Modal';

interface TableWithModalProps {
  data: any[];
  columns: any[];
  tableName: String;
  children: ReactNode;
  onAddButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
  withSearching?: boolean;
  withPagination?: boolean;
}

const TableWithModal = ({
  data,
  columns,
  tableName,
  children,
  onAddButton,
  withSearching,
  withPagination,
}: TableWithModalProps) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Modal
        onCancel={() => setOpenModal(false)}
        open={openModal}
        onConfirm={() => setOpenModal(false)}
      >
        {children}
      </Modal>
      <Table
        onAddButton={() => setOpenModal(true)}
        columns={columns}
        tableName={tableName}
        data={data}
        withSearching={withSearching}
        withPagination={withPagination}
      />
    </>
  );
};

export default TableWithModal;
