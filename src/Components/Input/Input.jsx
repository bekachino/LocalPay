import React from 'react';
import './input.css';

const Input = ({
  color = 'primary',
  size = 'medium',
  className,
  ...rest
}) => {
  return (
    <input
      className={`${className} custom-input custom-input-color-${![
        'primary',
        'secondary',
        'success',
        'error'
      ].includes(color) ? 'primary' : color} custom-input-size-${![
        'small',
        'medium',
        'large'
      ].includes(size) ? 'medium' : size}`}
      {...rest}
    />
  );
};

export default Input;