import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import "./snackBar-styles.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = (props) => {
  const { openSnackBar, setOpenSnackBar, snackBarMessage } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      key={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={openSnackBar}
      autoHideDuration={6000}
      onClose={() => {
        setOpenSnackBar(false);
      }}
    >
      <Alert
        onClose={() => {
          setOpenSnackBar(false);
        }}
        severity={snackBarMessage.type}
        sx={{ width: "100%" }}
      >
        {snackBarMessage.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
