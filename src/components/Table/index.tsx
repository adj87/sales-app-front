// @ts-nocheck
import React, { useState } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faEllipsisV,
  faAngleLeft,
  faAngleDoubleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';
import Input from '../Inputs/InputText';
import Button from '../Button';
import { getColumnsHiddenInTable, setColumnToHiddenOrShownInTable } from '../../utils.ts';
import { useTranslation } from 'react-i18next';
import InputCheckBox from '../Inputs/InputCheckbox';
import Modal from '../Modal/Modal';

function Table({
  columns,
  data,
  onAddButton,
  tableName,
  withSearching,
  withPagination,
  onRowClick,
  onRowLongPress,
  deleteOnRowPress,
  messageOnDelete,
}: any) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    allColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    preGlobalFilteredRows,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        hiddenColumns: getColumnsHiddenInTable(tableName),
        pageSize: withPagination ? 10 : 10000,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );
  const [showColumnsOptions, setShowColumnsOptions] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {withSearching && <Search globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} preGlobalFilteredRows={preGlobalFilteredRows} />}
      <ColumnsChecks
        allColumns={allColumns}
        tableName={tableName}
        setShowColumnsOptions={setShowColumnsOptions}
        showColumnsOptions={showColumnsOptions}
      />
      <table {...getTableProps()} className="w-full">
        <THead headerGroups={headerGroups} />
        <TBody
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
          onRowClick={onRowClick}
          onRowLongPress={onRowLongPress}
          deleteOnRowPress={deleteOnRowPress}
          messageOnDelete={messageOnDelete}
        />
      </table>

      <PaginationAndAddButton
        isShown={withPagination}
        paginationMethods={{
          canPreviousPage,
          canNextPage,
          pageOptions,
          pageCount,
          gotoPage,
          nextPage,
          previousPage,
          setPageSize,
          pageIndex,
          pageSize,
        }}
        onAddButton={onAddButton}
        t={t}
      />
    </>
  );
}

const THead = ({ headerGroups }) => (
  <thead>
    {headerGroups.map((headerGroup) => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers
          .filter((el) => el.columns === undefined)
          .map((column) => {
            const alignment = column?.alignment ? `text-${column.alignment}` : `text-left`;

            // @ts-ignore
            const color = column.isSorted ? 'text-white font-bold text-md' : 'text-primary-light';
            // @ts-ignore
            const icon = column.isSorted ? (
              // @ts-ignore
              column.isSortedDesc ? (
                <FontAwesomeIcon icon={faAngleDown} className="text-secondary-main text-md" />
              ) : (
                <FontAwesomeIcon icon={faAngleUp} className="text-secondary-main text-md" />
              )
            ) : (
              ''
            );
            return (
              <th
                // @ts-ignore
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={`${alignment} py-2 bg-primary-dark text-sm ${color}`}
              >
                {icon}
                {` ${column.render('Header')}`}
              </th>
            );
          })}
      </tr>
    ))}
  </thead>
);

const TBody = ({ getTableBodyProps, page, prepareRow, onRowClick, onRowLongPress, deleteOnRowPress, messageOnDelete }) => {
  const [rowToDelete, setRowToDelete] = useState(false);
  return (
    <tbody {...getTableBodyProps()}>
      {page.map((row, i) => {
        prepareRow(row);
        return (
          <tr
            {...row.getRowProps()}
            className={`${onRowClick ? 'cursor-pointer bg-white' : ''} hover:bg-grey-100`}
            onClick={() => onRowClick && onRowClick(row)}
            onContextMenu={(ev) => {
              ev.preventDefault();
              onRowLongPress && onRowLongPress(row);
              deleteOnRowPress && setRowToDelete(row);
              return false;
            }}
          >
            {row.cells.map((cell) => {
              debugger;
              const alignment = cell?.column?.alignment ? `text-${cell.column.alignment}` : `text-left`;
              return (
                <td {...cell.getCellProps()} className={`${alignment} py-2 border-b border-primary-light text-md text-primary-dark`}>
                  {cell.render('Cell')}
                </td>
              );
            })}
          </tr>
        );
      })}
      {rowToDelete && (
        <Modal
          size="xs"
          onConfirm={() => {
            setRowToDelete(false);
            deleteOnRowPress(rowToDelete);
          }}
          onCancel={() => setRowToDelete(false)}
          title={'commons.delete-row'}
          centered
        >
          <p>{messageOnDelete ? messageOnDelete(rowToDelete.original) : rowToDelete.original.name || rowToDelete.original.product_name}</p>
        </Modal>
      )}
    </tbody>
  );
};

const PaginationAndAddButton = ({ paginationMethods, onAddButton, withPagination, isShown, t }) => (
  <div className="flex md:flex-row lg:flex-column  justify-center items-center relative mt-6">
    {isShown && <Pagination paginationMethods={paginationMethods} />}
    {onAddButton && <Button onClick={onAddButton} text={'commons.add'} color="secondary" className={'absolute right-0 mt-1'} size="sm" />}
  </div>
);

const ColumnsChecks = ({ allColumns, showColumnsOptions, setShowColumnsOptions, tableName }) => {
  const className = showColumnsOptions ? 'absolute bg-white border-primary-light p-3 rounded-md right-0 top-1 border border-primary z-10' : 'hidden';
  return (
    <div className="flex justify-end relative">
      <div className={'flex-column justify-end mb-1'}>
        <div className="text-right py-2 pl-5 cursor-pointer" onClick={() => setShowColumnsOptions(!showColumnsOptions)}>
          <FontAwesomeIcon icon={faEllipsisV} className="text-secondary-dark cursor-pointer" size="2x" />
        </div>
        <div className={className}>
          {allColumns.map((column) => {
            let { onChange, checked } = column.getToggleHiddenProps();
            onChange = (name, value) => {
              column.toggleHidden(!value);
              setColumnToHiddenOrShownInTable(tableName, column.id);
            };
            return (
              <div key={column.id} className="px-2 py-1">
                <InputCheckBox onChange={onChange} label={column.Header} value={checked} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Search = ({ globalFilter, setGlobalFilter, preGlobalFilteredRows }) => {
  // const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 800);
  return (
    <div className="md:w-2/4 xs:w-full xl:w-1/4">
      <Input
        value={value}
        label="Buscar"
        onChange={(name, value) => {
          setValue(value);
          onChange(value);
        }}
      />
    </div>
  );
};

const Pagination = ({ paginationMethods }) => {
  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    pageIndex,
    // pageSize,
  } = paginationMethods;
  return (
    <div className="flex flex-column justify-between items-center m-auto mt-2" style={{ width: '300px' }}>
      <PaginationButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </PaginationButton>
      <PaginationButton onClick={() => previousPage()} disabled={!canPreviousPage}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </PaginationButton>
      <TextPagination pageIndex={pageIndex} pageOptions={pageOptions} />
      <PaginationButton onClick={() => nextPage()} disabled={!canNextPage}>
        <FontAwesomeIcon icon={faAngleRight} />
      </PaginationButton>
      <PaginationButton onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </PaginationButton>
      {/*       <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[5, 10, 15, 20, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select> */}
    </div>
  );
};

const TextPagination = ({ pageIndex, pageOptions }) => {
  return (
    <span className="text-grey-500">
      {`Page `}
      {<span className="font-extrabold">{pageIndex + 1}</span>}
      {` of ${pageOptions.length}`}
    </span>
  );
};

const PaginationButton = ({ children, ...otherProps }) => (
  <button className="h-8 w-8 bg-primary-dark text-white rounded-md" {...otherProps}>
    {children}
  </button>
);
export default Table;
