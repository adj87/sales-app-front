import React from 'react';

interface LabelAndAmountProps {
  label: string;
  amount: number;
  isTotal?: boolean;
  size?: 'md' | 'lg';
}

const LabelAndAmount = ({ label, amount, isTotal, size }: LabelAndAmountProps) => {
  const classColorString = isTotal ? 'text-primary-dark' : 'text-grey-500';
  size = isTotal ? 'lg' : size;
  const classSizeString = size === 'lg' ? 'text-3xl' : 'text-xl';
  return (
    <div className="flex justify-between w-40">
      <span className={`${classColorString} ${classSizeString} font-light`}>{label}</span>
      <span className={`${classColorString} ${classSizeString} ${isTotal && 'font-bold'}`}>
        {amount}
      </span>
    </div>
  );
};

export default LabelAndAmount;
