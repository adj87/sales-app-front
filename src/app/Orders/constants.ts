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

export const columnsOrderLineTable = [
  {
    Header: 'Name',
    columns: [
      { Header: 'order_id', accessor: 'order_id' },
      { Header: 'order_type', accessor: 'order_type' },
      { Header: 'line_number', accessor: 'line_number' },
      { Header: 'product_id', accessor: 'product_id' },
      { Header: 'product_name', accessor: 'product_name' },
      { Header: 'units_per_box', accessor: 'units_per_box' },
      { Header: 'price', accessor: 'price' },
      { Header: 'cost', accessor: 'cost' },
      { Header: 'quantity', accessor: 'quantity' },
      { Header: 'taxes_rate', accessor: 'taxes_rate' },
      { Header: 'surcharge_amount', accessor: 'surcharge_amount' },
      { Header: 'green_point_amount', accessor: 'green_point_amount' },
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
