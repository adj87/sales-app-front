import React from 'react';
import { dayjsCustom } from '../../dayjsConfig';
import * as Yup from 'yup';

import i18n from '../../i18n';
import { isDefaultFare } from '../../utils';
import { positiveNumberValidation, reasonablePriceValidation, numberOfElementsInArrValidation } from '../../utils';
import { IOrder, IOrderLine } from './duck/types/Order';
import { IProduct } from '../Products/duck/types/Product';
import { TAXES_RATE, RECHARGE_RATE, WORKING_DAYS_OF_DELIVERY } from '../../constants';
import { IFare, IFareLine } from '../Fares/duck/types/Fare';

const dateFormat = process.env.REACT_APP_FORMAT_DATE;

export const columns = [
  {
    Header: 'Name',
    columns: [
      { Header: i18n.t('orders.table.type'), accessor: 'type' },
      { Header: i18n.t('orders.table.id'), accessor: 'id' },
      { Header: i18n.t('orders.table.customer_name'), accessor: 'customer_name' },
      { Header: i18n.t('orders.table.address'), accessor: 'address' },
      {
        Header: i18n.t('orders.table.date'),
        accessor: 'date',
        Cell: ({ row }: any) => dayjsCustom(row.original.date).format('DD-MM-YYYY'),
      },
      {
        Header: i18n.t('orders.table.delivery_date'),
        accessor: 'delivery_date',
        Cell: ({ row }: any) => dayjsCustom(row.original.delivery_date).format('DD-MM-YYYY'),
      },
      { Header: i18n.t('orders.table.zip_code'), accessor: 'zip_code' },
      { Header: i18n.t('orders.table.customer_route_id'), accessor: 'customer_route_id' },
      { Header: i18n.t('orders.table.total'), accessor: 'total' },
      { Header: i18n.t('orders.table.total_net'), accessor: 'total_net' },
      { Header: i18n.t('orders.table.total_taxes'), accessor: 'total_taxes' },
    ],
  },
];

export const columnsOrderLineTable = [
  {
    Header: 'Name',
    columns: [
      { Header: i18n.t('orders.form.order-lines-table.order_id'), accessor: 'order_id' },
      { Header: i18n.t('orders.form.order-lines-table.order_type'), accessor: 'order_type' },
      { Header: i18n.t('orders.form.order-lines-table.line_number'), accessor: 'line_number' },
      { Header: i18n.t('orders.form.order-lines-table.product_id'), accessor: 'product_id' },
      {
        Header: i18n.t('orders.form.order-lines-table.product_name'),
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
      { Header: i18n.t('orders.form.order-lines-table.units_per_box'), accessor: 'units_per_box' },
      { Header: i18n.t('orders.form.order-lines-table.price'), accessor: 'price' },
      { Header: i18n.t('orders.form.order-lines-table.cost'), accessor: 'cost' },
      { Header: i18n.t('orders.form.order-lines-table.quantity'), accessor: 'quantity' },
      { Header: i18n.t('orders.form.order-lines-table.taxes_rate'), accessor: 'taxes_rate' },
      { Header: i18n.t('orders.form.order-lines-table.surcharge_amount'), accessor: 'surcharge_amount' },
      { Header: i18n.t('orders.form.order-lines-table.green_point_amount'), accessor: 'green_point_amount' },
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
  //@ts-ignore
  delivery_date: dayjsCustom().businessDaysAdd(WORKING_DAYS_OF_DELIVERY).format(dateFormat),
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

export const transformLinesIfDefaultFare = (orderLines: IOrderLine[], fare: IFare): IOrderLine[] => {
  debugger;
  const orderLinesGroupedByProductId = orderLines.reduce((oLinesByIdProduct: any, el: IOrderLine) => {
    // @ts-ignore
    if (!oLinesByIdProduct[el.product_id]) {
      // @ts-ignore
      oLinesByIdProduct[el.product_id] = el;
    } else {
      // @ts-ignore
      oLinesByIdProduct[el.product_id].quantity += el.quantity;
    }

    return oLinesByIdProduct;
  }, {});

  // @ts-ignore
  const newOrderLines: IOrderLine[] = Object.values(orderLinesGroupedByProductId).reduce((acc: any, el: IOrderLine) => {
    // @ts-ignore
    const { quantity, product_id } = el;

    const productFare = fare.fare_lines.find((fLine: IFareLine) => fLine.product_id == product_id);

    // @ts-ignore
    const { price_1, price_2 } = productFare;
    // @ts-ignore
    if (isDefaultFare(fare)) {
      if (quantity && quantity <= 10) {
        // @ts-ignore
        const { to_charge, to_sell } = productFare;
        // @ts-ignore
        let toCharge = Math.floor(quantity / to_charge) * to_charge;
        // @ts-ignore
        const toGift = Math.floor(quantity / to_charge) * to_sell - to_charge;
        if (quantity > to_charge) {
          const difference = quantity - toCharge - toGift;
          if (difference > 0) {
            toCharge += difference;
          }
          acc.push({ ...el, quantity: toCharge, price: price_1 });
          acc.push({ ...el, quantity: toGift, price: 0 });
        } else {
          acc.push({ ...el, quantity, price: price_1 });
        }
      }
      // @ts-ignore
      if (quantity > 10 && quantity <= 20) {
        acc.push({ ...el, quantity, price: price_2 });
      }
    } else {
      acc.push(el);
    }
    return acc;
  }, []);
  return newOrderLines;
};
