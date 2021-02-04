import React from 'react';
import dayjs from 'dayjs';
import * as Yup from 'yup';

import i18n from '../../i18n';
import { positiveNumberValidation, reasonablePriceValidation, numberOfElementsInArrValidation } from '../../utils';
import { IOrder, IOrderLine } from './duck/types/Order';
import { IProduct } from '../Products/duck/types/Product';
import { TAXES_RATE, RECHARGE_RATE } from '../../constants';

export const columns = [
  {
    Header: 'Name',
    columns: [
      { Header: 'type', accessor: 'type' },
      { Header: 'id', accessor: 'id' },
      { Header: 'customer_name', accessor: 'customer_name' },
      { Header: 'address', accessor: 'address' },
      {
        Header: 'date',
        accessor: 'date',
        Cell: ({ row }: any) => dayjs(row.original.date).format('DD-MM-YYYY'),
      },
      {
        Header: 'delivery_date',
        accessor: 'delivery_date',
        Cell: ({ row }: any) => dayjs(row.original.delivery_date).format('DD-MM-YYYY'),
      },
      { Header: 'zip_code', accessor: 'zip_code' },
      { Header: 'green_point', accessor: 'green_point' },
      { Header: 'customer_route_id', accessor: 'customer_route_id' },
      { Header: 'total', accessor: 'total' },
      { Header: 'total_net', accessor: 'total_net' },
      { Header: 'total_taxes', accessor: 'total_taxes' },
    ],
  },
];

export const columnsOrderLineTable = [
  {
    Header: 'Name',
    columns: [
      { Header: 'order_id', accessor: 'order_id' },
      { Header: 'order_type', accessor: 'order_type' },
      { Header: 'line_number', accessor: 'line_number' },
      { Header: 'product_id', accessor: 'product_id' },
      {
        Header: 'product_name',
        accessor: 'product_name',
        Cell: ({ row }: any) => {
          return (
            <div className="flex items-center justify-center">
              {
                <>
                  <img src={`http://localhost:3001/images/${row.original.product_id}.png`} width="20" className="inline mr-2"></img>
                  <span>{row.original.product_name}</span>
                </>
              }
            </div>
          );
        },
      },
      { Header: 'units_per_box', accessor: 'units_per_box' },
      { Header: 'price', accessor: 'price' },
      { Header: 'cost', accessor: 'cost' },
      { Header: 'quantity', accessor: 'quantity' },
      { Header: 'taxes_rate', accessor: 'taxes_rate' },
      { Header: 'surcharge_amount', accessor: 'surcharge_amount' },
      { Header: 'green_point_amount', accessor: 'green_point_amount' },
    ],
  },
];

export const defaultValues = {
  id: null,
  address: null,
  fiscal_id: null,
  zip_code: null,
  date: null,
  shipping_place: null,
  delivery_date: null,
  total_net: 0,
  total_taxes: 0,
  total_surcharge: 0,
  is_green_point: false,
  is_surcharge: false,
  total: 0,
  customer_id: null,
  customer_name: null,
  customer_route_id: null,
  type: 'A',
  show_together_with_others: true,
  order_lines: [],
};

export const defaultOrderLineValues = {
  order_id: null,
  order_type: 'A',
  line_number: null,
  product_id: null,
  product_name: null,
  units_per_box: 0,
  price: null,
  cost: null,
  quantity: null,
  capacity: null,
  taxes_rate: 21,
  surcharge_amount: 0,
  green_point_amount: 0.01,
};

export const validationSchemaOrder = Yup.object().shape({
  customer_id: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  order_lines: numberOfElementsInArrValidation(),
});

export const validationSchemaOrderLine = Yup.object().shape({
  product_id: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  quantity: positiveNumberValidation.required(i18n.t('commons.errors.field_required')),
  price: reasonablePriceValidation.required(i18n.t('commons.errors.field_required')),
});

/**
 * This function is used to calculate all types of total
 * total_net, total_green_point,total_taxes,total, total_surcharge
 * @param values
 * @param products
 */
export const calculateTotals = (values: IOrder, products: IProduct[]) => {
  if (values && products) {
    const { is_green_point, type, is_surcharge } = values;
    return values.order_lines.reduce(
      (acc: any, oL: IOrderLine) => {
        // @ts-ignore
        const amountOfBottles = oL.quantity * oL.units_per_box;

        // @ts-ignore
        const green_point = is_green_point ? amountOfBottles * oL.green_point_amount : 0;
        acc.total_green_point += green_point;

        // @ts-ignore
        const net = amountOfBottles * oL.price + green_point;
        acc.total_net += net;

        const taxes = type === 'A' ? net * TAXES_RATE : 0;
        acc.total_taxes += taxes;

        const surcharge = is_surcharge ? net * RECHARGE_RATE : 0;
        acc.total_surcharge += surcharge;

        acc.total += net + taxes + surcharge;

        return acc;
      },
      {
        total_net: 0,
        total_green_point: 0,
        total_taxes: 0,
        total: 0,
        total_surcharge: 0,
      },
    );
  }
  return null;
};
