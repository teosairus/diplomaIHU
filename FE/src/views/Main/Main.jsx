import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./main-styles.scss";
import createUser from "../../httpRequests/createUser";
import login from "../../httpRequests/login";
import TextField from "@mui/material/TextField";

const Main = (props) => {
  const { isUserCreated, setIsUserCreated, token, setToken, clientID } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main className="main-container">
      {isUserCreated === false && (
        <div className="main-register">
          <span>Register As:</span>
          <Button
            className="main-button"
            variant="contained"
            onClick={() =>
              createUser("1").then((res) => {
                console.log("createUser", res);
                if (res.status === 200) {
                  setIsUserCreated(true);
                }
              })
            }
          >
            Antonis Sidiropoulos
          </Button>
          <Button
            className="main-button"
            variant="contained"
            onClick={() =>
              createUser("2").then((res) => {
                console.log("createUser", res);
                if (res.status === 200) {
                  setIsUserCreated(true);
                }
              })
            }
          >
            Stefanos Ougiaroglou
          </Button>
        </div>
      )}
      {isUserCreated && token === null && (
        <div className="main-login">
          <TextField
            label="Username"
            variant="standard"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="standard"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            className="main-button"
            variant="contained"
            onClick={() => {
              const data = {
                username: username,
                password: password,
              };
              login(data).then((res) => {
                console.log("login", res);
                if (res.status === 200) {
                  setToken(res.data.access_token);
                }
              });
            }}
          >
            Login
          </Button>
        </div>
      )}
      {isUserCreated && token !== null && (
        <span>Login was successfull. Token has been acquired</span>
      )}

      <a
        href={`https://login.it.teithe.gr/authorization/?client_id=${clientID}&response_type=code&scope=profile&redirect_uri=http://localhost:3000/home`}
      >
        Login Server Side
      </a>
      <a
        href={`https://login.it.teithe.gr/authorization/?client_id=${clientID}&response_type=code&scope=profile`}
      >
        Login Client Side
      </a>
    </main>
  );
};

export default Main;
