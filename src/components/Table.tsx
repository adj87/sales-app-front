import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

interface Column {
  accessor: String;
  header: String;
}

interface TableProps {
  columns: Array<Column>;
  data: Array<any>;
}

type Sort = String | null;

export const Table = ({ columns, data }: TableProps) => {
  const initialSort = columns[0]?.accessor;
  const [sort, setSort] = useState<Sort>(initialSort);

  return (
    <div className="w-full flex-row justify-end">
      <div className="w-50">
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>

      <table className="w-full">
        <thead>
          <tr>
            {columns.map((el: Column) => {
              const color = sort === el.accessor ? 'text-white font-bold' : 'text-blue-light';
              return (
                <td
                  className={`bg-blue-dark ${color} px-5 py-1 text-center`}
                  onClick={() => setSort(el.accessor)}
                >
                  {el.header}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((el: any) => (
            <tr className="border-b-2 border-blue-light ">
              {columns.map((col: any) => (
                <td className="bg-white text-grey-600 text-center py-2">{el[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Options = () => (
  <div className="flex-row">
    <span
      style={{ width: '6px', height: '6px', borderRadius: '100%', display: 'inline-block' }}
      className="bg-blue-dark my-1"
    />
    <span
      style={{ width: '6px', height: '6px', borderRadius: '100%', display: 'inline-block' }}
      className="bg-blue-dark my-1"
    />
    <span
      style={{ width: '6px', height: '6px', borderRadius: '100%', display: 'inline-block' }}
      className="bg-blue-dark my-1"
    />
  </div>
);
