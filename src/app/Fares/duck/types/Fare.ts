export interface IFare {
  customer_id: number;
  customer_name: string;
  fare_lines: IFareLine[];
}

export interface IFareLine {
  product_id: number;
  customer_id: number;
  customer_name: string;
  price_1: string;
  price_2: string;
  price_3: string;
  price_4: string;
  to_sell: number;
  to_charge: number;
}
