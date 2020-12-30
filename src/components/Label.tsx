import React, { ReactNode, CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

interface LabelProps {
  color?: 'primary' | 'secondary';
  children: string;
  style?:CSSProperties 
}

const Label = ({ color, children,style }: LabelProps) => {
  const { t } = useTranslation();
  const className =
    color === 'primary' || color === undefined ? 'text-primary-dark' : 'text-secondary-dark';
  return <label className={className} style={style}>{t(children)}</label>
};

export default Label;
