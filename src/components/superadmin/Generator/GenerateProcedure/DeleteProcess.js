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
import { useParams } from "react-router-dom";
import {
  deleteProcedure,
  deleteProcess,
  fetchGenerateProcedure,
  fetchProcessesByProcedure,
} from "../../../../redux/superAdminReducer/superAdminAction";

const DeleteProcess = (props) => {
  const dispatch = useDispatch();
  console.log(props);
  const params = useParams();

  const handleClick = async () => {
    console.log(props?.processDetails?._id);
    await dispatch(deleteProcess(props?.processDetails?._id));
    await dispatch(fetchProcessesByProcedure(params.procedureId));
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
        {"Are You Sure You want to delete this Process?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          All the contents of Process got deleted
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

export default DeleteProcess;
