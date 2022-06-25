import React from "react";
import TextField from "@mui/material/TextField";
import "./loginForm-styles.scss";

const LoginForm = (props) => {
  const { username, setUsername, password, setPassword } = props;

  return (
    <div className="loginForm-container">
      <TextField
        className="loginForm-textfield"
        required
        label="Όνομα Χρήστης"
        variant="standard"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        className="loginForm-textfield"
        required
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="standard"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
    </div>
  );
};

export default LoginForm;
