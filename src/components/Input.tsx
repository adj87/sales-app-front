import React from 'react';

interface InputProps {
  label: String;
  name: String;
  onChange: Function;
  value: string | number | string[] | undefined;
}

const Input = ({ label, name, value, onChange }: InputProps) => {
  const htmlFor = `input-${name}`;
  return (
    <div>
      <div className="mb-4">
        <label className="block text-primary-dark mb-2" htmlFor={htmlFor}>
          {label}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-light leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Username"
          value={value}
          id={htmlFor}
          onChange={(e) => onChange(e.target.value, e)}
        />
      </div>
    </div>
  );
};

export default Input;
