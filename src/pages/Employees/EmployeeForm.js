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

  // useForm Hook
  const { values, setValues, handleInputChange } = useForm(initialValues);

  console.log(values);

  return (
    <Form className={classes.root} autoComplete='off'>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            label='Full Name'
            name='fullName'
            value={values.fullName}
            onChange={handleInputChange}
          />
          <Controls.Input
            label='Email'
            name='email'
            value={values.email}
            onChange={handleInputChange}
          />
          <Controls.Input
            label='Mobile'
            name='mobile'
            value={values.mobile}
            onChange={handleInputChange}
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
            <Controls.Button text='Reset' color='default' />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default EmployeeForm;
