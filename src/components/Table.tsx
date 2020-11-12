// @ts-nocheck
import React, { useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

function Table({ columns, data }: any) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, allColumns } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );
  const [showColumnsOptions, setShowColumnsOptions] = useState(false);

  // Render the UI for your table

  return (
    <>
      <ColumnChecks allColumns={allColumns} />
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
          {rows.map((row, i) => {
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
    </>
  );
}

const ColumnChecks = ({ allColumns }) => (
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
export default Table;
