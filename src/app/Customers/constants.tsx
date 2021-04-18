import React from 'react';
import i18n from '../../i18n';
import * as Yup from 'yup';
import InputCheckBox from '../../components/Inputs/InputCheckbox';
import { dayjsCustom } from '../../dayjsConfig';
import store from '../../store';

const dateFormatFront = process.env.REACT_APP_FORMAT_DATE_FRONT;

export const columns = [
  {
    Header: 'Name',
    columns: [
      { Header: i18n.t('customers.table.id'), accessor: 'id' },
      { Header: i18n.t('customers.table.name'), accessor: 'name' },
      { Header: i18n.t('customers.table.address'), accessor: 'address' },
      { Header: i18n.t('customers.table.fiscal-id'), accessor: 'fiscal_id' },
      { Header: i18n.t('customers.table.route-id'), accessor: 'route_id' },
      { Header: i18n.t('customers.table.zip-code'), accessor: 'zip_code' },
      { Header: i18n.t('customers.table.email'), accessor: 'email' },
      { Header: i18n.t('customers.table.agent-id'), accessor: 'agent_id' },
      { Header: i18n.t('customers.table.phone'), accessor: 'phone' },
      { Header: i18n.t('customers.table.phone-2'), accessor: 'phone_2' },
      { Header: i18n.t('customers.table.phone-mobile'), accessor: 'phone_mobile' },
      {
        Header: i18n.t('customers.table.is-green-point'),
        accessor: 'is_green_point',
        Cell: ({ row }: any) => {
          // @ts-ignore
          return <InputCheckBox value={row.original.is_green_point} style={{ marginTop: '-12px', marginLeft: '15px' }} onChange={() => {}} />;
        },
      },
      {
        Header: i18n.t('customers.table.is-surcharge'),
        accessor: 'is_surcharge',
        Cell: ({ row }: any) => {
          // @ts-ignore
          return <InputCheckBox value={row.original.is_surcharge} style={{ marginTop: '-12px', marginLeft: '15px' }} onChange={() => {}} />;
        },
      },
      /*       {
        Header: i18n.t('customers.table.created-at'),
        accessor: 'created_at',
        Cell: ({ row }: any) => dayjsCustom(row.original.date).format(dateFormatFront),
      }, */
      //{ Header: i18n.t('customers.table.updated-at'), accessor: 'updated_at' },
      //  { Header: i18n.t('customers.table.is-deprecated'), accessor: 'is_deprecated' },
      { Header: i18n.t('customers.table.town'), accessor: 'town' },
      { Header: i18n.t('customers.table.province'), accessor: 'province' },
      { Header: i18n.t('customers.table.method-of-payment'), accessor: 'method_of_payment' },
    ],
  },
];

export const defaultValues = (agent_id: string) => {
  return {
    id: null,
    name: null,
    address: null,
    fiscal_id: null,
    route_id: null,
    agent_id,
    zip_code: '',
    email: '',
    phone: '',
    phone_2: '',
    phone_mobile: '',
    is_green_point: false,
    is_surcharge: false,
    created_at: null,
    updated_at: null,
    is_deprecated: false,
    town: '',
    province: '',
    method_of_payment: null,
  };
};

export const validationSchema = Yup.object().shape({
  //id: Yup.string().nullable().required(i18n.t('commons.errors.field_required')),
  name: Yup.string().nullable().required(i18n.t('commons.errors.field_required')),
  address: Yup.string().nullable().required(i18n.t('commons.errors.field_required')),
  fiscal_id: Yup.string().nullable().required(i18n.t('commons.errors.field_required')),
  route_id: Yup.string().nullable().required(i18n.t('commons.errors.field_required')),
  zip_code: Yup.string().nullable().required(i18n.t('commons.errors.field_required')),
  //email: Yup.string().nullable().required(i18n.t('commons.errors.field_required')),
  //agent_id: Yup.string().nullable().required(i18n.t('commons.errors.field_required')),
  //phone: Yup.string().nullable().required(i18n.t('commons.errors.field_required')),
  //town: Yup.string().nullable().required(i18n.t('commons.errors.field_required')),
  //province: Yup.string().nullable().required(i18n.t('commons.errors.field_required')),
  method_of_payment: Yup.string().nullable().required(i18n.t('commons.errors.field_required')),
});

export const columnsLastDataChart = [
  {
    Header: 'Name',
    columns: [
      {
        Header: i18n.t('customers.form.charts-first.last-data.date'),
        accessor: 'date',
        width: 200,
        Cell: ({ row }: any) => (row.original?.date ? dayjsCustom(row.original.date).format(dateFormatFront) : ''),
      },
      { Header: i18n.t('customers.form.charts-first.last-data.invoice'), accessor: 'invoice' },
      { Header: i18n.t('customers.form.charts-first.last-data.id'), accessor: 'id' },
      { Header: i18n.t('customers.form.charts-first.last-data.name'), accessor: 'name' },
      { Header: i18n.t('customers.form.charts-first.last-data.quantity'), accessor: 'quantity', alignment: 'right' },
    ],
  },
];
