import React from "react";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const DatePicker = (props) => {
  const { label, name, value, onChange } = props;

  const convertToDefEventParam = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant='inline'
        inputVariant='outlined'
        format='MMM/dd/yyyy'
        label={label}
        name={name}
        value={value}
        onChange={(date) => onChange(convertToDefEventParam(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
