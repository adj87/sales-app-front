import React from 'react';
import { useTranslation } from 'react-i18next';

interface InputTextProps {
  label: string;
  name: string;
  onChange: Function;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  value: string | number | undefined;
  type?: 'text' | 'number' | 'password' | 'date';
  step?: string;
}

const InputText = ({ label, name, value, onChange, onClick, type, step }: InputTextProps) => {
  const { t } = useTranslation();
  const htmlFor = `input-${name}`;
  return (
    <div className="mb-4 w-full">
      <label className="block text-primary-dark mb-2" htmlFor={htmlFor}>
        {t(label)}
      </label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-grey-400 border-primary-light leading-tight focus:outline-none focus:shadow-outline"
        type={type ? type : 'text'}
        value={value}
        name={name}
        id={htmlFor}
        onClick={onClick}
        onChange={(e) => {
          let finalValue = type === 'number' ? parseInt(e.target.value) : e.target.value;
          if (step) finalValue = parseFloat(e.target.value);
          onChange(e.target.name, finalValue);
        }}
        step={step ?? 1}
      />
    </div>
  );
};

export default InputText;
