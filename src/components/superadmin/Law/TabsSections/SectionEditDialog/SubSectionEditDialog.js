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
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { useDispatch } from "react-redux";
import {
  addSection,
  editSection,
  editSubSection,
} from "../../../../../redux/superAdminReducer/superAdminAction";
import htmlToDraft from "html-to-draftjs";

const SubSectionEditDialog = (props) => {
  const [section, setsection] = useState(
    props.subsectionDetails.sub_section_name
  );
  const [dateOfAmendment, setdateOfAmendment] = useState(
    props.subsectionDetails.amendment_date
  );

  const [regulationNo, setregulationNo] = useState(
    props.subsectionDetails?.sub_regulation_no
  );
  const [dateOfUpdate, setdateOfUpdate] = useState(
    props.subsectionDetails?.updatedAt
  );
  const htmlToDraftBlocks = (html) => {
    if (!html) {
      return;
    }
    const blocksFromHtml = htmlToDraft(html);
    // console.log(blocksFromHtml);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    console.log(editorState);

    return editorState;

    // return blocksFromHtml;
  };

  const [updatedBy, setupdatedBy] = useState(
    props.subsectionDetails?.updatedBy
  );
  const [value, setValue] = useState(
    htmlToDraftBlocks(props?.subsectionDetails?.sub_regulation_details)
  );

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(regulationNo)) {
      alert("Sub-Section number should be number");
      return false;
    }
    console.log("hey");
    const sectionData = draftToHtml(convertToRaw(value.getCurrentContent()));
    const data = {
      sub_section_name: section,
      // sub_regulation: regulationName,
      sub_regulation_no: regulationNo,
      updatedAt: dateOfUpdate,
      amendment_date: dateOfAmendment,
      updatedBy,
      sub_regulation_details: sectionData,
    };
    console.log(data);
    await dispatch(editSubSection(data, props.subsectionDetails._id));
    setsection("");
    setdateOfAmendment("");
    setregulationNo("");
    setdateOfUpdate("");
    setupdatedBy("");
    setValue("");
    props.setOpenDialog(false);
  };

  useEffect(() => {
    console.log(props);
    setsection(props.subsectionDetails.sub_section_name);
    setregulationNo(props.subsectionDetails.sub_regulation_no);
    setdateOfUpdate(props.subsectionDetails.updatedAt);
    setupdatedBy(props.subsectionDetails.updatedBy);
    setdateOfAmendment(props.subsectionDetails.amendment_date);
    if (props?.subsectionDetails) {
      setValue(
        htmlToDraftBlocks(props?.subsectionDetails?.sub_regulation_details)
      );
    }
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
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle fontWeight={600}>Edit Sub-Section </DialogTitle>
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
                  <Typography>Name of the sub - section</Typography>
                  <OutlinedInput
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

                  <Typography sx={{ mt: 2 }}>Sub - section No.</Typography>
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

                  <Typography sx={{ mt: 2 }}>
                    Date of last Amendment (if any)
                  </Typography>
                  <DesktopDatePicker
                    //   label="Date desktop"
                    inputFormat="dd/MM/yyyy"
                    value={dateOfAmendment}
                    onChange={(date) => setdateOfAmendment(date)}
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
                    height: "270px",
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
                Update
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubSectionEditDialog;
