import React from 'react';
import './css/dist/index.css';
import Navbar from './components/Navbar';
import { Table } from './components/Table';

function App() {
  const columns = [
    { accessor: 'unidades', header: 'Unidades' },
    { accessor: 'iva', header: 'Iva' },
    { accessor: 'precio', header: 'Esto' },
    { accessor: 'producto', header: 'Producto' },
  ];

  const data = [{ unidades: 20, producto: 'Fre' }];
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="w-full my-16">
          <Table columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}

export default App;
