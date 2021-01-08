import React from 'react';

interface LabelErrorProps {
  error: string | undefined | any;
  style?: React.CSSProperties;
}

const LabelError = ({ error, style }: LabelErrorProps) => {
  return <label className={`text-danger-dark block`}>{error ?? ''}</label>;
};

export default LabelError;
