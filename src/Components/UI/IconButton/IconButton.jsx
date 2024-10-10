import React from 'react';
import './iconButton.css';

const IconButton = ({
  color,
  size,
  borderRadius,
  icon,
  loading,
  ...rest
}) => {
  return (
    <button
      className={`icon-button icon-button-${![
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
      ].includes(color) ? 'primary' : color} ${loading && 'icon-button-loading' || ''}`}
      style={{ borderRadius: borderRadius || '6px' }}
      {...rest}
      disabled={loading}
    >
      <img
        src={icon}
        alt='_'
        style={{ width: size || '25px' }}
      />
    </button>
  );
};

export default IconButton;