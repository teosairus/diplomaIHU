import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Grid from "@mui/material/Grid";
import Header from "../Header";
import Main from "../Main";
// import Footer from "../Footer";
// import mockData from "../../utils/mockData.json";
import Publications from "../Publications";
import UserProfile from "../UserProfile/UserProfile";
import DeletePubDialog from "../../widgets/DeletePubDialog";
import Login from "../Login";
import LoginLoading from "../LoginLoading/LoginLoading";
import "./app-styles.scss";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [publications, setPublications] = useState([]);
  // const [publications, setPublications] = useState([...mockData]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState([false, null]);
  const [token, setToken] = useState(null);

  const localClientID = "636f85fdff6709336ef378df";
  const localURI = "http://localhost:3000/login";

  const devClientID = "636f86b4c0ec59333bd7e052";
  const devURI = "https://mypubs.iee.ihu.gr/login";

  const clientID =
    process.env.NODE_ENV !== "development" ? devClientID : localClientID;
  const redirectURI =
    process.env.NODE_ENV !== "development" ? devURI : localURI;

  console.log("token", token);
  console.log("islogged", isLogged);

  return (
    <Grid container className="app-container">
      {isLogged && <Header userInfo={userInfo} />}
      <Routes>
        <Route
          path="/publications"
          element={
            <ProtectedRoute token={token}>
              <Publications
                setOpenDeleteDialog={setOpenDeleteDialog}
                publications={publications}
                setPublications={setPublications}
                token={token}
              />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/account"
          element={
            <ProtectedRoute token={token}>
              <UserProfile />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute token={token}>
              <Main userInfo={userInfo} />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <LoginLoading
              clientID={clientID}
              token={token}
              setToken={setToken}
              setIsLogged={setIsLogged}
              setUserInfo={setUserInfo}
            />
          }
        ></Route>
        <Route
          path="/"
          element={<Login clientID={clientID} redirectURI={redirectURI} />}
        ></Route>
      </Routes>

      {/* <Footer /> */}

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
