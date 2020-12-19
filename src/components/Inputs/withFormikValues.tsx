// @ts-nocheck
import React from 'react';

const withFormikValues = (WrappedComponent) => (props) => {
  const { name, formikValues, ...others } = props;

  return <WrappedComponent name={name} value={formikValues[name.toString()]} {...others} />;
};

export default withFormikValues;
