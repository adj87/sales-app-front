export interface IOrder {
  id: number | null;
  address: string | null;
  fiscal_id: string | null;
  zip_code: string | null;
  shipping_place: string | null;
  date: string | null;
  delivery_date: string | null;
  is_green_point: boolean; // loperpv
  is_surcharge: boolean; // lrecargo
  total_net: number | null; // this also includes total green point
  total_taxes: number | null;
  total_surcharge: number | null; //ntotreq
  total: number | null;
  customer_id: string | null;
  customer_name: string | null;
  customer_route_id: number | null;
  type: string;
  show_together_with_others: boolean;
  order_lines: IOrderLine[];
}

export interface IOrderLine {
  order_id: number | null;
  order_type: string | null;
  line_number: number | null;
  product_id: string | null;
  product_name: string | null;
  units_per_box: number | null;
  price: number | null;
  cost: number | null;
  quantity: number | null;
  taxes_rate: number | null;
  surcharge_amount: number | null;
  green_point_amount: number | null;
  capacity: number | null
}
