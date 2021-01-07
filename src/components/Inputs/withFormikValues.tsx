// @ts-nocheck
import React from 'react';

const withFormikValues = (WrappedComponent) => (props) => {
  const { name, formikValues, errors, ...others } = props;

  return (
    <div>
      <WrappedComponent name={name} value={formikValues[name.toString()]} {...others} />
      <span
        className={`text-danger-dark block visible ${Boolean(errors[name]) ? 'visible' : 'hidden'}`}
        style={{ marginTop: '-12px' }}
      >
        {errors && errors[name]}
      </span>
    </div>
  );
};

export default withFormikValues;
