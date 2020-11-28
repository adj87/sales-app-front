export interface Order {
  id: number;
  address: string;
  fiscal_id: string;
  zip_code: string;
  date: string;
  delivery_date: string;
  total_net: number;
  total_taxes: number;
  total: number;
  surcharge: number;
  customer_id: number;
  customer_name: string;
  green_point: number;
  customer_route_id: number;
  type: string;
}
