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
import { useNavigate } from "react-router-dom";
import { deleteAddedCalculatorsById } from "../../../redux/superAdminReducer/superAdminAction";

const DeleteCalculator = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    const res = await dispatch(deleteAddedCalculatorsById(props.id));
    if (res) {
      props.setOpenDialog(false);
      navigate(`/superadmin/calculator`);
    }
  };

  const handleDialogClose = () => {
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
        {"Are You Sure You want to Delete this Calculator?"}
      </DialogTitle>
      <DialogContent>
        {/* <DialogContentText id="alert-dialog-description">
          All the contents of Calculator got deleted
        </DialogContentText> */}
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

export default DeleteCalculator;
