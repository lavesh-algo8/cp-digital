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
  deleteCategory,
  fetchCategory,
} from "../../../../redux/superAdminReducer/superAdminAction";

const DeleteCategoryDialog = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    const success = await dispatch(deleteCategory(props.categoryId));
    if (success) {
      navigate("/superadmin/laws");
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
        {"Are You Sure You want to Delete this Category?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          All the contents of Law/Category got deleted like: All Acts with all
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

export default DeleteCategoryDialog;
