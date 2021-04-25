import React, { useState } from "react";

import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import SearchIcon from "@material-ui/icons/Search";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";

import { PageHeader } from "../../components";
import EmployeeForm from "./EmployeeForm";
import useTable from "../../uitls/useTable";
import * as EmployeeService from "../../services/employeeService";
import { Controls } from "../../controls/Controls";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
}));

const headCells = [
  { id: "fullName", label: "Employee Name" },
  { id: "email", label: "Email Address (Personal)" },
  { id: "mobile", label: "Mobile Number" },
  { id: "department", label: "Department", disableSorting: true },
];

const Employees = () => {
  const classes = useStyles();

  const [records, setRecords] = useState(EmployeeService.getAllEmployees);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  console.log(records);

  const handleSearch = (e) => {
    let target = e.target;

    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <>
      <PageHeader
        icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
        title='New Employee'
        subtitle='Form design with validation'
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          <Controls.Input
            label='Search Employees'
            className={classes.searchInput}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
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
