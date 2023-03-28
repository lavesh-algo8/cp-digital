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
import htmlToDraft from "html-to-draftjs";
import { useDispatch } from "react-redux";
import {
  addSection,
  addSubSection,
} from "../../../../../redux/superAdminReducer/superAdminAction";
import { CKEditor } from "ckeditor4-react";

const SubSectionAddDialog = (props) => {
  const [subsection, setsubsection] = useState("");
  const [subsectionNo, setsubsectionNo] = useState(
    parseFloat(props.sectionno + "." + parseInt(props.subSectionLength + 1))
  );
  const [dateOfUpdate, setdateOfUpdate] = useState(new Date());
  const [dateOfAmendment, setdateOfAmendment] = useState(null);
  const [updatedBy, setupdatedBy] = useState("");
  const [value, setValue] = useState(EditorState.createEmpty());

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };
  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (isNaN(subsectionNo)) {
    //   alert("Sub-Section number should be number");
    //   return false;
    // }
    // const sectionData = draftToHtml(convertToRaw(value.getCurrentContent()));
    const sectionData = value;
    const data = {
      // sub_section_name: subsection,
      upload_date: dateOfUpdate,
      updatedBy,
      sub_regulation_no: subsectionNo.toString(),
      details: sectionData,
      amendment_date: dateOfAmendment,
    };
    await dispatch(addSubSection(data, props.sectionId));
    setsubsection("");
    setdateOfUpdate(null);
    setdateOfAmendment(null);
    setupdatedBy("");
    setValue("");
    props.setOpenDialog(false);
  };

  useEffect(() => {
    if (props) {
      setsubsectionNo(
        parseFloat(props.sectionno + "." + parseInt(props.subSectionLength + 1))
      );
      // setupdatedBy(props.sectionDetails.updatedBy);
      // if (props?.sectionDetails) {
      //   setValue(htmlToDraftBlocks(props?.sectionDetails?.section_details));
      // }
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
        disableEnforceFocus
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
                    justifyContent: "space-between",
                    height: "100%",
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

                  <Typography sx={{ mt: 2 }}>Sub Section No</Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={subsectionNo}
                    onChange={(e) => {
                      // const re = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/;

                      // if value is not blank, then test the regex

                      // if (e.target.value === "" || re.test(e.target.value)) {
                      setsubsectionNo(e.target.value);
                      // }
                    }}
                    aria-describedby="outlined-weight-helper-text"
                    fullWidth
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

                  <Typography sx={{ mt: 2 }}>Date of last Amendment</Typography>
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
                        // required
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
                {/* <Editor
                  placeholder="Start Typing........"
                  editorState={value}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  editorStyle={{
                    border: "1px solid #f1f1f1",
                    padding: "5px",
                    borderRadius: "2px",
                    height: "355px",
                    width: "100%",
                  }}
                  onEditorStateChange={(item) => {
                    console.log(
                      draftToHtml(convertToRaw(item.getCurrentContent()))
                    );
                    setValue(item);
                  }}
                /> */}

                <CKEditor
                  config={{
                    allowedContent: true,
                    // forceEnterMode: true,
                    enterMode: "p",
                    extraPlugins: ["amendments"],
                    height: "295px",
                    resize_enabled: false,
                    removeButtons: false,
                  }}
                  //   initData="
                  //   <style type='text/css'>
                  //     span .tooltip {
                  //         display: inline-block;
                  //         text-indent:0em;
                  //     }
                  //     .tooltip{
                  //         text-decoration: underline;
                  //     }

                  //     .tooltip .tooltiptext {
                  //         visibility: hidden;
                  //         width: calc(100vw - 35px);
                  //         background: #121D28;
                  //         color:#fff;
                  //         border-radius: 6px;
                  //         padding: 5px 5px;
                  //         left: 10px;
                  //         border: 2px solid black;
                  //         line-height: normal;
                  //         text-decoration: none;
                  //         position: absolute;
                  //         z-index: 1;
                  //     }

                  //     .tooltip:hover .tooltiptext {
                  //         visibility: visible;
                  //         left: 2%;
                  //     }
                  // </style>
                  //     <div>Welcome to CKEditor 4!</div>
                  //   "
                  onInstanceReady={() => {
                    //   alert("Editor is ready!");
                  }}
                  onChange={(e) => {
                    setValue(e.editor.getData());
                    console.log(e.editor.getData());
                  }}
                  onBeforeLoad={(CKEDITOR) => {
                    if (!CKEDITOR.plugins.registered["timestamp"]) {
                      CKEDITOR.plugins.add("timestamp", {
                        init: function (editor) {
                          editor.addCommand("insertTimestamp", {
                            exec: function (editor) {
                              var now = new Date();
                              alert("yo");
                              editor.insertHtml(
                                "The current date and time is: <em>" +
                                  now.toString() +
                                  "</em>"
                              );
                            },
                          });
                          editor.ui.addButton("Timestamp", {
                            label: "Insert Timestamp",
                            command: "insertTimestamp",
                            toolbar: "insert",
                            icon: "https://cdn4.iconfinder.com/data/icons/24x24-free-pixel-icons/24/Clock.png",
                          });
                        },
                      });
                    }

                    if (!CKEDITOR.plugins.registered["amendments"]) {
                      CKEDITOR.plugins.add("amendments", {
                        init: function (editor) {
                          editor.addCommand("addAmendments", {
                            exec: function (editor) {
                              if (editor.getSelection().getSelectedText()) {
                                // alert(editor.getSelection().getSelectedText());
                                // handleClickOpen();
                                const amentmentText = window.prompt(
                                  "Type Amendment text here...",
                                  ""
                                );
                                // amentmentText + editor.getSelection().getSelectedText()
                                editor.insertHtml(
                                  // "<p>This is a new paragraph.</p>"
                                  " <span class=tooltip>" +
                                    amentmentText +
                                    " <span class=tooltiptext>" +
                                    editor.getSelection().getSelectedText() +
                                    "</span> </span>"
                                );
                              }
                            },
                          });
                          editor.ui.addButton("Amendments", {
                            label: "Add Amendments",
                            command: "addAmendments",
                            toolbar: "insert",
                            icon: "https://cdn-icons-png.flaticon.com/512/6846/6846310.png",
                          });
                        },
                      });
                    }
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
