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
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { useDispatch } from "react-redux";
import {
  addSection,
  addSubSection,
} from "../../../../../redux/superAdminReducer/superAdminAction";

const SubSectionAddDialog = (props) => {
  const [subsection, setsubsection] = useState("");
  const [regulationName, setregulationName] = useState("");
  const [regulationNo, setregulationNo] = useState("");
  const [dateOfUpdate, setdateOfUpdate] = useState(new Date());
  const [updatedBy, setupdatedBy] = useState("");
  const [sorting, setsorting] = useState("");
  const [value, setValue] = useState(EditorState.createEmpty());

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hey");
    const sectionData = draftToHtml(convertToRaw(value.getCurrentContent()));
    const data = {
      sub_section_name: subsection,
      sub_regulation: regulationName,
      sub_regulation_no: regulationNo,
      updatedAt: dateOfUpdate,
      updatedBy,
      sorting,
      sub_regulation_details: sectionData,
    };
    await dispatch(addSubSection(data, props.sectionId));
    setsubsection("");
    setregulationName("");
    setregulationNo("");
    setdateOfUpdate("");
    setupdatedBy("");
    setsorting("");
    setValue("");
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
        maxWidth="lg"
      >
        <DialogTitle fontWeight={600}>Add Sub Section </DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item lg={5} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography>Name of the section</Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={props.sectionname}
                    disabled
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

                  <Typography sx={{ mt: 2 }}>
                    Name of the sub section
                  </Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={subsection}
                    onChange={(e) => setsubsection(e.target.value)}
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

                  <Typography sx={{ mt: 2 }}>Regulation Name</Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={regulationName}
                    onChange={(e) => setregulationName(e.target.value)}
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

                  <Typography sx={{ mt: 2 }}>Regulation No.</Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={regulationNo}
                    onChange={(e) => setregulationNo(e.target.value)}
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

                  <Typography sx={{ mt: 2 }}>Date of update</Typography>
                  <DesktopDatePicker
                    //   label="Date desktop"
                    inputFormat="dd/MM/yyyy"
                    value={dateOfUpdate}
                    onChange={(date) => setdateOfUpdate(date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        variant="outlined"
                        required
                        sx={{
                          mt: 1,
                          "& legend": { display: "none" },
                          "& fieldset": { top: 0 },
                        }}
                      />
                    )}
                  />

                  <Typography sx={{ mt: 2 }}>Updated by </Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={updatedBy}
                    onChange={(e) => setupdatedBy(e.target.value)}
                    aria-describedby="outlined-weight-helper-text"
                    fullWidth
                    size="small"
                    required
                    notched={false}
                    label="Law"
                    sx={{
                      mt: 1,
                    }}
                  />
                </Box>
              </Grid>
              <Grid item lg={7} md={12}>
                <Typography sx={{ mb: 1 }}>Regulation Details</Typography>
                <Editor
                  placeholder="Start Typing........"
                  editorState={value}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  editorStyle={{
                    border: "1px solid #f1f1f1",
                    padding: "5px",
                    borderRadius: "2px",
                    height: "350px",
                    width: "100%",
                  }}
                  onEditorStateChange={(item) => {
                    console.log(
                      draftToHtml(convertToRaw(item.getCurrentContent()))
                    );
                    setValue(item);
                  }}
                />
              </Grid>
            </Grid>

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
                Save
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubSectionAddDialog;
