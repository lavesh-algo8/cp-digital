import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  addSectionDocumentHeading,
  editSectionDocumentHeading,
} from "../../../redux/superAdminReducer/superAdminAction";
import { useParams } from "react-router-dom";

const EditSection = (props) => {
  console.log(props);
  const params = useParams();
  const dispatch = useDispatch();
  const handleDialogClose = () => {
    props.closeDialog(); // Use the prop.
  };
  const [sections, setSections] = useState("");

  const onSubmit = async () => {
    console.log(sections);

    await dispatch(
      editSectionDocumentHeading(props.selectedSectionData._id, sections)
    );
    setSections("");
    props.closeDialog();
  };

  useEffect(() => {
    setSections(props?.selectedSectionData?.title);
  }, [props]);

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
        <DialogTitle fontWeight={600}>Edit Section {props?.id}</DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent style={{ width: "480px" }}>
          <div style={{ width: "100%" }}>
            <TextField
              size="small"
              id={`Section Title `}
              label={`Section Title `}
              name={`Section Title `}
              variant="outlined"
              fullWidth
              onChange={(e) => {
                setSections(e.target.value);
              }}
              value={sections}
            />

            <Box sx={{ display: "flex", mt: 2 }}>
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
                onClick={onSubmit}
              >
                Update
              </Button>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
      {/* add admins dialog */}
    </>
  );
};

export default EditSection;
