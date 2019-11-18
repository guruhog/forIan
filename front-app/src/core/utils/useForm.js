import { useState } from 'react';

export const useForm = initialValues => {
  const [inputValues, setInputValue] = useState(initialValues);
  const [error, setError] = useState(false);

  const handleInputChange = event => {
    setInputValue({
      ...inputValues,
      [event.target.name]: event.target.value
    });
  };

  const handleDropDownChange = (_, event) => {
    setInputValue({
      ...inputValues,
      [event.name]: event.value
    });
  };

  const handleDatePickerChange = (name, value) => {
    const formatedValue = value === null ? '' : value;

    setInputValue({
      ...inputValues,
      [name]: formatedValue
    });
  };

  return {
    inputValues,
    handleInputChange,
    handleDropDownChange,
    handleDatePickerChange,
    error,
    setError
  };
};
