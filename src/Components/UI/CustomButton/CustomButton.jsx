import React from 'react';
import './customButton.css';
import { useNavigate } from 'react-router-dom';

const CustomButton = ({
  type = 'button',
  size = 'medium',
  color = 'primary',
  style,
  className,
  disabled,
  loading,
  onClick,
  icon,
  rounded,
  linkTo,
  children,
  ...rest
}) => {
  const navigate = useNavigate();

  return (
    <button
      type={type}
      className={`${className} custom-btn custom-btn-size-${
        !['small', 'medium', 'large'].includes(size) ? 'medium' : size
      } custom-btn-color-${
        !['primary', 'secondary', 'success', 'warning', 'error'].includes(color)
          ? 'primary'
          : color
      } ${(loading && 'custom-btn-loading') || ''} ${
        (rounded && 'custom-btn-rounded') || ''
      }`}
      style={style}
      disabled={disabled || loading}
      onClick={() => {
        if (onClick) onClick();
        if (linkTo) navigate(linkTo);
      }}
      {...rest}
    >
      {icon && <img src={icon} alt="" />}
      {children}
    </button>
  );
};

export default CustomButton;
