import React from "react";
import { decode } from "string-encode-decode";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import updatePublication from "../../httpRequests/updatePublication";

import "./hidePubDialog-styles.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HidePubDialog = (props) => {
  const {
    openHiddenDialog,
    setOpenHiddenDialog,
    publications,
    setPublications,
  } = props;

  const token = decode(sessionStorage.getItem("tkn"));

  return (
    <Dialog
      open={openHiddenDialog[0]}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        setOpenHiddenDialog([false, null, null]);
      }}
      aria-describedby="delete-dialog-slide-description"
    >
      <DialogTitle>
        {openHiddenDialog[2] === "hide"
          ? "Hide publication"
          : "Unhide publication"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {`Are you sure you want to ${
            openHiddenDialog[2] === "hide" ? "hide" : "unhide"
          } this publication?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            let tempPub = [...publications];

            const idx = publications.findIndex(
              (item) => item.id === openHiddenDialog[1]
            );
            if (openHiddenDialog[2] === "hide") {
              tempPub[idx] = {
                ...tempPub[idx],
                hidden: true,
              };
            } else if (openHiddenDialog[2] === "unhide") {
              tempPub[idx] = {
                ...tempPub[idx],
                hidden: false,
              };
            }

            updatePublication(token, tempPub[idx]).then((res) => {
              if (res.status === 202) {
                setPublications([...tempPub]);
              }
            });

            setOpenHiddenDialog([false, null, null]);
          }}
        >
          {openHiddenDialog[2] === "hide" ? "Hide" : "Unhide"}
        </Button>
        <Button
          onClick={() => {
            setOpenHiddenDialog([false, null, null]);
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HidePubDialog;
