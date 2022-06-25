import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

import "./loginDialog-styles.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoginDialog = (props) => {
  const { loginOpen, setLoginOpen, isLogged, setIsLogged } = props;
  const [tab, setTab] = React.useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    orcid: "",
    scorusID: "",
    location: "",
  });
  const [isError, setIsError] = useState({});

  //   console.log("registerData", registerData);
  //   console.log("isError", isError);

  const validateRegister = () => {
    let tempError = { ...isError };
    for (let i = 0; i < Object.keys(registerData).length; i += 1) {
      if (
        (Object.keys(registerData)[i] === "firstname" ||
          Object.keys(registerData)[i] === "lastname" ||
          Object.keys(registerData)[i] === "email" ||
          Object.keys(registerData)[i] === "password") &&
        Object.values(registerData)[i].length === 0
      ) {
        tempError[`${Object.keys(registerData)[i]}`] = true;
        setIsError({ ...tempError });
      }
    }
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`login-tabpanel-${index}`}
        aria-labelledby={`login-tab-${index}`}
        {...other}
      >
        {value === index && <div>{children}</div>}
      </div>
    );
  };

  return (
    <Dialog
      open={loginOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setLoginOpen(false)}
      aria-describedby="login-dialog-slide-description"
      classes={{ paper: "loginDialog-container" }}
    >
      <DialogTitle>{isLogged ? "Έξοδος" : "Είσοδος"}</DialogTitle>
      <DialogContent>
        {isLogged ? (
          <DialogContentText>
            Είστε σίγουροι οτί θέλετε να εξέλθετε;
          </DialogContentText>
        ) : (
          <>
            <Tabs
              value={tab}
              onChange={(event, newValue) => {
                setTab(newValue);
              }}
              aria-label="login tabs "
              centered
            >
              <Tab label="Είσοδος Χρήστη" />
              <Tab label="Εγγραφή Χρήστη" />
            </Tabs>

            <TabPanel value={tab} index={0}>
              <LoginForm
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
              />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <RegisterForm
                registerData={registerData}
                setRegisterData={setRegisterData}
                isError={isError}
                setIsError={setIsError}
              />
            </TabPanel>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setLoginOpen(false)}>Ακύρωση</Button>
        {tab === 0 ? (
          <Button
            disabled={
              !isLogged && (username.length === 0 || password.length === 0)
            }
            onClick={() => {
              setLoginOpen(false);
              if (isLogged) {
                setIsLogged(false);
              } else {
                setIsLogged(true);
                setUsername("");
                setPassword("");
                setRegisterData({
                  firstname: "",
                  lastname: "",
                  email: "",
                  password: "",
                  orcid: "",
                  scorusID: "",
                  location: "",
                });
              }
            }}
          >
            {isLogged ? "Έξοδος" : "Είσοδος"}
          </Button>
        ) : (
          <Button
            disabled={
              Object.values(isError).filter((item) => item === true).length > 0
            }
            onClick={() => {
              //   setLoginOpen(false);
              validateRegister();
            }}
          >
            Εγγραφή
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
