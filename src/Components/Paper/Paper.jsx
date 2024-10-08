import React from 'react';
import './paper.css';

const Paper = ({className, style, children}) => {
  return (
    <div className={`custom-paper ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Paper;