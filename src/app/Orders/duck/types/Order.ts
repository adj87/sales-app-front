export interface IOrder {
  id: number | null;
  address: string | null;
  fiscal_id: string | null;
  zip_code: string | null;
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
  type: string | null;
}
