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
import Input from './Input';
import Button from './Button';

function Table({ columns, data, onAddButton }: any) {
  // Use the state and functions returned from useTable to build your UI
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
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );
  const [showColumnsOptions, setShowColumnsOptions] = useState(false);

  // Render the UI for your table

  return (
    <>
      <Search
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        preGlobalFilteredRows={preGlobalFilteredRows}
      />
      <ColumnsChecks
        allColumns={allColumns}
        setShowColumnsOptions={setShowColumnsOptions}
        showColumnsOptions={showColumnsOptions}
      />
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers
                .filter((el) => el.columns === undefined)
                .map((column) => {
                  // @ts-ignore
                  const color = column.isSorted
                    ? 'text-white font-bold'
                    : 'text-blue-light font-thin';
                  // @ts-ignore
                  const icon = column.isSorted ? (
                    // @ts-ignore
                    column.isSortedDesc ? (
                      <FontAwesomeIcon icon={faAngleDown} className="text-orange text-md" />
                    ) : (
                      <FontAwesomeIcon icon={faAngleUp} className="text-orange text-md" />
                    )
                  ) : (
                    ''
                  );
                  return (
                    <th
                      // @ts-ignore
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={`text-center py-2 bg-blue-dark text-sm ${color}`}
                    >
                      {icon}
                      {` ${column.render('Header')}`}
                    </th>
                  );
                })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="text-center py-2 border-b border-blue-light text-sm text-grey-500 bg-white"
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <PaginationAndAddButton
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
      />
    </>
  );
}

const PaginationAndAddButton = ({ paginationMethods, onAddButton }) => (
  <div className="flex flex-row justify-center">
    <Pagination paginationMethods={paginationMethods} />
    {onAddButton && <Button onClick={onAddButton} text="Add" />}
  </div>
);

const ColumnsChecks = ({ allColumns, showColumnsOptions, setShowColumnsOptions }) => {
  const className = showColumnsOptions
    ? 'absolute bg-white border-blue-light p-3 rounded-md right-0 top-1 border border-blue'
    : 'hidden';
  return (
    <div className="flex justify-end relative">
      <div className={'flex-column justify-end mb-1'}>
        <div className="text-right">
          <FontAwesomeIcon
            icon={faEllipsisV}
            className="text-orange cursor-pointer"
            size="lg"
            onClick={() => setShowColumnsOptions(!showColumnsOptions)}
          />
        </div>
        <div className={className}>
          {allColumns.map((column) => (
            <div key={column.id} className="px-2 py-1">
              <label className="text-grey-500">
                <input type="checkbox" {...column.getToggleHiddenProps()} /> {column.id}
              </label>
            </div>
          ))}
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
        onChange={(value) => {
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
    setPageSize,
    pageIndex,
    pageSize,
  } = paginationMethods;
  return (
    <div
      className="flex flex-column justify-between items-center m-auto mt-2"
      style={{ width: '300px' }}
    >
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
  <button className="h-8 w-8 bg-blue-dark text-white rounded-md" {...otherProps}>
    {children}
  </button>
);
export default Table;
