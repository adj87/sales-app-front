import React from 'react';
import { useTable, useSortBy } from 'react-table';

function Table({ columns, data }: any) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );

  // Render the UI for your table

  return (
    <table {...getTableProps()} className="w-full">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers
              .filter((el) => el.columns === undefined)
              .map((column) => {
                // @ts-ignore
                const color = column.isSorted
                  ? 'text-white font-thin'
                  : 'text-blue-light font-thin';
                // @ts-ignore
                const icon = column.isSorted ? (column.isSortedDesc ? '🔽 ' : '🔼 ') : '';
                return (
                  <th
                    // @ts-ignore
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`text-center py-2 bg-blue-dark text-sm ${color}`}
                  >
                    {icon}
                    {column.render('Header')}
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
  );
}

export default Table;
