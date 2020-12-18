import React from 'react';
import './style.css';
import { useTranslation } from 'react-i18next';
import Label from '../../Label';

interface Option {
  label: string;
  value: string | number;
}

interface InputCheckBoxProps {
  label: string;
  value: string;
  name: string;
  onChange: Function;
  options: Option[];
}

const InputCheckBox = ({ label, value, name, onChange, options }: InputCheckBoxProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <Label>{label}</Label>
      <div className="mt-2 flex">
        {options.map((option: Option) => {
          return (
            <label className="radio-container text-primary-dark mr-5">
              {t(option.label)}
              <input
                type="radio"
                checked={option.value === value}
                onChange={(e) => {
                  onChange(e.target.name, e.target.value);
                }}
                name={name}
                value={option.value}
              />
              <span className="radio-checkmark border rounded text-primary-light"></span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default InputCheckBox;
