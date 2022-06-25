import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";
import Publications from "../Publications";
import UserProfile from "../UserProfile/UserProfile";

import "./app-styles.scss";
import LoginDialog from "../../widgets/LoginDialog";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <Grid container className="app-container">
      <Header isLogged={isLogged} setLoginOpen={setLoginOpen} />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/publications" element={<Publications />}></Route>
        <Route path="/account" element={<UserProfile />}></Route>
      </Routes>

      <Footer />

      <LoginDialog
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
      />
    </Grid>
  );
};

export default App;
