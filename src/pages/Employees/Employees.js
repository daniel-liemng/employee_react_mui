import React from "react";

import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";

import { PageHeader } from "../../components";
import EmployeeForm from "./EmployeeForm";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

const Employees = () => {
  const classes = useStyles();

  return (
    <>
      <PageHeader
        icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
        title='New Employee'
        subtitle='Form design with validation'
      />
      <Paper className={classes.pageContent}>
        <EmployeeForm />
      </Paper>
    </>
  );
};

export default Employees;
