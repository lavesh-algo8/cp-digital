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
import { useDispatch, useSelector } from "react-redux";
import {
  editSubCircular,
  editSubRule,
  fetchAllChapters,
  fetchSectionsByChapterId,
  fetchSubSectionsBySectionId,
} from "../../../../../redux/superAdminReducer/superAdminAction";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";

const EditSubRuleDialog = (props) => {
  const [file, setFile] = useState(undefined);

  const copyData = props?.subruleDetails;

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const [subrule, setsubrule] = useState("");
  const [dateOfRule, setdateOfRule] = useState(new Date());
  const [value, setValue] = useState(EditorState.createEmpty());
  const [dateOfAmendment, setdateOfAmendment] = useState(new Date());
  const [subsectionName, setsubsectionName] = React.useState([]);
  const [sectionName, setsectionName] = React.useState([]);
  const [chapterName, setchapterName] = React.useState([]);

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };
  const { subsectionsList, allChapterList, sectionsbychapterList } =
    useSelector((state) => state?.SuperAdmin);

  const dispatch = useDispatch();

  const handleSubSectionSelectionChange = (event) => {
    console.log(event);
    const {
      target: { value },
    } = event;
    setsubsectionName(typeof value === "string" ? value.split(",") : value);
  };

  const handleSectionSelectionChange = async (event, key) => {
    console.log(event);
    let itemKey;
    if (key.key) {
      setsubsectionName("");
      itemKey = key.key.slice(2); //Removes the .$ from the key.
      console.log(itemKey);
    } else {
      itemKey = key;
    }
    await dispatch(fetchSubSectionsBySectionId(itemKey));
    if (key.key) {
      const {
        target: { value },
      } = event;
      setsectionName(typeof value === "string" ? value.split(",") : value);
    } else {
    }
  };

  const handleChapterSelectionChange = async (event, key) => {
    // event.preventDefault();
    console.log(event);
    let itemKey;
    if (key.key) {
      setsectionName("");
      itemKey = key.key.slice(2); //Removes the .$ from the key.
      console.log(itemKey);
    } else {
      itemKey = key;
    }
    await dispatch(fetchSectionsByChapterId(itemKey));
    if (key.key) {
      const {
        target: { value },
      } = event;
      setchapterName(
        // On autofill we get a the stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    } else {
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hey");
    const sectionData = draftToHtml(convertToRaw(value.getCurrentContent()));
    const data = {
      sub_rule_name: subrule,
      upload_date: dateOfRule,
      details: sectionData,
      amendment_date: dateOfAmendment,
      chapter: chapterName.toString(),
      section: sectionName.toString(),
      sub_section: subsectionName.toString(),
    };
    console.log(data);
    await dispatch(editSubRule(data, props?.subruleDetails._id));
    setdateOfRule("");
    setValue("");
    setdateOfAmendment("");
    setsubsectionName([]);
    setsectionName([]);
    setchapterName([]);
    props.setOpenDialog(false);
    await dispatch({
      type: "REMOVE_SUBSECTIONSBYSECTIONID",
      payload: [],
    });
    await dispatch({
      type: "REMOVE_SECTIONSBYSECTIONID",
      payload: [],
    });
  };

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

  useEffect(() => {
    dispatch(fetchAllChapters());
  }, []);

  useEffect(() => {
    if (props) {
      setsubrule(props.subruleDetails.sub_rule_name);
      setdateOfRule(props.subruleDetails.upload_date);
      setsubsectionName([props?.subruleDetails?.sub_section?.sub_section_name]);
      if (props.subruleDetails?.section?.section_name != null) {
        setsectionName([props?.subruleDetails?.section?.section_name]);
        handleSectionSelectionChange(12, props?.subruleDetails?.section?._id);
      }
      if (props.subruleDetails?.chapter?.chapter != null) {
        setchapterName([props?.subruleDetails?.chapter?.chapter]);
        handleChapterSelectionChange(23, props?.subruleDetails?.chapter?._id);
      }
      setdateOfAmendment(props.subruleDetails.amendment_date);
      if (props?.subruleDetails) {
        setValue(htmlToDraftBlocks(props.subruleDetails.sub_rule_details));
      }
    }
  }, [copyData]);

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
        <DialogTitle fontWeight={600}>Edit Sub-Rule </DialogTitle>
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
                  <Box>
                    <Typography>Name of the Sub-Rule</Typography>
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      value={subrule}
                      onChange={(e) => setsubrule(e.target.value)}
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
                    <Typography sx={{ mt: 2 }}>Date of rule</Typography>
                    <DesktopDatePicker
                      inputFormat="dd/MM/yyyy"
                      value={dateOfRule}
                      onChange={(date) => setdateOfRule(date)}
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

                  <FormControl>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      Upload Rule File
                    </Typography>
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

                  <FormControl
                    className={{
                      minWidth: 300,
                    }}
                    sx={{ mt: 2 }}
                  >
                    <Typography htmlFor="age-native-simple">
                      Map chapter
                    </Typography>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      // multiple
                      value={chapterName}
                      name={chapterName}
                      onChange={handleChapterSelectionChange}
                      input={
                        <OutlinedInput
                          sx={{ mt: 1 }}
                          notched={false}
                          label="Tag"
                          size="small"
                        />
                      }
                    >
                      {allChapterList?.map((chapter) => (
                        <MenuItem key={chapter._id} value={chapter?.chapter}>
                          <ListItemText primary={chapter?.chapter} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    className={{
                      minWidth: 300,
                    }}
                    sx={{ mt: 2 }}
                  >
                    <Typography htmlFor="age-native-simple">
                      Map section (optional)
                    </Typography>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      // multiple
                      value={sectionName}
                      name={sectionName}
                      onChange={handleSectionSelectionChange}
                      input={
                        <OutlinedInput
                          sx={{ mt: 1 }}
                          notched={false}
                          label="Tag"
                          size="small"
                        />
                      }
                      renderValue={(selected) =>
                        selected
                          .map(
                            (obj) =>
                              // console.log(obj);
                              obj
                          )
                          .join(", ")
                      }
                    >
                      {sectionsbychapterList?.map((section) => (
                        <MenuItem
                          key={section.section._id}
                          value={section?.section.section_name}
                        >
                          <ListItemText
                            primary={section?.section.section_name}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    className={{
                      minWidth: 300,
                    }}
                    sx={{ mt: 2 }}
                  >
                    <Typography htmlFor="age-native-simple">
                      Map sub section (optional)
                    </Typography>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      // multiple
                      value={subsectionName}
                      name={subsectionName}
                      onChange={handleSubSectionSelectionChange}
                      input={
                        <OutlinedInput
                          sx={{ mt: 1 }}
                          notched={false}
                          label="Tag"
                          size="small"
                        />
                      }
                      renderValue={(selected) =>
                        selected
                          .map(
                            (obj) =>
                              // console.log(obj);
                              obj
                          )
                          .join(", ")
                      }
                    >
                      {subsectionsList?.map((section) => (
                        <MenuItem
                          key={section._id}
                          value={section?.sub_section_name}
                        >
                          <ListItemText primary={section?.sub_section_name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item lg={7} md={12}>
                <Typography sx={{ mb: 1 }}>Rule Descriptions</Typography>
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
                    height: "450px",
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

export default EditSubRuleDialog;
