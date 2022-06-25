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

import "./loginDialog-styles.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoginDialog = (props) => {
  const { loginOpen, setLoginOpen, isLogged, setIsLogged } = props;
  const [tab, setTab] = React.useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
              Item Two
            </TabPanel>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setLoginOpen(false)}>Ακύρωση</Button>
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
            }
          }}
        >
          {isLogged ? "Έξοδος" : "Είσοδος"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
