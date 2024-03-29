import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
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
import { addSection } from "../../../../../redux/superAdminReducer/superAdminAction";

const SectionAddDialog = (props) => {
  const [section, setsection] = useState("");
  const [sectionNo, setsectionNo] = useState("");
  // const [regulationName, setregulationName] = useState("");
  // const [dateOfUpdate, setdateOfUpdate] = useState(new Date());
  // const [updatedBy, setupdatedBy] = useState("");
  // const [sorting, setsorting] = useState("");
  // const [value, setValue] = useState(EditorState.createEmpty());
  const { sectionsList } = useSelector((state) => state?.SuperAdmin);

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(sectionNo)) {
      alert("Section no should be number");
      return false;
    }
    console.log("hey");
    const data = {
      section_name: section,
      section_no: sectionNo,
    };
    console.log(data);
    await dispatch(addSection(data, props.chapterid));
    setsection("");
    setsectionNo("");
    props.setOpenDialog(false);
  };

  useEffect(() => {
    setsectionNo(sectionsList?.length + 1);
  }, [sectionsList]);

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
        <DialogTitle fontWeight={600}>Add Section </DialogTitle>
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
              <Typography>Section No</Typography>
              <OutlinedInput
                id="outlined-adornment-weight"
                value={sectionNo}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;

                  // if value is not blank, then test the regex

                  if (e.target.value === "" || re.test(e.target.value)) {
                    setsectionNo(e.target.value);
                  }
                }}
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
              <Typography sx={{ mt: 3 }}>Name of the section</Typography>
              <OutlinedInput
                multiline
                rows={3}
                id="outlined-adornment-weight"
                value={section}
                onChange={(e) => setsection(e.target.value)}
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

export default SectionAddDialog;
