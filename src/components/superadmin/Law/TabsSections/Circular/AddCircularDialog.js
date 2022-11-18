import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
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
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import { addCircular } from "../../../../../redux/superAdminReducer/superAdminAction";

const AddCircularDialog = (props) => {
  const [file, setFile] = useState(undefined);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const [circularName, setcircularName] = useState("");
  // const [circularNo, setcircularNo] = useState("");

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hey");

    const data = {
      // circular_no: circularNo,
      circular_heading: circularName,
    };
    console.log(data);

    await dispatch(addCircular(data));
    setcircularName("");
    // setcircularNo("");
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
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle fontWeight={600}>Add Circular </DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* <Typography>Circular Number</Typography>
              <OutlinedInput
                id="outlined-adornment-weight"
                value={circularNo}
                onChange={(e) => setcircularNo(e.target.value)}
                aria-describedby="outlined-weight-helper-text"
                fullWidth
                required
                size="small"
                notched={false}
                label="Law"
                sx={{
                  mt: 1,
                }}
              /> */}

              <Typography>Name of the Circular</Typography>
              <OutlinedInput
                multiline
                rows={3}
                id="outlined-adornment-weight"
                value={circularName}
                onChange={(e) => setcircularName(e.target.value)}
                aria-describedby="outlined-weight-helper-text"
                fullWidth
                required
                size="small"
                notched={false}
                label="Law"
                sx={{
                  mt: 1,
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                mt: 2,
                mb: 2,
                justifyContent: "center",
              }}
            >
              <Button
                size="large"
                color="greycol"
                variant="contained"
                sx={{
                  mt: 3,
                  px: 5,
                  textTransform: "none",
                }}
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
                  ml: 4,
                  color: "white",
                  textTransform: "none",
                }}
              >
                Create
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCircularDialog;
