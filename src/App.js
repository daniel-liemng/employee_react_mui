import React from "react";

import { ThemeProvider, makeStyles, CssBaseline } from "@material-ui/core";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";

import { SideMenu, Header, PageHeader } from "./components";

import { theme } from "./theme";

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
        <PageHeader
          icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
          title='Page title'
          subtitle='description'
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
