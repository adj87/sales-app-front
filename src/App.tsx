import React from 'react';
import './css/dist/index.css';
import Navbar from './components/Navbar';
import Table from './components/Table';

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    [],
  );

  const data = [
    { firstName: 'alberto', lastName: 'jauregui' },
    { firstName: 'perez', lastName: 'beneplacito' },
    { firstName: 'perez', lastName: 'beneplacito' },
    { firstName: 'perez', lastName: 'beneplacito' },
    { firstName: 'asdasd', lastName: 'beneplacito' },
    { firstName: 'wewewq', lastName: 'beneplacito' },
    { firstName: 'qweqweqwe', lastName: 'beneplacito' },
    { firstName: 'perez', lastName: 'beneplacito' },
    { firstName: 'perez', lastName: 'beneplacito' },
    { firstName: 'perez', lastName: 'beneplacito' },
    { firstName: 'asdasdc', lastName: 'beneplacito' },
    { firstName: 'pooo', lastName: 'beneplacito' },
    { firstName: 'perez', lastName: 'beneplacito' },
    { firstName: 'perez', lastName: 'beneplacito' },
    { firstName: 'perez', lastName: 'beneplacito' },
    { firstName: 'perez', lastName: 'beneplacito' },
  ];
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="w-full my-16">
          <Table columns={columns} data={data} onAddButton={() => console.log('yeah')} />
        </div>
      </div>
    </>
  );
}

export default App;
