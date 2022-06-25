import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import "./header-styles.scss";

const Header = (props) => {
  const { isLogged, setLoginOpen } = props;
  return (
    <header className="header-container">
      {/* <Grid container> */}
      <Grid item xs={6}>
        <Link className="header-navLink" to="/">
          Τμήμα Μηχανικών Πληροφορικής και Ηλεκτρονικών Συστημάτων
        </Link>
      </Grid>
      <Grid className="header-nav" item xs={6}>
        <Link className="header-navLink header-navItem " to="publications">
          Δημοσιεύσεις
        </Link>
        {isLogged && (
          <Link className="header-navLink header-navItem " to="account">
            Λογαριασμός
          </Link>
        )}
        <button
          type="button"
          className="header-navLink-login header-navItem "
          onClick={() => {
            setLoginOpen(true);
          }}
        >
          {isLogged ? (
            <>
              <LogoutIcon />
              <span className="header-navLink-loginText">Έξοδος</span>
            </>
          ) : (
            <>
              <LoginIcon />
              <span className="header-navLink-loginText">
                Είσοδος / Εγγραφή
              </span>
            </>
          )}
        </button>
      </Grid>
      {/* </Grid> */}
    </header>
  );
};

export default Header;
