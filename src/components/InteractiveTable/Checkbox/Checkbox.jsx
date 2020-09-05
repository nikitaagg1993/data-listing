/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  checked,
  name,
  onClick,
}) => (
  <input
    type="checkbox"
    onClick={onClick}
    name={name}
    aria-label={name}
    checked={checked}
    onChange={() => null}
  />
);

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
};

Checkbox.defaultProps = {
  checked: false,
  onClick: null,
};

export default Checkbox;
