import React from 'react';

interface InputProps {
  label: String;
  name: String;
  value: string | number | readonly string[] | undefined;
}

const Input = ({ label, name, value }: InputProps) => {
  const htmlFor = `input-${name}`;
  return (
    <div>
      <div className="mb-4">
        <label className="block text-blue-dark mb-2" htmlFor={htmlFor}>
          {label}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-light leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Username"
          value={value}
          id={htmlFor}
        />
      </div>
    </div>
  );
};

export default Input;
