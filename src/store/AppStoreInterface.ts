import { OrdersState } from '../app/Orders/duck/types';
import { CustomersState } from '../app/Customers/duck/types';
import { ProductsState } from '../app/Products/duck/types';
import { FaresState } from '../app/Fares/duck/types';

export interface AppStoreInterface {
  orders: OrdersState;
  products: ProductsState;
  customers: CustomersState;
  fares: FaresState;
  loading: boolean;
}
