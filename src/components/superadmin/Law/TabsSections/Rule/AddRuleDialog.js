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
import { addRule } from "../../../../../redux/superAdminReducer/superAdminAction";

const AddRuleDialog = (props) => {
  const { subsectionsList } = useSelector((state) => state?.SuperAdmin);
  const dispatch = useDispatch();

  const [file, setFile] = useState(undefined);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const [rule, setrule] = useState("");

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hey");
    const data = {
      rule_name: rule,
    };
    console.log(data);
    await dispatch(addRule(data));
    setrule("");
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
        <DialogTitle fontWeight={600}>Add Rule </DialogTitle>
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
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography>Name of the Rule</Typography>
                <OutlinedInput
                  multiline
                  rows={3}
                  id="outlined-adornment-weight"
                  value={rule}
                  onChange={(e) => setrule(e.target.value)}
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

              <FormControl>
                <Typography sx={{ mt: 2, mb: 1 }}>Upload Rule File</Typography>
                <Box
                  sx={{
                    border: "1px solid #919191",
                    borderRadius: "5px",
                    px: 2,
                  }}
                >
                  <input
                    accept=".pdf,.doc,.docx"
                    style={{ display: "none" }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleChange}
                    // required
                  />
                  {/* preview of file */}

                  <label htmlFor="raised-button-file">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Button
                        variant="contained"
                        component="span"
                        sx={{ mt: 1, mr: 3 }}
                        size="small"
                      >
                        Upload File
                      </Button>
                      {file && file.name}
                    </Box>
                  </label>
                </Box>
              </FormControl>
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

export default AddRuleDialog;
