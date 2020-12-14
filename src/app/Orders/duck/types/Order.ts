export interface IOrder {
  id: number | null;
  address: string | null;
  fiscal_id: string | null;
  zip_code: string | null;
  shipping_place: string | null;
  date: string | null;
  delivery_date: string | null;
  total_net: number | null;
  total_taxes: number | null;
  total: number | null;
  surcharge: number | null;
  customer_id: number | null;
  customer_name: string | null;
  green_point: number | null;
  customer_route_id: number | null;
  type: string;
  show_together_with_others: boolean;
  order_lines: IOrderLine[];
}

export interface IOrderLine {
  order_id: number | null;
  order_type: string | null;
  line_number: number | null;
  product_id: number | null;
  product_name: string | null;
  units_per_box: number | null;
  price: number | null;
  cost: number | null;
  quantity: number | null;
  taxes_rate: number | null;
  surcharge_amount: number | null;
  green_point_amount: number | null;
}
