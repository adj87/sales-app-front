import React from 'react';
import { useTranslation } from 'react-i18next';
import { dayjsCustom, dayjs } from '../../dayjsConfig';

interface InputTextProps {
  label: string;
  name: string;
  onChange: Function;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  value: string | number | undefined;
  type?: 'text' | 'number' | 'password' | 'date';
  step?: string;
}

const dateFormat = process.env.REACT_APP_FORMAT_DATE_BACK;

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
        value={type === 'date' ? dayjsCustom(value).format('YYYY-MM-DD') : value}
        name={name}
        id={htmlFor}
        onClick={onClick}
        onChange={(e) => {
          const getValue = (type: any, value: string) => {
            switch (type) {
              case 'date':
                return dayjs(value).format(dateFormat);
              case 'number':
                return parseFloat(value);
              default:
                return value;
            }
          };
          onChange(e.target.name, getValue(type, e.target.value));
        }}
      />
    </div>
  );
};

export default InputText;
