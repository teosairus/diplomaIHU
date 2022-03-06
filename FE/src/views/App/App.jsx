import React from "react";
import Grid from "@mui/material/Grid";
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";
import "./app-styles.scss";

const App = () => {
  return (
    <Grid container className="app-container">
      <Header />
      <Main />
      <Footer />
    </Grid>
  );
};

export default App;
