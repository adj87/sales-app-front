export interface IFare {
  customer_id: string | null;
  customer_name: string | null;
  fare_lines: IFareLine[] | [];
}

export interface IFareLine {
  product_id: string | null;
  product_name: string | null;
  customer_id: string | null;
  customer_name: string | null;
  price_1: number | null;
  price_2: number | null;
  price_3: number | null;
  price_4: number | null;
  to_sell: number | null;
  to_charge: number | null;
}

export interface IFareLineWithCheck extends IFareLine {
  checked: boolean;
}
