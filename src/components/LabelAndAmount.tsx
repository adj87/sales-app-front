import React from 'react';

interface LabelAndAmountProps {
  label: string;
  amount: string;
  isTotal?: boolean;
  size?: 'md' | 'lg';
  isDisabled?: boolean;
}

const LabelAndAmount = ({ label, amount, isTotal, size, isDisabled }: LabelAndAmountProps) => {
  let classColorString = isTotal ? 'text-primary-dark' : 'text-grey-700';
  size = isTotal ? 'lg' : size;
  classColorString = isDisabled ? 'text-grey-400' : classColorString;
  const classSizeString = size === 'lg' ? 'text-3xl' : 'text-xl';
  return (
    <div className={`flex justify-between flex-row w-full mt-1 ${isTotal && 'border-t border-primary-dark mt-5'}`}>
      <span className={`${classColorString} ${classSizeString}  font-bold`}>{label}</span>
      <span className={`${classColorString} ${classSizeString} font-bold`}>{amount}</span>
    </div>
  );
};

export default LabelAndAmount;
