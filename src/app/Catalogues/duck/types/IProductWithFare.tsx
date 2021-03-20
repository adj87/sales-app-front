import { IProduct } from '../../../Products/duck/types/Product';
import { IFareLine } from '../../../Fares/duck/types/Fare';

export interface IProductWithFareLine extends IProduct {
  fareLine?: IFareLine;
}
