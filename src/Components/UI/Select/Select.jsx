import React from 'react';

const Select = ({ color = 'primary', size = 'medium', className, ...rest }) => {
  return (
    <select
      className={`${className} custom-input custom-input-color-${
        !['primary', 'secondary', 'success', 'error'].includes(color)
          ? 'primary'
          : color
      } custom-input-size-${
        !['small', 'medium', 'large'].includes(size) ? 'medium' : size
      }`}
      {...rest}
    />
  );
};

export default Select;
