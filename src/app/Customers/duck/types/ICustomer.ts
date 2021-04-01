// Generated by https://quicktype.io

export interface ICustomer {
  id: string | null;
  name: string | null;
  address: string | null;
  fiscal_id: string | null;
  route_id: string | null;
  agent_id: string | null;
  zip_code: string | null;
  email: string | null;
  phone: string | null;
  is_green_point: boolean;
  is_surcharge: boolean;
  created_at: string | null;
  updated_at: string | null;
  is_deprecated: boolean;
  town: string | null; // población
  province: string | null;
  method_of_payment: string | null;
}

export interface IPaymentMethod {
  id: string;
  name: string;
}

export interface IRoute {
  id: string;
  name: string;
}

export interface IChartUnitsByMonthProductAndCustomer {
  data: { [key: string]: any }[];
  products: string[];
}
