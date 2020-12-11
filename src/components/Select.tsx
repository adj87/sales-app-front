import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { getOptionLabel, getOptionValue } from 'react-select/src/builtins';

interface SelectComponentProps {
  labelText?: string;
  options: any[];
  optionLabel?: getOptionLabel;
  optionValue?: getOptionValue;
  onChange: Function;
  value?: any;
}

const SelectComponent = ({
  optionLabel,
  optionValue,
  options,
  labelText,
  value,
  onChange,
}: SelectComponentProps) => {
  const { t } = useTranslation();
  optionLabel = optionLabel ?? ((option): any => option.name);
  optionValue = optionValue ?? ((option): any => option.id);
  const valueObject = value ? { [optionLabel(value)]: [optionLabel(value)] } : null;

  return (
    <div className="w-full">
      {labelText && <label className="block text-primary-dark mb-2">{t(labelText)}</label>}
      <Select
        classNamePrefix="react-select"
        options={options}
        getOptionLabel={optionLabel}
        getOptionValue={optionValue}
        onChange={(option: any) => onChange(option)}
        value={value}
      />
    </div>
  );
};

export default SelectComponent;
