import React from "react";
import logo from "../../assets/logo.png";
// import React, { useState } from "react";

import "./login-styles.scss";

const Login = (props) => {
  const { clientID, redirectURI } = props;

  return (
    <div className="login-container">
      <div className="login-box-container">
        <div className="login-box-title-container">
          <img className="login-box-logo" src={logo} alt="ihu-logo" />
          <span className="login-box-title">My Publications</span>
        </div>

        <div className="login-box-description-container">
          <span className="login-box-decription">
            Welcome to My publications webpage for IHU organization. Here you
            can gather all your publications in a semi-automatic way.
          </span>
        </div>
        <a
          className="login-box-button"
          href={`https://login.it.teithe.gr/authorization/?client_id=${clientID}&response_type=code&scope=profile&redirect_uri=${redirectURI}`}
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Login;
