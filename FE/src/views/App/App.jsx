import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Header from "../Header";
import Main from "../Main";
// import Footer from "../Footer";
import mockData from "../../utils/mockData.json";
import Publications from "../Publications";
import UserProfile from "../UserProfile/UserProfile";

import "./app-styles.scss";
import LoginDialog from "../../widgets/LoginDialog";
import DeletePubDialog from "../../widgets/DeletePubDialog";
import showUser from "../../httpRequests/showUser";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [publications, setPublications] = useState([]);
  // const [publications, setPublications] = useState([...mockData]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState([false, null]);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (token !== null) {
      showUser(token).then((res) => {
        console.log("userInfo", res);
        if (res.status === 200) {
          setPublications(res.data.userPapers);
        }
      });
    }
  }, [token]);

  return (
    <Grid container className="app-container">
      <Header isLogged={isLogged} setLoginOpen={setLoginOpen} />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              isUserCreated={isUserCreated}
              setIsUserCreated={setIsUserCreated}
              token={token}
              setToken={setToken}
            />
          }
        ></Route>
        <Route
          path="/publications"
          element={
            <Publications
              setOpenDeleteDialog={setOpenDeleteDialog}
              publications={publications}
              setPublications={setPublications}
              token={token}
            />
          }
        ></Route>
        <Route path="/account" element={<UserProfile />}></Route>
      </Routes>

      {/* <Footer /> */}

      <LoginDialog
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
      />
      <DeletePubDialog
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        publications={publications}
        setPublications={setPublications}
      />
    </Grid>
  );
};

export default App;
