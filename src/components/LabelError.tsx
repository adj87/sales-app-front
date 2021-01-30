import React from 'react';

interface LabelErrorProps {
  error: string | undefined | any;
  className?: string;
}

const LabelError = ({ error, className }: LabelErrorProps) => {
  return <label className={`text-danger-dark block ${className ?? ''}`}>{error ?? ''}</label>;
};

export default LabelError;
