import React, { useState } from "react";

import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "@material-ui/core";

import { PageHeader } from "../../components";
import EmployeeForm from "./EmployeeForm";
import useTable from "../../uitls/useTable";
import * as EmployeeService from "../../services/employeeService";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

const headCells = [
  { id: "fullName", label: "Employee Name" },
  { id: "email", label: "Email Address (Personal)" },
  { id: "mobile", label: "Mobile Number" },
  { id: "department", label: "Department" },
];

const Employees = () => {
  const classes = useStyles();

  const [records, setRecords] = useState(EmployeeService.getAllEmployees);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingSorting,
  } = useTable(records, headCells);

  console.log(records);

  return (
    <>
      <PageHeader
        icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
        title='New Employee'
        subtitle='Form design with validation'
      />
      <Paper className={classes.pageContent}>
        <EmployeeForm />
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
    </>
  );
};

export default Employees;
