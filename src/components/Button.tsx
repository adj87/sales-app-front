import React from 'react';

interface ButtonProps {
  text: String;
  onClick: Function;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      onClick={(e) => onClick(e)}
    >
      {text}
    </button>
  );
};

export default Button;
