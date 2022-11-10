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
  deleteSubSection,
  fetchSections,
} from "../../../../../redux/superAdminReducer/superAdminAction";

const SubSectionDeleteDialog = (props) => {
  const dispatch = useDispatch();
  const params = useParams();

  const handleDialogClose = () => {
    props.setOpenDialog(false);
  };

  const handleClick = async () => {
    await dispatch(deleteSubSection(props.subsectionId));
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
        {"Are You Sure You want to Delete this Sub-Section?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          All the contents of sub section got deleted
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

export default SubSectionDeleteDialog;
