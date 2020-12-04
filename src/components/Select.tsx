import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { getOptionLabel, getOptionValue } from 'react-select/src/builtins';

interface SelectComponentProps {
  labelText?: string;
  options: any[];
  label?: getOptionLabel;
  value?: getOptionValue;
}

const SelectComponent = ({ label, options, labelText, value }: SelectComponentProps) => {
  const { t } = useTranslation();
  return (
    <div>
      {labelText && <label className="block text-primary-dark mb-2">{t(labelText)}</label>}
      <Select
        options={options}
        getOptionLabel={label ? label : (option): any => option.name}
        getOptionValue={value ? value : (option): any => option.id}
      />
    </div>
  );
};

export default SelectComponent;
