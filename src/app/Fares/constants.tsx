import * as Yup from 'yup';
import i18 from 'i18next';

import { IFareLine, IFare } from './duck/types/Fare';
import { reasonablePriceValidation } from '../../utils';

export const columns = [
  {
    Header: 'Name',
    columns: [
      { Header: 'customer_id', accessor: 'customer_id' },
      { Header: 'customer_name', accessor: 'customer_name' },
      { Header: 'product_name', accessor: 'product_name' },
      { Header: 'price_1', accessor: 'price_1' },
      { Header: 'price_2', accessor: 'price_2' },
      { Header: 'price_3', accessor: 'price_3' },
      { Header: 'price_4', accessor: 'price_4' },
      { Header: 'product_id', accessor: 'product_id' },
      { Header: 'to_charge', accessor: 'to_charge' },
      { Header: 'to_sell', accessor: 'to_sell' },
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
  price_2: null,
  price_3: null,
  price_4: null,
  to_sell: null,
  to_charge: null,
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
  customer_id: Yup.number().nullable().required(i18.t('commons.errors.field_required')),
  fare_lines: Yup.array().test(
    'is-decimal',
    i18.t('commons.errors.field_required'),
    // @ts-ignore
    (fareLines: IFareLine) => fareLines.length > 0,
  ),
});

export const validationSchemaFareLine = Yup.object().shape({
  product_id: Yup.number().nullable().required(i18.t('commons.errors.field_required')),
  price_1: reasonablePriceValidation.required(i18.t('commons.errors.field_required')),
  price_2: reasonablePriceValidation,
});
