import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AllTemplatesDesign from "./AllTemplatesDesign";

const AllTemplateDocuments = (props) => {
  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  return (
    <>
      <Dialog
        open={props.openDialog} // Use value directly here
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: { borderRadius: 10 },
        }}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle fontWeight={600}>Select Documents</DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <div style={{ width: "100%" }}>
            <AllTemplatesDesign />
          </div>
        </DialogContent>
        <DialogActions sx={{ mt: 2, mb: 1, mr: 3 }}>
          <Button variant="contained" autoFocus onClick={handleDialogClose}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllTemplateDocuments;
