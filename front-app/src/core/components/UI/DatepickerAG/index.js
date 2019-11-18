import React from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import PropTypes from 'prop-types';

function DatepickerAG({ label, required, name, onChange, error, value }) {
  const options = JSON.stringify(value) !== 'null' ? { selected: value } : {};

  return (
    <SemanticDatepicker
      label={label}
      onDateChange={value => onChange(name, value)}
      required={required}
      error={error}
      clearable={false}
      format="YYYY-MM-DD"
      {...options}
    />
  );
}

DatepickerAG.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  value: PropTypes.any
};

export default React.memo(DatepickerAG);
