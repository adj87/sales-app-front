import * as Yup from 'yup';
import { IFare } from './app/Fares/duck/types/Fare';
import i18n from './i18n';

const DEFAULT_FARE = process.env.REACT_APP_BACK_DEFAULT_FARE;

interface UnknownObject {
  [key: string]: Array<String>;
}

export const getColumnsTablesConfig = (): UnknownObject => {
  const columnsTableConfigString = localStorage.getItem('columnsTableConfig');
  return columnsTableConfigString ? JSON.parse(columnsTableConfigString) : {};
};

export const getColumnsHiddenInTable = (tableName: String): Array<String> => {
  return getColumnsTablesConfig()[tableName.toString()] ?? [];
};

export const setColumnToHiddenOrShownInTable = (tableName: String, columnToShowOrHide: String) => {
  let columnsHiddenInTable = getColumnsHiddenInTable(tableName);

  const columnPositionInArray = columnsHiddenInTable.indexOf(columnToShowOrHide);
  const isColumnAlreadyHidden = columnPositionInArray > -1;
  if (isColumnAlreadyHidden) {
    columnsHiddenInTable.splice(columnPositionInArray, 1);
  } else {
    columnsHiddenInTable.push(columnToShowOrHide);
  }
  const newColumnsTableConfig = {
    ...getColumnsTablesConfig(),
    [tableName.toString()]: columnsHiddenInTable,
  };
  return localStorage.setItem('columnsTableConfig', JSON.stringify(newColumnsTableConfig));
};

export const roundToTwoDec = (number: number | null) => number && Math.round(number * 100) / 100;

export const numberValidation = Yup.number()
  .nullable()
  .transform((value) => (isNaN(value) ? null : value));

export const numberOfElementsInArrValidation = (min: number = 0) =>
  Yup.array().test(
    'is-decimal',
    i18n.t('commons.errors.field_required'),
    // @ts-ignore
    (elements: any[]) => elements.length > min,
  );

export const positiveNumberValidation = numberValidation.moreThan(0, ' must be positive');
export const reasonablePriceValidation = positiveNumberValidation.lessThan(5, 'must be reasonable');

export const isDefaultFare = (fare: IFare | null) => {
  // @ts-ignore
  return fare && fare?.customer_id === parseInt(DEFAULT_FARE);
};
