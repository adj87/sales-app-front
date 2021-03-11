import * as Yup from 'yup';
import i18n from '../../i18n';

import { IFareLine, IFare, IFareLineWithCheck } from './duck/types/Fare';
import { positiveNumberValidation, numberOfElementsInArrValidation, numberValidation } from '../../utils';

export const columns = [
  {
    Header: 'Name',
    columns: [
      { Header: i18n.t('fares.table.customer_id'), accessor: 'customer_id' },
      { Header: i18n.t('fares.table.customer_name'), accessor: 'customer_name' },
      { Header: i18n.t('fares.table.product_id'), accessor: 'product_id' },
      { Header: i18n.t('fares.table.product_name'), accessor: 'product_name' },
      { Header: i18n.t('fares.table.price_1'), accessor: 'price_1' },
      { Header: i18n.t('fares.table.price_2'), accessor: 'price_2' },
      { Header: i18n.t('fares.table.price_3'), accessor: 'price_3' },
      { Header: i18n.t('fares.table.price_4'), accessor: 'price_4' },
      { Header: i18n.t('fares.table.to_charge'), accessor: 'to_charge' },
      { Header: i18n.t('fares.table.to_sell'), accessor: 'to_sell' },
    ],
  },
];

export const defaultValues = {
  customer_name: null,
  customer_id: null,
  fare_lines: [],
};

export const defaultValuesFareLine = {
  product_id: null,
  product_name: null,
  customer_id: null,
  customer_name: null,
  price_1: null,
  price_2: 0,
  price_3: 0,
  price_4: 0,
  to_sell: 1,
  to_charge: 1,
};

export const fareLinesToFares = (fareLines: IFareLine[]): IFare[] => {
  return fareLines.reduce((acc: any, el: any, i: number) => {
    const listIds = acc.map((el: any) => el.customer_id);
    const positionInArr = listIds.indexOf(el.customer_id);

    if (positionInArr === -1) {
      const newFare = {
        customer_name: el.customer_name,
        customer_id: el.customer_id,
        fare_lines: [el],
      };
      acc.push(newFare);
    } else {
      let newFares = [...acc[positionInArr].fare_lines];
      newFares.push(el);
      acc[positionInArr] = { ...acc[positionInArr], fare_lines: newFares };
    }
    return acc;
  }, []);
};

export const validationSchemaFare = Yup.object().shape({
  customer_id: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  fare_lines: numberOfElementsInArrValidation().test('any-is-repeated', i18n.t('commons.errors.elements-repeated'), (fareLines: any) => {
    const arrMapped = fareLines.map((el: any) => el.product_id);
    return fareLines.every((el: any, i: any, arr: any) => countInArray(arrMapped, el.product_id) === 1);
  }),
});

// @ts-ignore
export const countInArray = (array, value) => array.reduce((n, x) => n + (x === value), 0);

export const validationSchemaFareLine = Yup.object().shape({
  product_id: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  price_1: positiveNumberValidation.nullable().required(i18n.t('commons.errors.field_required')),
  price_2: numberValidation.nullable().required(i18n.t('commons.errors.field_required')),
});

export const validationSchemaInheritFrom = Yup.object().shape({
  customer_id: Yup.number().nullable().required(i18n.t('commons.errors.field_required')),
  fare_lines: Yup.array().test(
    'is-decimal',
    i18n.t('commons.errors.field_required'),
    // @ts-ignore
    (fareLines: IFareLine[]) =>
      // @ts-ignore
      fareLines.filter((el: IFareLineWithCheck) => el.checked == true).length > 0,
  ),
});
