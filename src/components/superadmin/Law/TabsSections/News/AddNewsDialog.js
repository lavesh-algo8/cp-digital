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
import { EditorState, convertToRaw } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import {
  addNews,
  addRule,
  addSection,
  addSubNews,
  addSubRule,
  fetchActByCategory,
  fetchAllCategory,
  fetchChapters,
  fetchSections,
  fetchSectionsByChapterId,
  fetchSubSections,
  fetchSubSectionsBySectionId,
  getDataTree,
} from "../../../../../redux/superAdminReducer/superAdminAction";
import { CKEditor } from "ckeditor4-react";
import DropdownTreeSelect from "react-dropdown-tree-select";

import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const AddNewsDialog = (props) => {
  const [subnews, setsubnews] = useState("");
  const [newsSource, setnewsSource] = useState("");
  const [dateOfNews, setdateOfNews] = useState(new Date());
  const [dateOfAmendment, setdateOfAmendment] = useState(null);
  const [value, setValue] = useState(EditorState.createEmpty());
  const [treeData, settreeData] = useState([]);
  const [subsectionName, setsubsectionName] = React.useState([]);
  const [sectionName, setsectionName] = React.useState([]);
  const [chapterName, setchapterName] = React.useState([]);
  const [actName, setactName] = React.useState([]);
  const [lawName, setlawName] = React.useState([]);

  // tree data implementation
  const [checked, setchecked] = useState([]);
  const [expanded, setexpanded] = useState([]);

  const onCheck = (checked) => {
    console.log(checked);

    setchecked(checked);
  };

  const onExpand = (expanded) => {
    setexpanded(expanded);
  };

  const {
    dataTree,
    categoryAllList,
    actsByCategoryList,
    chapterList,
    subsectionsList,
    sectionsbychapterList,
  } = useSelector((state) => state?.SuperAdmin);
  const dispatch = useDispatch();
  const [file, setFile] = useState(undefined);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

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
    setsubsectionName(typeof value === "string" ? value.split(",") : value);
  };

  const handleSectionSelectionChange = async (event, key) => {
    console.log(event);
    const itemKey = key.key.slice(2); //Removes the .$ from the key.
    console.log(itemKey);
    await dispatch(fetchSubSectionsBySectionId(itemKey));
    const {
      target: { value },
    } = event;
    setsectionName(typeof value === "string" ? value.split(",") : value);
  };

  const handleChapterSelectionChange = async (event, key) => {
    console.log(event);
    const itemKey = key.key.slice(2); //Removes the .$ from the key.
    console.log(itemKey);
    await dispatch(fetchSectionsByChapterId(itemKey));
    const {
      target: { value },
    } = event;
    setchapterName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleActSelectionChange = async (event, key) => {
    console.log(event);
    const itemKey = key.key.slice(2); //Removes the .$ from the key.
    console.log(itemKey);
    await dispatch(fetchChapters(itemKey));
    const {
      target: { value },
    } = event;
    setactName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleLawSelectionChange = async (event, key) => {
    console.log(event);
    const itemKey = key.key.slice(2); //Removes the .$ from the key.
    console.log(itemKey);
    await dispatch(fetchActByCategory(itemKey));
    const {
      target: { value },
    } = event;
    setlawName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hey");
    // const newsData = draftToHtml(convertToRaw(value.getCurrentContent()));
    const newsData = value;
    const data = {
      heading: subnews,
      upload_date: dateOfNews,
      amendment_date: dateOfAmendment,
      description: newsData,
      source: newsSource,
      mapTo: checked,
      // law: lawName.toString(),
      // act: actName.toString(),
      // chapter: chapterName.toString(),
      // section: sectionName.toString(),
      // sub_section_no: parseFloat(subsectionName.toString()),
    };
    console.log(data);
    await dispatch(addNews(data));
    setsubnews("");
    setdateOfNews(null);
    setdateOfAmendment(null);
    setValue("");
    setnewsSource("");
    setsubsectionName([]);
    setsectionName([]);
    setchapterName([]);
    props.setOpenDialog(false);
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
    dispatch(getDataTree());
  }, []);

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
        <DialogTitle fontWeight={600}>Add News </DialogTitle>
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
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography>Name of the News</Typography>
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      value={subnews}
                      onChange={(e) => setsubnews(e.target.value)}
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
                    <Typography sx={{ mt: 2 }}>Date of news</Typography>
                    <DesktopDatePicker
                      inputFormat="dd/MM/yyyy"
                      value={dateOfNews}
                      onChange={(date) => setdateOfNews(date)}
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
                    <Typography sx={{ mt: 2 }}>Date of Amendment</Typography>
                    <DesktopDatePicker
                      inputFormat="dd/MM/yyyy"
                      value={dateOfAmendment}
                      onChange={(date) => setdateOfAmendment(date)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          variant="outlined"
                          // required
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
                      Upload News File
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

                  <Box>
                    <Typography sx={{ mt: 2 }}>Source</Typography>
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      value={newsSource}
                      onChange={(e) => setnewsSource(e.target.value)}
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
                      Map chapter (optional)
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
                    {dataTree && (
                      <CheckboxTree
                        showExpandAll
                        noCascade
                        nodes={dataTree}
                        checkModel="all"
                        checked={checked}
                        expanded={expanded}
                        iconsClass="fa5"
                        onCheck={onCheck}
                        onExpand={onExpand}
                      />
                    )}
                  </FormControl>
                </Box>
              </Grid>
              <Grid item lg={7} md={12}>
                <Typography sx={{ mb: 1 }}>News Descriptions</Typography>
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
                    height: "840px",
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
                    height: "425px",
                    resize_enabled: false,
                    removeButtons: false,
                  }}
                  initData="
                  <style type='text/css'>
                    span .tooltip {
                        display: inline-block;
                        text-indent:0em;
                    }
                    .tooltip{
                        text-decoration: underline;
                    }

                    .tooltip .tooltiptext {
                        visibility: hidden;
                        width: calc(100vw - 35px);
                        background: #121D28;
                        color:#fff;
                        border-radius: 6px;
                        padding: 5px 5px;
                        left: 10px;
                        border: 2px solid black;
                        line-height: normal;
                        text-decoration: none;
                        position: absolute;
                        z-index: 1;
                    }

                    .tooltip:hover .tooltiptext {
                        visibility: visible;
                        left: 2%;
                    }
                </style>
                    <div>Welcome to CKEditor 4!</div>
                  "
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

export default AddNewsDialog;
