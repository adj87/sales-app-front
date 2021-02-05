import React from 'react';
import { useTranslation } from 'react-i18next';
import { dayjsCustom } from '../../../dayjsConfig';

export const DeliveryDaysRemaining = ({ stringDate }: { stringDate: string | undefined }) => {
  const { t } = useTranslation();
  const today = dayjsCustom();
  const date = dayjsCustom(stringDate);
  const naturalDays = date.diff(today, 'day') + 1;
  // @ts-ignore
  let businnesDays = date.businessDiff(today);
  businnesDays = businnesDays > 0 ? businnesDays : '';

  return (
    <div className="-mt-3 flex justify-end">
      <span className="text-primary-light text-right">{`${naturalDays} ${t('commons.days')}`}</span>
      <span className="text-grey-400 text-right ml-2">{` / ${businnesDays} ${t('commons.business-days')}`}</span>
    </div>
  );
};
