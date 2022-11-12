import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
// import LoginIcon from "@mui/icons-material/Login";
// import LogoutIcon from "@mui/icons-material/Logout";

import "./header-styles.scss";

const Header = (props) => {
  const { userInfo } = props;
  return (
    <header className="header-container">
      <Grid item xs={6}>
        <Link className="header-navLink" to="/home">
          Τμήμα Μηχανικών Πληροφορικής και Ηλεκτρονικών Συστημάτων
        </Link>
      </Grid>
      <Grid className="header-nav" item xs={6}>
        <Link className="header-navLink header-navItem " to="publications">
          Οι Δημοσιεύσεις μου
        </Link>

        <Link className="header-navLink header-navItem " to="account">
          Λογαριασμός
        </Link>
      </Grid>
    </header>
  );
};

export default Header;
