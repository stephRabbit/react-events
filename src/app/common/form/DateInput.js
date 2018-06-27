import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ autoComplete, input: { value, onChange, ...inputProps }, placeholder, width, meta: { touched, error }, ...props }) => {
  return (
    <Form.Field
      error={touched && !!error}
      width={width}
    >
      <DatePicker
        {...props}
        {...inputProps}
        autoComplete={autoComplete}
        onChange={onChange}
        placeholderText={placeholder}
        selected={value ? moment(value) : null}
      />
      {touched && error && <Label basic color="red">{error}</Label>}
    </Form.Field>
  );
};

export default DateInput;
