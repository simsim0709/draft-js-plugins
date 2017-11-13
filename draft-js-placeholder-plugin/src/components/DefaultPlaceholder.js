import React from 'react';

const Placeholder = props => {
  return (
    <div style={{ color: 'rgba(0, 0, 0, 0.3)' }}>
      {props.blockProps.placeholder}
    </div>
  );
};

export default Placeholder;
