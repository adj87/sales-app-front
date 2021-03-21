import i18n from '../../i18n';

export const columns = [
  {
    Header: 'Name',
    columns: [
      { Header: i18n.t('products.table.id'), accessor: 'id' },
      { Header: i18n.t('products.table.code-bar'), accessor: 'code_bar' },
      { Header: i18n.t('products.table.name'), accessor: 'name' },
      { Header: i18n.t('products.table.green-point-amount'), accessor: 'green_point_amount' },
      { Header: i18n.t('products.table.units-per-box'), accessor: 'units_per_box' },
      { Header: i18n.t('products.table.capacity'), accessor: 'capacity' },
      { Header: i18n.t('products.table.weight'), accessor: 'weight' },
      // box
      { Header: i18n.t('products.table.box-width'), accessor: 'box_width' },
      { Header: i18n.t('products.table.box-height'), accessor: 'box_height' },
      { Header: i18n.t('products.table.box-length'), accessor: 'box_length' },
      { Header: i18n.t('products.table.box-weight'), accessor: 'box_weight' },
      { Header: i18n.t('products.table.box-capacity'), accessor: 'box_capacity' },

      // pallet
      { Header: i18n.t('products.table.pallet-boxes'), accessor: 'pallet_boxes' },
      { Header: i18n.t('products.table.pallet-base'), accessor: 'pallet_base' },
      { Header: i18n.t('products.table.pallet-weight'), accessor: 'pallet_weight' },
      { Header: i18n.t('products.table.pallet-capacity'), accessor: 'pallet_capacity' },
      { Header: i18n.t('products.table.pallet-height'), accessor: 'pallet_height' },
    ],
  },
];
