import React from 'react';
import { useTranslation } from 'react-i18next';

interface InputProps {
  label: string;
  name: string;
  onChange: Function;
  value: string | number | string[] | undefined;
}

const Input = ({ label, name, value, onChange }: InputProps) => {
  const { t } = useTranslation();
  const htmlFor = `input-${name}`;
  return (
    <div className="mb-4 w-full">
      <label className="block text-primary-dark mb-2" htmlFor={htmlFor}>
        {t(label)}
      </label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-grey-400 border-primary-light leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Username"
        value={value}
        id={htmlFor}
        onChange={(e) => onChange(e.target.value, e)}
      />
    </div>
  );
};

export default Input;
