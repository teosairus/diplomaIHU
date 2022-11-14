import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserAvatar from "../../widgets/UserAvatar/UserAvatar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";

import "./header-styles.scss";

const Header = (props) => {
  const { userInfo, setToken, setIsLogged } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <header className="header-container">
      <Grid item xs={6}>
        <Link className="header-navLink" to="/home">
          Department of Information Technology and Electronic Systems
          Engineering
        </Link>
      </Grid>
      <Grid className="header-nav" item xs={6}>
        <Link className="header-navLink header-navItem " to="publications">
          My Publications
        </Link>

        <Link className="header-navLink header-navItem " to="account">
          My Account
        </Link>

        <div className="header-navLink header-navItem ">
          <button
            className="header-userButton"
            type="button"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
          >
            <UserAvatar userInfo={userInfo} />
            <ArrowDropDownIcon />
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
              setAnchorEl(null);
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                setToken(null);
                setIsLogged(null);
              }}
            >
              <LogoutIcon />
              <span className="header-logout">Logout</span>
            </MenuItem>
          </Menu>
        </div>
      </Grid>
    </header>
  );
};

export default Header;
