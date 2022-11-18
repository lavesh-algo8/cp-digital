import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteSubCircular } from "../../../../../redux/superAdminReducer/superAdminAction";

const DeleteSubCircularDialog = (props) => {
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    props.setOpenDialog(false);
  };

  const handleClick = async () => {
    await dispatch(deleteSubCircular(props.subcircularId));
    props.setOpenDialog(false);
  };

  return (
    <Dialog
      open={props.openDialog}
      onClose={handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are You Sure You want to Delete this Sub-Circular?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          All the contents of sub circular got deleted
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleDialogClose} variant="outlined" size="small">
          Cancel
        </Button>
        <Button
          onClick={handleClick}
          autoFocus
          variant="contained"
          size="small"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteSubCircularDialog;
