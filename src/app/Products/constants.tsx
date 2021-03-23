import React from 'react';

import i18n from '../../i18n';
import * as Yup from 'yup';
import InputCheckBox from '../../components/Inputs/InputCheckbox';

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
      /*       {
        Header: i18n.t('products.table.is-deprecated'),
        accessor: 'is_deprecated',
        Cell: ({ row }: any) => {
          debugger;
          // @ts-ignore
          return <InputCheckBox value={row.original.is_deprecated} style={{ marginTop: '-12px', marginLeft: '15px' }} onChange={() => {}} />;
        },
      }, */
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

export const validationSchema = Yup.object().shape({
  code_bar: Yup.string().nullable().required(i18n.t('commons.errors.field_required')),
  name: Yup.string().nullable().required(i18n.t('commons.errors.field_required')),
  green_point_amount: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  units_per_box: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  capacity: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  weight: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  box_width: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  box_height: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  box_length: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  box_weight: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  //box_capacity: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  pallet_boxes: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  pallet_base: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  //pallet_weight: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  //pallet_capacity: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  //pallet_height: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
});
