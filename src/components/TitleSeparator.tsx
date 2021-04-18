import React from 'react';
import { useTranslation } from 'react-i18next';

interface TitleSeparatorProps {
  title: string;
}

export const TitleSeparator = ({ title }: TitleSeparatorProps) => {
  const { t } = useTranslation();
  return <h1 className="text-2xl text-primary-dark font-bold mb-8 mt-2 pb-2 ">{t(title)}</h1>;
};
//border-b  border-grey-200
