import React from 'react';
import './customButton.css';

const CustomButton = ({
  type = 'button',
  size = 'medium',
  color = 'primary',
  style,
  disabled,
  loading,
  onClick,
  icon,
  children,
}) => {
  return (
    <button
      type={type}
      className={`custom-btn custom-btn-size-${![
        'small',
        'medium',
        'large'
      ].includes(size) ? 'medium' : size} custom-btn-color-${![
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
      ].includes(color) ? 'primary' : color} ${(loading && 'custom-btn-loading') || ''}`}
      style={style}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {icon && <img
        src={icon}
        alt=''
      />}
      {children}
    </button>
  );
};

export default CustomButton;