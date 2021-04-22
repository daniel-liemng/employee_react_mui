import React from "react";

import { ThemeProvider, makeStyles, CssBaseline } from "@material-ui/core";

import { SideMenu, Header } from "./components";

import { theme } from "./theme";
import Employees from "./pages/Employees/Employees";

const useStyles = makeStyles((theme) => ({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SideMenu />
      <div className={classes.appMain}>
        <Header />

        <Employees />
      </div>
    </ThemeProvider>
  );
};

export default App;
