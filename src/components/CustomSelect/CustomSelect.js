import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './CustomSelect.scss';

const CustomSelect = ({
  placeholder,
  options,
  onChange,
}) => (
  <Select
    className="custom-select"
    classNamePrefix="custom-select"
    options={options}
    onChange={onChange}
    placeholder={placeholder}
    onFocus={() => console.log('focus')}
  />
);

CustomSelect.defaultProps = {
  placeholder: 'Select',
};

CustomSelect.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(Array).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomSelect;
