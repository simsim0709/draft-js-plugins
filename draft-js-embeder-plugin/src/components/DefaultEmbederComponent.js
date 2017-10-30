import React from 'react';
import PropTypes from 'prop-types';

const DefaultEmbederCompoent = ({
  blockProps,
  className = '',
  style,
  theme,
}) => {
  const { html } = blockProps;

  if (html) {
    return (
      <div
        style={style}
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return null;
};

DefaultEmbederCompoent.propTypes = {
  blockProps: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default DefaultEmbederCompoent;
