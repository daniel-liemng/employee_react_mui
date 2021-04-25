import React, { useState } from "react";

import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  TablePagination,
  TableSortLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "&  thead th": {
      fontWeight: "700",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "400",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

const useTable = (records, headCells, filterFn) => {
  const classes = useStyles();

  // Paging
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  // Sorting
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TblContainer = (props) => (
    <Table className={classes.table}>{props.children}</Table>
  );

  const TblHead = (props) => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";

      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => handleSortRequest(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  // PAGING
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const TblPagination = () => (
    <TablePagination
      component='div'
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    ></TablePagination>
  );

  // SORTING
  const stableSort = (arr, comparator) => {
    const stabilizedThis = arr.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);

      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  // slice(start, end) -> start: page * RPP, end: (page + 1) * RPP
  const recordsAfterPagingAndSorting = () => {
    //// FOR PAGING & SORTING
    // return stableSort(records, getComparator(order, orderBy)).slice(
    //   page * rowsPerPage,
    //   (page + 1) * rowsPerPage
    // );

    //// FOR PAGING & SORTING & FILTERING
    return stableSort(
      filterFn.fn(records),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  };
};

export default useTable;
