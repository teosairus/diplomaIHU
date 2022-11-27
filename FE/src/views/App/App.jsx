import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Grid from "@mui/material/Grid";
import Header from "../Header";
import Main from "../Main";
import Publications from "../Publications";
import UserProfile from "../UserProfile/UserProfile";
import DeletePubDialog from "../../widgets/DeletePubDialog";
import Login from "../Login";
import LoginLoading from "../LoginLoading/LoginLoading";
import "./app-styles.scss";

const App = () => {
  const [publications, setPublications] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState([false, null]);
  const location = useLocation();

  const localClientID = "636f85fdff6709336ef378df";
  const localURI = "http://localhost:3000/login";

  const devClientID = "636f86b4c0ec59333bd7e052";
  const devURI = "https://mypubs.iee.ihu.gr/login";

  const clientID =
    process.env.NODE_ENV !== "development" ? devClientID : localClientID;
  const redirectURI =
    process.env.NODE_ENV !== "development" ? devURI : localURI;

  return (
    <Grid container className="app-container">
      {location.pathname !== "/" && location.pathname !== "/login" && (
        <Header />
      )}
      <Routes>
        <Route
          path="/publications"
          element={
            <ProtectedRoute>
              <Publications
                setOpenDeleteDialog={setOpenDeleteDialog}
                publications={publications}
                setPublications={setPublications}
              />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={<LoginLoading clientID={clientID} />}
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
