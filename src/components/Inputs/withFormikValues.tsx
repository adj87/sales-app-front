// @ts-nocheck
import React from 'react';
import LabelError from '../LabelError';

const withFormikValues = (WrappedComponent) => (props) => {
  const { name, formikObject, ...others } = props;
  const { values, errors, submitCount } = formikObject;

  return (
    <div>
      <WrappedComponent name={name} value={values[name.toString()]} {...others} />
      <LabelError className="-mt-3 mb-8" error={submitCount > 0 && errors[name]} />
    </div>
  );
};

export default withFormikValues;
