import React from 'react';

interface ButtonProps {
  text: String;
  onClick: Function;
  color: String;
  className: String;
}

const Button = ({ text, onClick, color, className }: ButtonProps) => {
  return (
    <button
      className={`bg-${color}-dark hover:bg-${color}-main text-white font-bold py-0 px-6 rounded ${className}`}
      onClick={(e) => onClick(e)}
    >
      {text}
    </button>
  );
};

export default Button;
