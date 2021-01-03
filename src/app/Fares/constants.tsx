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
  id: null,
  address: null,
  fiscal_id: null,
  zip_code: null,
  date: null,
  shipping_place: null,
  delivery_date: null,
  total_net: 0,
  total_taxes: 0,
  total: 0,
  surcharge: null,
  customer_id: null,
  customer_name: null,
  green_point: null,
  customer_route_id: null,
  type: 'A',
  show_together_with_others: true,
  order_lines: [],
};

export const defaultOrderLineValues = {
  order_id: null,
  order_type: 'A',
  line_number: null,
  product_id: null,
  product_name: null,
  units_per_box: 0,
  price: null,
  cost: null,
  quantity: null,
  taxes_rate: 21,
  surcharge_amount: 0,
  green_point_amount: 0.01,
};
