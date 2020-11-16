import React, { useState, useEffect } from 'react';
import './css/dist/index.css';
import Navbar from './components/Navbar';
import Table from './components/Table';
import { getColumnsHiddenInTable } from './utils';

function App() {
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
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="w-full my-16">
          <Table
            columns={columns}
            data={data}
            onAddButton={() => console.log('yeah')}
            tableName={'mytabla'}
          />
        </div>
      </div>
    </>
  );
}

export default App;
