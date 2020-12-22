import React from 'react';

interface LabelAndAmountProps {
  label: string;
  amount: number | null;
  isTotal?: boolean;
  size?: 'md' | 'lg';
  isDisabled?: boolean;
}

const LabelAndAmount = ({ label, amount, isTotal, size, isDisabled }: LabelAndAmountProps) => {
  let classColorString = isTotal ? 'text-primary-dark' : 'text-grey-500';
  size = isTotal ? 'lg' : size;
  classColorString = isDisabled ? 'text-grey-200' : classColorString;
  const classSizeString = size === 'lg' ? 'text-3xl' : 'text-xl';
  return (
    <div className="flex justify-between flex-row w-full mt-1">
      <span className={`${classColorString} ${classSizeString} font-light`}>{label}</span>
      <span className={`${classColorString} ${classSizeString} ${isTotal && 'font-bold'}`}>
        {amount}
      </span>
    </div>
  );
};

export default LabelAndAmount;
