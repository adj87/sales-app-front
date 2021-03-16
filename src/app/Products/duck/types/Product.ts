export interface IProduct {
  // product
  id: string;
  code_bar: string;
  name: string;
  cost: number;
  green_point_amount: number;
  units_per_box: number;
  capacity: number;
  weight: number;

  // box
  box_width: number;
  box_height: number;
  box_length: number;
  box_weight: number;
  box_capacity: number;

  // pallet
  pallet_boxes: number;
  pallet_base: number;
  pallet_weight: number;
  pallet_capacity: number;
  pallet_height: number;
}
