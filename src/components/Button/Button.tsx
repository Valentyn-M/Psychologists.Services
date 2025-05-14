import React from 'react';
import clsx from 'clsx';
import s from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  outline?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ disabled, outline, children, ...rest }) => {
  return (
    <button type="button" {...rest} className={clsx(s.button, disabled && s.disabled, outline && s.outline)}>
      {children}
    </button>
  );
};

export default Button;
