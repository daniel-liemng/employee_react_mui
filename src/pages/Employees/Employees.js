import React, { useState } from "react";

import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";

import { PageHeader, Popup } from "../../components";
import EmployeeForm from "./EmployeeForm";
import useTable from "../../uitls/useTable";
import * as EmployeeService from "../../services/employeeService";
import { Controls } from "../../controls/Controls";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../controls/Notification";
import ConfirmDialog from "../../controls/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "fullName", label: "Employee Name" },
  { id: "email", label: "Email Address (Personal)" },
  { id: "mobile", label: "Mobile Number" },
  { id: "department", label: "Department" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Employees = () => {
  const classes = useStyles();

  const [records, setRecords] = useState(EmployeeService.getAllEmployees);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
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

  const addOrEditEmployee = (employee, resetForm) => {
    // Check insert if id = 0
    if (employee.id === 0) {
      // Insert, then reset form, then close popup, then get new updated records to list
      EmployeeService.insertEmployee(employee);
    } else {
      // Update
      EmployeeService.updateEmployee(employee);
    }

    // Then reset form, then reset recordForEdit,then close popup, then get new updated records to list
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(EmployeeService.getAllEmployees);

    // Then show Notification
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    // Close confirm dialog
    setConfirmDialog({ ...confirmDialog, isOpen: false });

    EmployeeService.deleteEmployee(id);

    // Delete, then update list
    setRecords(EmployeeService.getAllEmployees);

    // Notify
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
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
          <Controls.Button
            text='Add New'
            variant='outlined'
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
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
                <TableCell>
                  <Controls.ActionButton color='primary'>
                    <EditOutlinedIcon
                      fontSize='small'
                      onClick={() => openInPopup(item)}
                    />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color='secondary'
                    onClick={() => {
                      /* onDelete(item.id); */
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete this employee? ",
                        subTitle: "You can't undo this operation.",
                        onConfirm: () => onDelete(item.id),
                      });
                    }}
                  >
                    <CloseIcon fontSize='small' />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title='Employee Form'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm
          recordForEdit={recordForEdit}
          addOrEditEmployee={addOrEditEmployee}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default Employees;
