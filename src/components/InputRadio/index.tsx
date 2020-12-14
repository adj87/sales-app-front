import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';

interface InputCheckBoxProps {
  label: string;
  checked: boolean;
  name: string;
  onChange: Function;
}

const InputCheckBox = ({ label, checked, name, onChange }: InputCheckBoxProps) => {
  const { t } = useTranslation();

  return (
    <label className="radio-container text-primary-dark">
      {t(label)}
      <input
        type="radio"
        checked={checked}
        onChange={(e) => {
          onChange(e.target.name, e.target.checked);
        }}
        name={name}
      />
      <span className="radio-checkmark border rounded text-primary-light"></span>
    </label>
  );
};

export default InputCheckBox;
