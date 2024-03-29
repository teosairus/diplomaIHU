import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Grid from "@mui/material/Grid";
import Header from "../Header";
import Main from "../Main";
import Publications from "../Publications";
import UserProfile from "../UserProfile/UserProfile";
import HidePubDialog from "../../widgets/HidePubDialog";
import Login from "../Login";
import LoginLoading from "../LoginLoading/LoginLoading";
import "./app-styles.scss";
import SnackBar from "../../widgets/SnackBar";

const App = () => {
  const [publications, setPublications] = useState(null);
  const [openHiddenDialog, setOpenHiddenDialog] = useState([false, null, null]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState({
    type: "",
    message: "",
  });
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
                setOpenHiddenDialog={setOpenHiddenDialog}
                publications={publications}
                setPublications={setPublications}
                setOpenSnackBar={setOpenSnackBar}
                setSnackBarMessage={setSnackBarMessage}
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

      <HidePubDialog
        openHiddenDialog={openHiddenDialog}
        setOpenHiddenDialog={setOpenHiddenDialog}
        publications={publications}
        setPublications={setPublications}
        setOpenSnackBar={setOpenSnackBar}
        setSnackBarMessage={setSnackBarMessage}
      />
      <SnackBar
        openSnackBar={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
        snackBarMessage={snackBarMessage}
        setSnackBarMessage={setSnackBarMessage}
      />
    </Grid>
  );
};

export default App;
