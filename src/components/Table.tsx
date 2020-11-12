// @ts-nocheck
import React, { useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
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

function Table({ columns, data }: any) {
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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination,
  );
  const [showColumnsOptions, setShowColumnsOptions] = useState(false);

  // Render the UI for your table

  return (
    <>
      <ColumnsChecks allColumns={allColumns} />
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
                      className="text-center py-2 border-b border-blue-light text-sm text-grey-500"
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
      <Pagination
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
      />
    </>
  );
}

const ColumnsChecks = ({ allColumns }) => (
  <div className="flex justify-end">
    <div className="flex-column justify-end">
      <div className="text-right">
        <FontAwesomeIcon icon={faEllipsisV} className="text-orange text-md" />
      </div>
      <div>
        {allColumns.map((column) => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} /> {column.id}
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
);

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
    <div className="flex flex-column justify-between m-auto mt-2" style={{ width: '300px' }}>
      <PaginationButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </PaginationButton>
      <PaginationButton onClick={() => previousPage()} disabled={!canPreviousPage}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </PaginationButton>
      <span className="text-grey-400">{`Page ${pageIndex + 1} of ${pageOptions.length}`}</span>
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

const PaginationButton = ({ children, ...otherProps }) => (
  <button className="h-8 w-8 bg-blue-dark text-white rounded-md" {...otherProps}>
    {children}
  </button>
);
export default Table;
