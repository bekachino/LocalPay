import React from 'react';
import './input.css';

const Input = ({
  type = 'text',
  name,
  value,
  onChange,
  disabled,
  placeholder,
  color = 'primary',
  size = 'medium',
}) => {
  return (
    <input
      className={`custom-input custom-input-color-${!['primary', 'secondary', 'success', 'error'].includes(color) ? 'primary' : color} custom-input-size-${!['small', 'medium', 'large'].includes(size) ? 'medium' : size}`}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default Input;