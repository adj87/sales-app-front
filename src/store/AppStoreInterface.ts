import { OrdersState } from '../app/Orders/duck/types';
import { CustomersState } from '../app/Customers/duck/types';
import { ProductsState } from '../app/Products/duck/types';
import { FaresState } from '../app/Fares/duck/types';
import { AlertsState } from '../app/Alerts/duck/types';
import { ConfigState } from '../app/Config/duck/types';
import { CataloguesState } from '../app/Catalogues/duck/types';

export interface AppStoreInterface {
  orders: OrdersState;
  products: ProductsState;
  customers: CustomersState;
  fares: FaresState;
  pendingRequests: number;
  alerts: AlertsState;
  config: ConfigState;
  catalogues: CataloguesState;
}
