import React from 'react';

export const columns = [
  {
    Header: 'Name',
    columns: [
      { Header: 'customer_id', accessor: 'customer_id' },
      { Header: 'product_name', accessor: 'product_name' },
      { Header: 'customer_name', accessor: 'customer_name' },
      { Header: 'price_1', accessor: 'price_1' },
      { Header: 'price_2', accessor: 'price_2' },
      { Header: 'price_3', accessor: 'price_3' },
      { Header: 'price_4', accessor: 'price_4' },
      { Header: 'product_id', accessor: 'product_id' },
      { Header: 'to_charge', accessor: 'to_charge' },
      { Header: 'to_sell', accessor: 'to_sell' },
    ],
  },
];

export const defaultValues = {
  customer_name: null,
  customer_id: null,
  fare_lines: [],
};
