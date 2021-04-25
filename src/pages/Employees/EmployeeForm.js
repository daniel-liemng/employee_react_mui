import React from "react";

import { Grid, makeStyles } from "@material-ui/core";
import { useForm, Form } from "../../uitls/useForm";
import { Controls } from "../../controls/Controls";
import * as employeeService from "../../services/employeeService";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(2),
    },
  },
}));

const initialValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

const genderList = [
  { id: "1", title: "male", label: "Male" },
  { id: "2", title: "female", label: "Female" },
];

const EmployeeForm = () => {
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    let tempErrors = { ...errors };

    if ("fullName" in fieldValues)
      tempErrors.fullName = fieldValues.fullName
        ? ""
        : "This field is required!";

    // if ("email" in fieldValues)
    //   tempErrors.email = fieldValues.email ? "" : "This field is required!";
    if ("email" in fieldValues)
      tempErrors.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is invalid!";
    if ("mobile" in fieldValues)
      tempErrors.mobile =
        fieldValues.mobile.length > 9 ? "" : "Min 10 numbers required!";
    if ("departmentId" in fieldValues)
      tempErrors.departmentId =
        fieldValues.departmentId.length !== 0 ? "" : "This field is required!";

    setErrors({ ...tempErrors });

    if (fieldValues === values) {
      return Object.values(tempErrors).every((x) => x === "");
    }
  };

  // useForm Hook
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // window.alert("OK");
      employeeService.insertEmployee(values);
    }
  };

  // console.log("VVV", values);
  // console.log("EEE", errors);

  return (
    <Form onSubmit={handleSubmit} className={classes.root} autoComplete='off'>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            label='Full Name'
            name='fullName'
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input
            label='Email'
            name='email'
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            label='Mobile'
            name='mobile'
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            label='City'
            name='city'
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            label='Gender'
            name='gender'
            value={values.gender}
            onChange={handleInputChange}
            items={genderList}
          />
          <Controls.Select
            label='Department'
            name='departmentId'
            value={values.departmentId}
            onChange={handleInputChange}
            items={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />
          <Controls.DatePicker
            label='Hire Date'
            name='hireDate'
            value={values.hireDate}
            onChange={handleInputChange}
          />
          <Controls.Checkbox
            label='Permanent Employee'
            name='isPermanent'
            value={values.isPermanent}
            onChange={handleInputChange}
          />

          <div>
            <Controls.Button text='Submit' type='submit' />
            <Controls.Button text='Reset' color='default' onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default EmployeeForm;
