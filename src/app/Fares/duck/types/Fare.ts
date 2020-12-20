export interface IFare {
  customer_id: number;
  customer_name: string;
  fare_lines: IFareLine[];
}

export interface IFareLine {
  product_id: number;
  customer_id: number;
  customer_name: string;
  price_1: number;
  price_2: number;
  price_3: number;
  price_4: number;
  to_sell: number;
  to_charge: number;
}
