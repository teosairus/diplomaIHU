import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import getToken from "../../httpRequests/getToken";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [publications, setPublications] = useState([]);
  // const [publications, setPublications] = useState([...mockData]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState([false, null]);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [token, setToken] = useState(null);

  const location = useLocation();

  console.log("location", location);
  console.log(location.search.match(/([\d]+)/g));

  const localClientID = "634c1573cde1bd030ac707fb";
  const localSecret = "5dy480der1p0fxouhy3xdgrzmeprgnfa3fb1rt3cegq6mirt4u";

  const devClientID = "634c11d26039ab03189c8b59";
  const devSecret = "3uj7cr6iol1z2jpk433fa3dcx2del67m1i8ma6x5uzirjsf9rd";

  const env = "dev";

  const clientID = env === "dev" ? devClientID : localClientID;
  const secretID = env === "dev" ? devSecret : localSecret;

  useEffect(() => {
    if (location.search.includes("code")) {
      const tempCode = location.search.match(/([\d]+)/g);
      getToken(tempCode, clientID, secretID).then((res) => {
        console.log("TOKEN RES", res);
      });
    }
  }, [location]);

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
              clientID={clientID}
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
