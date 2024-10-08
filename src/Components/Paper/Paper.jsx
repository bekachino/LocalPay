import React from 'react';
import './paper.css';

const Paper = ({style, children}) => {
  return (
    <div className='custom-paper' style={style}>
      {children}
    </div>
  );
};

export default Paper;