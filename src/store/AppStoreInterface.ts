import { OrdersState } from '../app/Orders/duck/types';
import { CustomersState } from '../app/Customers/duck/types';

export interface AppStoreInterface {
  orders: OrdersState;
  customers: CustomersState;
}
