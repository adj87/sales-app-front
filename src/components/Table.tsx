import React from 'react';
import { useTable } from 'react-table';

function Table({ columns, data }: any) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // Render the UI for your table

  return (
    <table {...getTableProps()} className="w-full">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers
              .filter((el) => el.columns === undefined)
              .map((column) => {
                console.log(column);
                return (
                  <th
                    {...column.getHeaderProps()}
                    className="text-center py-2 bg-blue-dark text-blue-light font-thin text-sm"
                  >
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
                  <td {...cell.getCellProps()} className="text-center">
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
