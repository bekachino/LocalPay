import React from 'react';
import './customButton.css';

const CustomButton = ({
  type = 'button',
  size = 'medium',
  variant = 'primary',
  style,
  disabled,
  loading,
  onClick,
  children
}) => {
  return (
    <button
      type={type}
      className={`custom-btn custom-btn-size-${size} custom-btn-variant-${variant} ${loading && 'custom-btn-loading' || ''}`}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;