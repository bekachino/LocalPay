import React from 'react';
import './input.css';

const Input = ({
  name,
  datalist = [],
  color = 'primary',
  size = 'medium',
  className,
  ...rest
}) => {
  return (
    <>
      <input
        name={name}
        list={`${name}-input`}
        className={`${className} custom-input custom-input-color-${
          ![
            'primary',
            'secondary',
            'success',
            'error',
          ].includes(color)
            ? 'primary'
            : color
        } custom-input-size-${
          ![
            'small',
            'medium',
            'large',
          ].includes(size) ? 'medium' : size
        }`}
        {...rest}
      />
      {
        !!datalist.length &&
        <datalist id={`${name}-input`}>
          {datalist.map((option, i) => (
            <option value={option || ''} key={i}>{option}</option>
          ))}
        </datalist>
      }
    </>
  );
};

export default Input;
