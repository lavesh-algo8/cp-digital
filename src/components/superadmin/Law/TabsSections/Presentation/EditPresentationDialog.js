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
import { useDispatch, useSelector } from "react-redux";
import {
  AddSubPresentation,
  editPresentation,
  EditSubPresentation,
  fetchActByCategory,
  fetchAllCategory,
  fetchAllChapters,
  fetchChapters,
  fetchSections,
  fetchSectionsByChapterId,
  fetchSubSections,
  fetchSubSectionsBySectionId,
  getDataTree,
} from "../../../../../redux/superAdminReducer/superAdminAction";
import DropdownTreeSelect from "react-dropdown-tree-select";

const EditPresentationDialog = (props) => {
  const copyData = props?.presentationDetails;

  const [presentation, setpresentation] = useState("");
  const [presentationAuthor, setpresentationAuthor] = useState("");
  const [dateOfPresentation, setdateOfPresentation] = useState(new Date());
  const [subsectionName, setsubsectionName] = React.useState("");
  const [sectionName, setsectionName] = React.useState([]);
  const [chapterName, setchapterName] = React.useState([]);
  const [actName, setactName] = React.useState([]);
  const [lawName, setlawName] = React.useState([]);
  const [treeData, settreeData] = useState([]);

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

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hey");
    const data = {
      title: presentation,
      date: dateOfPresentation,
      author: presentationAuthor,
      mapTo: treeData,
      // law: lawName.toString(),
      // act: actName.toString(),
      // chapter: chapterName.toString(),
      // section: sectionName.toString(),
      // sub_section_no: parseFloat(subsectionName.toString()),
    };
    console.log(data);
    await dispatch(editPresentation(data, props?.presentationDetails._id));
    setpresentation("");
    setdateOfPresentation(null);
    setpresentationAuthor("");
    setsubsectionName([]);
    setsectionName([]);
    setchapterName([]);
    props.setOpenDialog(false);
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
    dispatch(getDataTree());
  }, []);

  useEffect(() => {
    if (props) {
      setpresentation(props.presentationDetails.title);
      setpresentationAuthor(props.presentationDetails.author);
      setdateOfPresentation(props.presentationDetails.date);
      setsubsectionName(
        props?.presentationDetails?.subsection?.sub_regulation_no
      );
      if (props.presentationDetails?.section?.section_name != null) {
        setsectionName([props?.presentationDetails?.section?.section_name]);
        handleSectionSelectionChange(
          12,
          props?.presentationDetails?.section?._id
        );
      }
      if (props.presentationDetails?.chapter?.chapter != null) {
        setchapterName([props?.presentationDetails?.chapter?.chapter]);
        handleChapterSelectionChange(
          23,
          props?.presentationDetails?.chapter?._id
        );
      }
      if (props.presentationDetails?.act?.act != null) {
        setactName([props?.presentationDetails?.act?.act]);
        handleChapterSelectionChange(23, props?.presentationDetails?.act?._id);
      }
      if (props.presentationDetails?.law?.category != null) {
        setlawName([props?.presentationDetails?.law?.category]);
        handleChapterSelectionChange(23, props?.presentationDetails?.law?._id);
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
        maxWidth="md"
      >
        <DialogTitle fontWeight={600}>Edit Presentation </DialogTitle>
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
                <Typography sx={{ mt: 2 }}>Name of the Presentation</Typography>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={presentation}
                  onChange={(e) => setpresentation(e.target.value)}
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
                <Typography sx={{ mt: 2 }}>Date of presentation</Typography>
                <DesktopDatePicker
                  inputFormat="dd/MM/yyyy"
                  value={dateOfPresentation}
                  onChange={(date) => setdateOfPresentation(date)}
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
                  Upload Presentation File
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
                <Typography sx={{ mt: 2 }}>Author</Typography>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={presentationAuthor}
                  onChange={(e) => setpresentationAuthor(e.target.value)}
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
                <Typography htmlFor="age-native-simple">Map chapter</Typography>
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
                          sectionName.indexOf(section?.section.section_name) >
                          -1
                        }
                      />
                      <ListItemText primary={section?.section.section_name} />
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

export default EditPresentationDialog;
