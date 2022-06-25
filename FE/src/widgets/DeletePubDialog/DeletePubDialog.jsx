import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import "./deletePubDialog-styles.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeletePubDialog = (props) => {
  const {
    openDeleteDialog,
    setOpenDeleteDialog,
    publications,
    setPublications,
  } = props;
  return (
    <Dialog
      open={openDeleteDialog[0]}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        setOpenDeleteDialog([false, null]);
      }}
      aria-describedby="delete-dialog-slide-description"
    >
      <DialogTitle>{"Delete publication"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this publication?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            let tempPub = [...publications];
            tempPub.splice(openDeleteDialog[1], 1);
            setPublications([...tempPub]);
            setOpenDeleteDialog([false, null]);
          }}
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            setOpenDeleteDialog([false, null]);
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePubDialog;
