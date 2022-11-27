import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserAvatar from "../../widgets/UserAvatar/UserAvatar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";

import "./header-styles.scss";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

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
            <UserAvatar />
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
                sessionStorage.setItem("tkn", "");
                sessionStorage.setItem("user_info", JSON.stringify({}));
                navigate("/");
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
