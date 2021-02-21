import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { getOptionLabel, getOptionValue } from 'react-select/src/builtins';

interface SelectComponentProps {
  labelText?: string;
  options: any[];
  optionLabel?: getOptionLabel;
  optionValue?: getOptionValue;
  onChange: Function;
  value: string | number | null;
  name?: string;
  isDisabled?: boolean;
  isOptionDisabled?: ((option: any) => boolean) | undefined;
}

const SelectComponent = ({
  optionLabel,
  optionValue,
  options,
  labelText,
  value,
  onChange,
  name,
  isDisabled,
  isOptionDisabled,
}: SelectComponentProps) => {
  const { t } = useTranslation();
  const [optionSelected, setOptionSelected] = useState<any>(null);
  optionLabel = optionLabel ?? ((option): any => option.name);
  optionValue = optionValue ?? ((option): any => option.id);
  useEffect(() => {
    // @ts-ignore
    const optionFound = options.find((opt: any) => optionValue(opt) === value);
    setOptionSelected(optionFound || null);
  }, [options.length, value]);

  return (
    <div className="w-full mb-4">
      {labelText && <label className="block text-primary-dark mb-2">{t(labelText)}</label>}
      <Select
        classNamePrefix="react-select"
        options={options}
        getOptionLabel={optionLabel}
        getOptionValue={optionValue}
        onChange={(option: any) => {
          name ? onChange(name, option) : onChange(option);
        }}
        value={optionSelected}
        isDisabled={isDisabled}
        isOptionDisabled={isOptionDisabled}
      />
    </div>
  );
};

export default SelectComponent;
