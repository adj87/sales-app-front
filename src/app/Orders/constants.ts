export const columns = [
  {
    Header: 'Name',
    columns: [
      { Header: 'type', accessor: 'type' },
      { Header: 'id', accessor: 'id' },
      { Header: 'customer_name', accessor: 'customer_name' },
      { Header: 'address', accessor: 'address' },
      { Header: 'date', accessor: 'date' },
      { Header: 'delivery_date', accessor: 'delivery_date' },
      { Header: 'zip_code', accessor: 'zip_code' },
      { Header: 'green_point', accessor: 'green_point' },
      { Header: 'customer_route_id', accessor: 'customer_route_id' },
      { Header: 'total', accessor: 'total' },
      { Header: 'total_net', accessor: 'total_net' },
      { Header: 'total_taxes', accessor: 'total_taxes' },
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
