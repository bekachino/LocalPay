import React from 'react';
import { useNavigate } from "react-router-dom";
import './iconButton.css';

const IconButton = ({
  color,
  size,
  borderRadius,
  icon,
  loading,
  linkTo,
  onClick,
  style,
  ...rest
}) => {
  const navigate = useNavigate();

  return (
    <button
      className={`icon-button icon-button-${![
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
      ].includes(color) ? 'primary' : color} ${(loading && 'icon-button-loading') || ''}`}
      style={{ borderRadius: borderRadius || '6px', ...style, }}
      {...rest}
      disabled={loading}
      onClick={() => {
        if (onClick) onClick();
        if (linkTo) navigate(linkTo);
      }}
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