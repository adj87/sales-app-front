import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';

interface InputCheckBoxProps {
  label: string;
  checked: boolean;
}

const InputCheckBox = ({ label, checked }: InputCheckBoxProps) => {
  const { t } = useTranslation();
  return (
    <label className="label-container text-primary-dark">
      {t(label)}
      <input type="checkbox" checked={checked} />
      <span className="checkmark border rounded text-primary-light"></span>
    </label>
  );
};

export default InputCheckBox;
