import React, { useEffect, useState, useMemo } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { getOptionLabel, getOptionValue } from 'react-select/src/builtins';

interface SelectComponentProps {
  labelText?: string;
  options: any[];
  optionLabel?: getOptionLabel;
  optionValue?: getOptionValue;
  onChange: Function;
  value: string | number | null | any[];
  name?: string;
  isDisabled?: boolean;
  isOptionDisabled?: ((option: any) => boolean) | undefined;
  isMulti?: boolean;
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
  isMulti,
}: SelectComponentProps) => {
  const { t } = useTranslation();
  optionLabel = optionLabel ?? ((option): any => option.name);
  optionValue = optionValue ?? ((option): any => option.id);
  console.log(value);

  // @ts-ignore
  const optionSelected = useMemo(() => options.find((opt: any) => optionValue(opt) === value), [options.length, value]);

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
        isMulti={isMulti ?? false}
        value={value?.constructor === Array ? value : optionSelected}
        isDisabled={isDisabled}
        isOptionDisabled={isOptionDisabled}
        menuPortalTarget={document.body}
      />
    </div>
  );
};

export default SelectComponent;
