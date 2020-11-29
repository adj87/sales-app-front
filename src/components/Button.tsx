import React, { CSSProperties } from 'react';

interface ButtonProps {
  text: String;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  color: String;
  size?: String;
  className?: String;
  style?: CSSProperties;
}

const Button = ({ text, onClick, color, className, style, size }: ButtonProps) => {
  const cssSize = getCssSize(size);
  return (
    <button
      style={style ?? {}}
      className={`bg-${color}-dark hover:bg-${color}-main text-white font-bold ${cssSize} rounded ${className} capitalize`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const getCssSize = (size: String | undefined) => {
  switch (size) {
    case 'sm':
      return 'py-0 px-6';
    case 'block':
      return 'w-full p-1';
    default:
      return 'py-2 px-6';
  }
};

export default Button;
