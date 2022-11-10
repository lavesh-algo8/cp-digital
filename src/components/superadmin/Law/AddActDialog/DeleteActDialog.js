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
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  deleteAct,
  fetchCategory,
} from "../../../../redux/superAdminReducer/superAdminAction";

const DeleteActDialog = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    const success = await dispatch(deleteAct(props.actid));
    if (success) {
      navigate(-1);
    }
    dispatch(fetchCategory());
    console.log(success);
    props.setOpenDialog(false);
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
        {"Are You Sure You want to Delete this Act?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          All the contents of Acts got deleted like
          Chapters,Sections,Subsections,Rules inside subsection etc....
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

export default DeleteActDialog;
