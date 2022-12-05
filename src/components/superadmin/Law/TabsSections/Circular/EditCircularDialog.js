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
import React, { useEffect, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useDispatch, useSelector } from "react-redux";
import {
  editCircular,
  editSubCircular,
  fetchActByCategory,
  fetchAllCategory,
  fetchAllChapters,
  fetchChapters,
  fetchSectionsByChapterId,
  fetchSubSectionsBySectionId,
  getDataTree,
} from "../../../../../redux/superAdminReducer/superAdminAction";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { CKEditor } from "ckeditor4-react";
import DropdownTreeSelect from "react-dropdown-tree-select";

const EditSubCircularDialog = (props) => {
  const [file, setFile] = useState(undefined);

  const copyData = props?.circularsDetails;

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const [subcircularName, setsubcircularName] = useState("");
  const [circularNo, setcircularNo] = useState("");
  const [circularShortDescription, setcircularShortDescription] = useState("");
  const [dateOfCircular, setdateOfCircular] = useState(new Date());
  const [value, setValue] = useState(EditorState.createEmpty());
  const [subsectionName, setsubsectionName] = React.useState([]);
  const [sectionName, setsectionName] = React.useState([]);
  const [chapterName, setchapterName] = React.useState([]);
  const [dateOfAmendment, setdateOfAmendment] = useState(new Date());
  const [actName, setactName] = React.useState([]);
  const [lawName, setlawName] = React.useState([]);
  const [treeData, settreeData] = useState([]);

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };
  const {
    dataTree,
    categoryAllList,
    actsByCategoryList,
    chapterList,
    subsectionsList,
    allChapterList,
    sectionsbychapterList,
  } = useSelector((state) => state?.SuperAdmin);

  const dispatch = useDispatch();

  const DropDownTreeSelect = useMemo(() => {
    return (
      <DropdownTreeSelect
        data={dataTree}
        onChange={(currentNode, selectedNodes) => {
          console.log("onChange::", currentNode, selectedNodes);
          let arr = [];
          selectedNodes.map((node) => arr.push(node.label));
          console.log(arr);
          settreeData(arr);
        }}
        // className="bootstrap-demo"
        // showDropdown="always"
        // texts={{ placeholder: "Search" }}
        // showPartiallySelected="true"
      />
    );
  }, [dataTree]);

  const handleSubSectionSelectionChange = (event) => {
    console.log(event);
    const {
      target: { value },
    } = event;
    setsubsectionName(value);
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

  const handleActSelectionChange = async (event, key) => {
    console.log(event);
    let itemKey;
    if (key.key) {
      setchapterName("");
      itemKey = key.key.slice(2); //Removes the .$ from the key.
      console.log(itemKey);
    } else {
      itemKey = key;
    }
    await dispatch(fetchChapters(itemKey));
    if (key.key) {
      const {
        target: { value },
      } = event;
      setactName(
        // On autofill we get a the stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  const handleLawSelectionChange = async (event, key) => {
    console.log(event);
    let itemKey;
    if (key.key) {
      setactName("");
      itemKey = key.key.slice(2); //Removes the .$ from the key.
      console.log(itemKey);
    } else {
      itemKey = key;
    }
    await dispatch(fetchActByCategory(itemKey));
    if (key.key) {
      const {
        target: { value },
      } = event;
      setlawName(
        // On autofill we get a the stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(circularNo)) {
      alert("Sub circularNo number should be number");
      return false;
    }
    console.log("hey");
    // const circularDetails = draftToHtml(
    //   convertToRaw(value.getCurrentContent())
    // );
    const circularDetails = value;
    const data = {
      circular_no: parseInt(circularNo),
      circular_heading: subcircularName,
      upload_date: dateOfCircular,
      short_desc: circularShortDescription,
      circular_details: circularDetails,
      amendment_date: dateOfAmendment,
      mapTo: treeData,

      // law: lawName.toString(),
      // act: actName.toString(),
      // chapter: chapterName.toString(),
      // section: sectionName.toString(),
      // sub_section_no: parseFloat(subsectionName.toString()),
    };
    console.log(data);
    await dispatch(editCircular(data, props?.circularsDetails._id));
    setcircularNo("");
    setcircularShortDescription("");
    setdateOfCircular("");
    setsubsectionName([]);
    setsectionName([]);
    setchapterName([]);
    setdateOfAmendment("");
    setValue("");
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
    dispatch(fetchAllCategory());
    dispatch(getDataTree());
  }, []);

  useEffect(() => {
    if (props) {
      setsubcircularName(props.circularsDetails.circular_heading);
      setcircularNo(props.circularsDetails.circular_no);
      setcircularShortDescription(props.circularsDetails.short_desc);
      setdateOfCircular(props.circularsDetails.upload_date);
      setsubsectionName([
        props?.circularsDetails?.subsection?.sub_regulation_no,
      ]);
      if (props.circularsDetails?.section?.section_name != null) {
        setsectionName([props?.circularsDetails?.section?.section_name]);
        handleSectionSelectionChange(12, props?.circularsDetails?.section?._id);
      }
      if (props.circularsDetails?.chapter?.chapter != null) {
        setchapterName([props?.circularsDetails?.chapter?.chapter]);
        handleChapterSelectionChange(23, props?.circularsDetails?.chapter?._id);
      }
      setdateOfAmendment(props.circularsDetails.amendment_date);
      if (props?.circularsDetails) {
        // setValue(htmlToDraftBlocks(props.circularsDetails.circular_details));
        setValue(props.circularsDetails.circular_details);
      }
      if (props.circularsDetails?.act?.act != null) {
        setactName([props?.circularsDetails?.act?.act]);
        handleChapterSelectionChange(23, props?.circularsDetails?.act?._id);
      }
      if (props.circularsDetails?.law?.category != null) {
        setlawName([props?.circularsDetails?.law?.category]);
        handleChapterSelectionChange(23, props?.circularsDetails?.law?._id);
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
        disableEnforceFocus
      >
        <DialogTitle fontWeight={600}>Edit Circular </DialogTitle>
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
                  <Typography>Circular Number</Typography>
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
                  />

                  <Typography sx={{ mt: 2 }}>Name of the Circular</Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={subcircularName}
                    onChange={(e) => setsubcircularName(e.target.value)}
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

                  <Typography sx={{ mt: 2 }}>Date of Circular</Typography>
                  <DesktopDatePicker
                    inputFormat="dd/MM/yyyy"
                    value={dateOfCircular}
                    onChange={(date) => setdateOfCircular(date)}
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
                        required
                        sx={{
                          mt: 1,
                          "& legend": { display: "none" },
                          "& fieldset": { top: 0 },
                        }}
                      />
                    )}
                  />

                  <Typography sx={{ mt: 2 }}>Short Description </Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={circularShortDescription}
                    onChange={(e) =>
                      setcircularShortDescription(e.target.value)
                    }
                    aria-describedby="outlined-weight-helper-text"
                    fullWidth
                    size="small"
                    required
                    multiline
                    rows={4}
                    notched={false}
                    label="Law"
                    sx={{
                      mt: 1,
                    }}
                  />

                  <FormControl>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      Upload Circular File
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

                  {/* <FormControl
                    className={{
                      minWidth: 300,
                    }}
                    sx={{ mt: 2 }}
                  >
                    <Typography htmlFor="age-native-simple">
                      Map Law (optional)
                    </Typography>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      // multiple
                      value={lawName}
                      name="first"
                      onChange={handleLawSelectionChange}
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
                      {categoryAllList?.map((category) => (
                        <MenuItem key={category._id} value={category?.category}>
                          <Checkbox
                            checked={lawName.indexOf(category?.category) > -1}
                          />
                          <ListItemText primary={category?.category} />
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
                      Map Act (optional)
                    </Typography>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      // multiple
                      value={actName}
                      name="first"
                      onChange={handleActSelectionChange}
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
                      {actsByCategoryList?.map((act) => (
                        <MenuItem key={act._id} value={act?.act}>
                          <Checkbox checked={actName.indexOf(act?.act) > -1} />
                          <ListItemText primary={act?.act} />
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
                      Map chapter
                    </Typography>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      // multiple
                      value={chapterName}
                      name="first"
                      onChange={handleChapterSelectionChange}
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
                      {chapterList?.map((chapter) => (
                        <MenuItem key={chapter._id} value={chapter?.chapter}>
                          <Checkbox
                            checked={chapterName.indexOf(chapter?.chapter) > -1}
                          />
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
                      name="first"
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
                          <Checkbox
                            checked={
                              sectionName.indexOf(
                                section?.section.section_name
                              ) > -1
                            }
                          />
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
                      name="first"
                      onChange={handleSubSectionSelectionChange}
                      input={
                        <OutlinedInput
                          sx={{ mt: 1 }}
                          notched={false}
                          label="Tag"
                          size="small"
                        />
                      }
                      renderValue={(selected) => selected}
                    >
                      {subsectionsList?.map((section) => (
                        <MenuItem
                          key={section._id}
                          value={section?.sub_regulation_no}
                        >
                          <ListItemText primary={section?.sub_regulation_no} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                  <FormControl
                    sx={{
                      mt: 3,
                      borderRadius: "6px",
                      ".dropdown": {
                        width: "100%",
                        ".dropdown-trigger ": {
                          width: "100%",
                          borderRadius: "4px",
                          ".tag-list .tag-item": {
                            width: "93%",
                          },
                        },
                      },

                      ".dropdown-content": {
                        maxHeight: "420px",
                        overflowY: "auto",
                        minWidth: "100%",
                      },
                    }}
                  >
                    <Typography sx={{ mb: 1 }}>Map To</Typography>
                    {dataTree && DropDownTreeSelect}
                  </FormControl>
                </Box>
              </Grid>
              <Grid item lg={7} md={12}>
                <Typography sx={{ mb: 1 }}>Circular Descriptions</Typography>
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
                    height: "870px",
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
                    height: "555px",
                    resize_enabled: false,
                    removeButtons: false,
                  }}
                  initData={value}
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

export default EditSubCircularDialog;
