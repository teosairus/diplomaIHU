import React from "react";
import Grid from "@mui/material/Grid";

import "./header-styles.scss";

const Header = () => {
  return (
    <header className="header-container">
      {/* <Grid container> */}
      <Grid item xs={6}>
        LOGO
      </Grid>
      <Grid className="header-nav" item xs={6}>
        <div className="header-navItem">Nav 1</div>
        <div className="header-navItem">Nav 2</div>
        <div className="header-navItem">Nav 3</div>
        <div className="header-navItem">Nav 4</div>
      </Grid>
      {/* </Grid> */}
    </header>
  );
};

export default Header;
