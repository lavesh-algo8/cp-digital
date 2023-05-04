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
  editNotification,
  fetchActByCategory,
  fetchAllCategory,
  fetchChapters,
  fetchSectionsByChapterId,
  fetchSubSections,
  fetchSubSectionsBySectionId,
  getDataTree,
} from "../../../../../redux/superAdminReducer/superAdminAction";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { CKEditor } from "ckeditor4-react";
import DropdownTreeSelect from "react-dropdown-tree-select";

import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const EditNotificationDialog = (props) => {
  const [file, setFile] = useState(undefined);

  const copyData = props?.notificationsDetails;

  console.log(copyData);
  const checkedData = [
    ...copyData.law,
    ...copyData.act,
    ...copyData.chapter,
    ...copyData.section,
    ...copyData.subsection,
  ];

  const {
    dataTree,
    categoryAllList,
    actsByCategoryList,
    chapterList,
    subsectionsList,
    allChapterList,
    sectionsbychapterList,
  } = useSelector((state) => state?.SuperAdmin);

  function dfs(o, target) {
    if (o.value === target) return [target];
    if (!o.children) return false;
    let path;
    o.children.find((x) => (path = dfs(x, target)));
    if (path) {
      return [o.value].concat(path);
    }
  }
  let path;
  // dataTree.find((x) => (path = dfs(x, "63995983506bac3aee929016")));
  // console.log(path);

  const expandedDataArr = [];
  checkedData.map((value) => {
    dataTree.find((x) => (path = dfs(x, value)));
    if (path?.length > 0) {
      expandedDataArr.push(...path);
    }
  });
  console.log(expandedDataArr);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const [notificationName, setnotificationName] = useState("");
  const [notificationNo, setnotificationNo] = useState("");
  const [notificationShortDescription, setnotificationShortDescription] =
    useState("");
  const [dateOfNotification, setdateOfNotification] = useState(new Date());
  const [value, setValue] = useState("");
  const [subsectionName, setsubsectionName] = React.useState([]);
  const [sectionName, setsectionName] = React.useState([]);
  const [chapterName, setchapterName] = React.useState([]);
  const [actName, setactName] = React.useState([]);
  const [lawName, setlawName] = React.useState([]);
  const [treeData, settreeData] = useState([]);

  const [dateOfAmendment, setdateOfAmendment] = useState(null);

  // tree data implemented
  const [checked, setchecked] = useState(checkedData);
  const [expanded, setexpanded] = useState(expandedDataArr);

  const onCheck = (checked) => {
    console.log(checked);

    setchecked(checked);
  };

  const onExpand = (expanded) => {
    setexpanded(expanded);
  };

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

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
    console.log("hey");
    // const notificationDetails = draftToHtml(
    //   convertToRaw(value.getCurrentContent())
    // );
    const notificationDetails = value;
    const data = {
      notification_no: notificationNo,
      notification_heading: notificationName,
      upload_date: dateOfNotification,
      short_desc: notificationShortDescription,
      notification_details: notificationDetails,
      amendment_date: dateOfAmendment,
      mapTo: checked,

      // law: lawName.toString(),
      // act: actName.toString(),
      // chapter: chapterName.toString(),
      // section: sectionName.toString(),
      // sub_section_no: parseFloat(subsectionName.toString()),
    };
    console.log(data);

    await dispatch(editNotification(data, props.notificationsDetails._id));
    setnotificationNo("");
    setnotificationShortDescription("");
    setdateOfNotification(null);
    setdateOfAmendment(null);
    setsubsectionName([]);
    setchapterName([]);
    setsectionName([]);
    setValue("");
    props.setOpenDialog(false);
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
      setnotificationName(props.notificationsDetails.notification_heading);
      setnotificationNo(props.notificationsDetails.notification_no);
      setdateOfAmendment(props.notificationsDetails.amendment_date);
      setdateOfNotification(props.notificationsDetails.upload_date);
      setnotificationShortDescription(props.notificationsDetails.short_desc);

      setsubsectionName([
        props?.notificationsDetails?.subsection?.sub_regulation_no,
      ]);
      if (props.notificationsDetails?.section?.section_name != null) {
        setsectionName([props?.notificationsDetails?.section?.section_name]);
        handleSectionSelectionChange(
          12,
          props?.notificationsDetails?.section?._id
        );
      }
      if (props.notificationsDetails?.chapter?.chapter != null) {
        setchapterName([props?.notificationsDetails?.chapter?.chapter]);
        handleChapterSelectionChange(
          23,
          props?.notificationsDetails?.chapter?._id
        );
      }
      if (props?.notificationsDetails) {
        // setValue(
        //   htmlToDraftBlocks(props.notificationsDetails.notification_details)
        // );
        setValue(props.notificationsDetails.notification_details);
      }
      if (props.notificationsDetails?.act?.act != null) {
        setactName([props?.notificationsDetails?.act?.act]);
        handleChapterSelectionChange(23, props?.notificationsDetails?.act?._id);
      }
      if (props.notificationsDetails?.law?.category != null) {
        setlawName([props?.notificationsDetails?.law?.category]);
        handleChapterSelectionChange(23, props?.notificationsDetails?.law?._id);
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
        <DialogTitle fontWeight={600}>Edit Notification </DialogTitle>
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
                  <Typography>Notification Number</Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={notificationNo}
                    onChange={(e) => setnotificationNo(e.target.value)}
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
                    Name of the Notification
                  </Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={notificationName}
                    onChange={(e) => setnotificationName(e.target.value)}
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

                  <Typography sx={{ mt: 2 }}>Date of Notification</Typography>
                  <DesktopDatePicker
                    inputFormat="dd/MM/yyyy"
                    value={dateOfNotification}
                    onChange={(date) => setdateOfNotification(date)}
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

                  <Typography sx={{ mt: 2 }}>Short Description </Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={notificationShortDescription}
                    onChange={(e) =>
                      setnotificationShortDescription(e.target.value)
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
                      Upload Notification File
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
                <Typography sx={{ mb: 1 }}>
                  Notification Descriptions
                </Typography>
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

                {value && (
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
                )}
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

export default EditNotificationDialog;
