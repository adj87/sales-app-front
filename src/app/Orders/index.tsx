import React, { useState, useEffect } from 'react';
import MainLayout from '../Layouts/Main';
import Table from '../../components/Table';

export const Orders = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          { Header: 'userId', accessor: 'userId' },
          { Header: 'id', accessor: 'id' },
          { Header: 'title', accessor: 'title' },
          { Header: 'completed', accessor: 'completed' },
        ],
      },
    ],
    [],
  );

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <MainLayout>
      <Table
        columns={columns}
        data={data}
        onAddButton={() => console.log('yeah')}
        tableName={'mytabla'}
        withSearching
        withPagination
      />
    </MainLayout>
  );
};
