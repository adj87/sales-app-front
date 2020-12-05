import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface LabelProps {
  color?: 'primary' | 'secondary';
  children: string;
}

const Label = ({ color, children }: LabelProps) => {
  const { t } = useTranslation();
  const className =
    color === 'primary' || color === undefined ? 'text-primary-dark' : 'text-secondary-dark';
  return <label className={className}>{t(children)}</label>;
};

export default Label;
