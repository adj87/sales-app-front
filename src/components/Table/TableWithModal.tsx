import React, { useState, ReactNode } from 'react';
import Table from './index';

interface TableWithModalProps {
  data: any[];
  columns: any[];
  tableName: String;
  modal: React.ReactType;
  onAddButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRowClick: (row: any) => void;
  withSearching?: boolean;
  withPagination?: boolean;
  openModal: boolean;
}

const TableWithModal = ({
  data,
  columns,
  tableName,

  onAddButton,
  withSearching,
  withPagination,
  onRowClick,
  modal: Modal,
  openModal,
}: TableWithModalProps) => {
  return (
    <>
      {openModal && <Modal values={[]} />}

      <Table
        onAddButton={onAddButton}
        columns={columns}
        tableName={tableName}
        data={data}
        withSearching={withSearching}
        withPagination={withPagination}
        onRowClick={onRowClick}
      />
    </>
  );
};

export default TableWithModal;
