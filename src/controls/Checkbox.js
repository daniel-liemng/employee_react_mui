import React from "react";

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox as MuiCheckbox,
} from "@material-ui/core";

const Checkbox = (props) => {
  const { label, name, value, onChange } = props;

  const convertToDefEventParam = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl>
      <FormGroup>
        <FormControlLabel
          label={label}
          control={
            <MuiCheckbox
              checked={value}
              name={name}
              onChange={(e) =>
                onChange(convertToDefEventParam(name, e.target.checked))
              }
              color='primary'
            />
          }
        />
      </FormGroup>
    </FormControl>
  );
};

export default Checkbox;
