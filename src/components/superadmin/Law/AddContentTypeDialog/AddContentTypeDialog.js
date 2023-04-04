import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  addContentType,
  fetchContentType,
} from "../../../../redux/superAdminReducer/superAdminAction";
import { useDispatch } from "react-redux";

const AddContentTypeDialog = (props) => {
  const dispatch = useDispatch();
  const [contentType, setContentType] = useState("");

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addContentType(contentType));
    await dispatch(fetchContentType());
    setContentType("");
    props.setOpenDialog(false);
  };

  return (
    <>
      {/* add admins dialog */}
      <Dialog
        open={props.openDialog} // Use value directly here
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: { borderRadius: 10 },
        }}
        maxWidth="lg"
      >
        <DialogTitle fontWeight={600}>
          Add New ContentType {props?.id}
        </DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent style={{ width: "480px" }}>
          <div style={{ width: "100%" }}>
            <form onSubmit={SubmitHandler}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography>Name of the ContentType</Typography>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  aria-describedby="outlined-weight-helper-text"
                  fullWidth
                  size="small"
                  notched={false}
                  label="ContentType"
                  sx={{
                    mt: 2,
                  }}
                  required
                />
              </Box>

              <Box sx={{ display: "flex", mt: 2, mb: 2 }}>
                <Button
                  size="large"
                  color="greycol"
                  variant="contained"
                  sx={{
                    mt: 3,
                    px: 5,
                    textTransform: "none",
                  }}
                  fullWidth
                  onClick={handleDialogClose}
                >
                  Cancel
                </Button>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  type="submit"
                  sx={{
                    mt: 3,
                    px: 5,
                    ml: 2,
                    color: "white",
                    textTransform: "none",
                  }}
                  fullWidth
                >
                  Create
                </Button>
              </Box>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddContentTypeDialog;
