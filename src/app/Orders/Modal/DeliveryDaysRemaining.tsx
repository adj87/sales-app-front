import React from 'react';
import { useTranslation } from 'react-i18next';
import { dayjsCustom } from '../../../dayjsConfig';

export const DeliveryDaysRemaining = ({ date, deliveryDate }: { date: string | undefined; deliveryDate: string | undefined }) => {
  const { t } = useTranslation();
  const dateDayjs = dayjsCustom(date);
  const deliveryDateDayjs = dayjsCustom(deliveryDate);
  const naturalDays = deliveryDateDayjs.diff(dateDayjs, 'day') + 1;
  // @ts-ignore
  let businnesDays = deliveryDateDayjs.businessDiff(dateDayjs);
  businnesDays = businnesDays > 0 ? businnesDays : '';

  return (
    <div className="-mt-8 flex justify-end">
      <span className="text-primary-light text-right">{`${naturalDays} ${t('commons.days')}`}</span>
      <span className="text-grey-400 text-right ml-2">{` / ${businnesDays} ${t('commons.business-days')}`}</span>
    </div>
  );
};
