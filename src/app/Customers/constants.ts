import i18n from '../../i18n';
import * as Yup from 'yup';
import InputCheckBox from '../../components/Inputs/InputCheckbox';

export const columns = [
  {
    Header: 'Name',
    columns: [
      { Header: i18n.t('products.table.id'), accessor: 'id' },
      { Header: i18n.t('products.table.id'), accessor: 'name' },
      { Header: i18n.t('products.table.id'), accessor: 'address' },
      { Header: i18n.t('products.table.id'), accessor: 'fiscal_id' },
      { Header: i18n.t('products.table.id'), accessor: 'route_id' },
      { Header: i18n.t('products.table.id'), accessor: 'zip_code' },
      { Header: i18n.t('products.table.id'), accessor: 'email' },
      { Header: i18n.t('products.table.id'), accessor: 'phone' },
      { Header: i18n.t('products.table.id'), accessor: 'is_green_point' },
      { Header: i18n.t('products.table.id'), accessor: 'is_surcharge' },
      { Header: i18n.t('products.table.id'), accessor: 'created_at' },
      { Header: i18n.t('products.table.id'), accessor: 'updated_at' },
      { Header: i18n.t('products.table.id'), accessor: 'is_deprecated' },
      { Header: i18n.t('products.table.id'), accessor: 'town' },
      { Header: i18n.t('products.table.id'), accessor: 'province' },
      { Header: i18n.t('products.table.id'), accessor: 'method_of_payment' },
    ],
  },
];
