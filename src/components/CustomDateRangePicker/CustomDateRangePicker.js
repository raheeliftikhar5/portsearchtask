import React from 'react';
import PropTypes from 'prop-types';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import './CustomDateRangePicker.scss';

const CustomDateRangePicker = ({
  value,
  onChange,
  minDate,
  maxDate,
}) => (
  <DateRangePicker
    format="y-MM-dd"
    dayPlaceholder="DD"
    monthPlaceholder="MM"
    yearPlaceholder="YYYY"
    value={value}
    onChange={onChange}
    minDate={minDate}
    maxDate={maxDate}
    clearIcon={null}
    rangeDivider=" → "
  />
);

CustomDateRangePicker.defaultProps = {
  minDate: null,
  maxDate: null,
};

CustomDateRangePicker.propTypes = {
  value: PropTypes.arrayOf(Array).isRequired,
  onChange: PropTypes.func.isRequired,
  minDate: PropTypes.objectOf(Date),
  maxDate: PropTypes.objectOf(Date),
};

export default CustomDateRangePicker;
