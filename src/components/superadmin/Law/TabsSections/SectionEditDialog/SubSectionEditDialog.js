import {
  Box,
  Button,
  Checkbox,
  Collapse,
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
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import {
  addSection,
  editSection,
  editSubSection,
  getTextAnalysis,
} from "../../../../../redux/superAdminReducer/superAdminAction";
import htmlToDraft from "html-to-draftjs";
import { CKEditor } from "ckeditor4-react";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import parse from "html-react-parser";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const SubSectionEditDialog = (props) => {
  const editorRef = useRef(null);
  const { textAnalysisType } = useSelector((state) => state?.SuperAdmin);

  const [descriptionVersion, setdescriptionVersion] = useState([]);
  const [expandedhistory, setExpandedHistory] = React.useState(true);
  const [expandedhistoryversion, setExpandedHistoryVersion] =
    React.useState("");

  const [section, setsection] = useState(
    props.subsectionDetails.sub_section_name
  );
  const [dateOfAmendment, setdateOfAmendment] = useState(null);

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
    props?.subsectionDetails?.sub_regulation_details
  );

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (isNaN(regulationNo)) {
    //   alert("Sub-Section number should be number");
    //   return false;
    // }
    // const sectionData = draftToHtml(convertToRaw(value.getCurrentContent()));
    const sectionData = value;

    const checkedDescriptionversionData = descriptionVersion.reduce(
      (values, value) => {
        console.log(value);
        if (value) values.push({ id: value._id, publish: value.checked });
        return values;
      },
      []
    );
    console.log(checkedDescriptionversionData);

    const data = {
      sub_regulation_no: regulationNo,
      updatedAt: dateOfUpdate,
      amendment_date: dateOfAmendment,
      updatedBy,
      details: sectionData,
      isChecked: checkedDescriptionversionData,
    };
    console.log(data);
    await dispatch(editSubSection(data, props.subsectionDetails._id));
    setdateOfAmendment(null);
    setregulationNo("");
    setdateOfUpdate(null);
    setupdatedBy("");
    setValue("");
    props.setOpenDialog(false);
  };

  useEffect(() => {
    console.log(props);
    // setsection(props.subsectionDetails.sub_section_name);
    setdescriptionVersion(
      props?.subsectionDetails?.history
        ?.filter((obj) => obj.description != undefined)
        .slice()
        .reverse()
    );
    setregulationNo(props.subsectionDetails.sub_regulation_no);
    setdateOfUpdate(props.subsectionDetails.updatedAt);
    setupdatedBy(props.subsectionDetails.updatedBy);
    setdateOfAmendment(props.subsectionDetails.amendment_date);
    if (props?.subsectionDetails) {
      setValue(props?.subsectionDetails?.sub_regulation_details);
    }
  }, []);

  const handleExpandClick = () => {
    setExpandedHistory(!expandedhistory);
  };

  const handleExpandVersionClick = () => {
    setExpandedHistoryVersion(!expandedhistoryversion);
  };

  const handleClick = (index) => {
    setExpandedHistoryVersion((prev) => (prev === index ? "" : index));
  };

  const onCheckedHandler = (index) => {
    setdescriptionVersion((prev) => [
      ...prev?.map(({ checked, ...rest }, idx) =>
        idx === index ? { ...rest, checked: !checked } : { ...rest, checked }
      ),
    ]);
    console.log(descriptionVersion);
  };

  // const getTextDiff = async () => {
  //   const res = await dispatch(getTextAnalysis(props.subsectionDetails._id));
  //   console.log("in article :", res);
  //   if (res) {
  //     if (res.data.result) {
  //       if (
  //         res.data.result[res.data.result.length - 1].type === "modification"
  //       ) {
  //         console.log(
  //           "<span style='color: #a04d26;'>" +
  //             props?.subsectionDetails?.sub_regulation_details +
  //             "</span>"
  //         );
  //         let modifiedString = props?.subsectionDetails?.sub_regulation_details;
  //         let colorRegex = /style="color:\s*#([0-9a-fA-F]{3}){1,2};?"/;
  //         let newColor = "#1e1ec9";
  //         if (colorRegex.test(modifiedString)) {
  //           modifiedString = modifiedString.replace(
  //             colorRegex,
  //             `style="color: ${newColor};"`
  //           );
  //         } else {
  //           modifiedString =
  //             "<span style='color: #1e1ec9;'>" +
  //             props?.subsectionDetails?.sub_regulation_details +
  //             "</span>";
  //         }
  //         editorRef?.current?.editor?.setData(modifiedString);
  //       } else if (
  //         res.data.result[res.data.result.length - 1].type === "substitution"
  //       ) {
  //         let modifiedString = props?.subsectionDetails?.sub_regulation_details;

  //         let colorRegex = /style="color:\s*#([0-9a-fA-F]{3}){1,2};?"/;
  //         let newColor = "#a04d26";
  //         if (colorRegex.test(modifiedString)) {
  //           modifiedString = modifiedString.replace(
  //             colorRegex,
  //             `style="color: ${newColor};"`
  //           );
  //         } else {
  //           modifiedString =
  //             "<span style='color: #a04d26;'>" +
  //             props?.subsectionDetails?.sub_regulation_details +
  //             "</span>";
  //         }

  //         editorRef?.current?.editor?.setData(modifiedString);
  //       }
  //     }
  //   }
  // };

  const changesDescription = () => {
    console.log(textAnalysisType);
    if (textAnalysisType === "modification") {
      console.log(
        "<span style='color: #1e1ec9;'>" +
          props?.subsectionDetails?.sub_regulation_details +
          "</span> <br/>"
      );
      let modifiedString =
        "<span style='color:#1e1ec9;'>" +
        props?.subsectionDetails?.sub_regulation_details +
        "</span> <br/>";
      return modifiedString;
    } else if (textAnalysisType === "substitution") {
      let modifiedString =
        "<span style='color: #a04d26;'>" +
        props?.subsectionDetails?.sub_regulation_details +
        "</span> <br/>";
      return modifiedString;
    } else if (textAnalysisType === "") {
      return props?.subsectionDetails?.sub_regulation_details;
    }
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
        disableEnforceFocus
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
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography>Sub - section No.</Typography>
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
                  </Box>

                  <Box>
                    <Typography sx={{ mt: 4 }}>Date of update</Typography>
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
                          fullWidth
                          sx={{
                            mt: 1,
                            "& legend": { display: "none" },
                            "& fieldset": { top: 0 },
                          }}
                        />
                      )}
                    />
                  </Box>

                  <Box>
                    <Typography sx={{ mt: 4 }}>
                      Date of last Amendment
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
                          fullWidth
                          // required
                          sx={{
                            mt: 1,
                            "& legend": { display: "none" },
                            "& fieldset": { top: 0 },
                          }}
                        />
                      )}
                    />
                  </Box>

                  <Box>
                    <Typography sx={{ mt: 4 }}>Updated by </Typography>
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
                </Box>
              </Grid>
              <Grid item lg={7} md={12}>
                <Typography sx={{ mb: 1 }}>Subsection Details</Typography>

                {/* <Button onClick={() => setValue("hey")}>set</Button> */}
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
                    height: "270px",
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
                  ref={editorRef}
                  config={{
                    allowedContent: true,
                    // forceEnterMode: true,
                    enterMode: "p",
                    extraPlugins: ["amendments"],
                    height: "250px",
                    resize_enabled: false,
                    removeButtons: false,
                  }}
                  initData={value}
                  onInstanceReady={(event) => {
                    //   alert("Editor is ready!");
                    editorRef.current = event;
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

                <Box
                  sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        fontSize: "25px",
                        color: "#1e1ec9",
                      }}
                    >
                      &#x25CF;
                    </Box>
                    <Typography variant="body2"> -- Modification</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", ml: 3 }}>
                    <Box
                      sx={{
                        fontSize: "25px",
                        color: "#a04d26",
                      }}
                    >
                      &#x25CF;
                    </Box>
                    <Typography variant="body2"> -- Substitution</Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={handleExpandClick}
                  >
                    <Typography sx={{ mb: 2 }}>
                      <strong>Description History</strong>
                    </Typography>
                    <ExpandMore
                      expand={expandedhistory}
                      onClick={handleExpandClick}
                      aria-expanded={expandedhistory}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </Box>

                  <Collapse in={expandedhistory} timeout="auto" unmountOnExit>
                    {descriptionVersion?.map((item, index) => (
                      <Box
                        sx={{
                          background:
                            expandedhistoryversion === index ? "#f9f9f9" : "",
                          borderRadius: "5px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            background:
                              expandedhistoryversion === index ? "#e8e8e8" : "",
                            borderRadius: "5px",
                            ":hover": {
                              background: "#e8e8e8",
                            },
                          }}
                        >
                          {/* <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={(event) => onCheckedHandler(index)}
                            /> */}
                          <Checkbox
                            checked={item.checked}
                            onChange={(event) => onCheckedHandler(index)}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                          <Typography
                            sx={{ ml: 2, mt: 1, cursor: "pointer" }}
                            onClick={() => handleClick(index)}
                          >
                            Version : {descriptionVersion.length - index}
                          </Typography>
                          <Box sx={{ flexGrow: 1 }} />
                          <IconButton onClick={() => handleClick(index)}>
                            {expandedhistoryversion === index ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </IconButton>
                        </Box>

                        <Collapse
                          in={expandedhistoryversion === index}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box
                            sx={{
                              border: "1px solid black",
                              p: 3,
                              mt: 2,
                              mb: 2,
                              ml: 2,
                              mr: 2,
                              borderRadius: "10px",
                            }}
                          >
                            <Typography variant="body2">
                              <strong>Description:</strong>{" "}
                              {parse(item?.description || "")}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              <strong>Date:</strong>{" "}
                              {`${("0" + new Date(item?.date)?.getDate()).slice(
                                -2
                              )}-${(
                                "0" +
                                (new Date(item?.date)?.getMonth() + 1)
                              ).slice(-2)}-${new Date(item?.date)
                                ?.getFullYear()
                                .toString()
                                .slice(-2)}`}
                            </Typography>
                            {index ===
                            descriptionVersion.lastIndexOf(
                              descriptionVersion[0]
                            ) ? (
                              <>
                                <Typography sx={{ mt: 3 }}>
                                  <strong>Changes:</strong>
                                </Typography>
                                <Typography>
                                  ( with respect to current description )
                                </Typography>
                                {parse(changesDescription())}
                              </>
                            ) : (
                              ""
                            )}
                          </Box>
                        </Collapse>
                      </Box>
                    ))}
                  </Collapse>
                </Box>
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
