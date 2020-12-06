import React, { CSSProperties } from 'react';

interface ButtonProps {
  text: String;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  color: String;
  size?: 'sm' | 'block' | 'md' | undefined;
  outline?: boolean;
  className?: String;
  style?: CSSProperties;
}

const Button = ({ text, onClick, color, className, style, size, outline }: ButtonProps) => {
  const cssSize = getCssSize(size);
  const cssColor = getCssColor(color, outline);
  return (
    <button
      style={style ?? {}}
      className={`${cssColor}  ${cssSize} rounded ${className} capitalize transition-colors duration-500 ease-in-out`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const getCssColor = (color: String | undefined, outline: boolean | undefined) => {
  return outline
    ? `bg-white border-${color}-dark  text-${color}-dark border`
    : `bg-${color}-dark hover:bg-${color}-main text-white font-bold`;
};

const getCssSize = (size: String | undefined) => {
  switch (size) {
    case 'sm':
      return 'py-0 px-6';
    case 'block':
      return 'w-full p-1';
    //md
    default:
      return 'py-2 px-6';
  }
};

export default Button;
