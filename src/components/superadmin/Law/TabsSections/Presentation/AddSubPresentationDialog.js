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
import { useDispatch, useSelector } from "react-redux";
import {
  AddSubPresentation,
  fetchSections,
  fetchSectionsByChapterId,
  fetchSubSections,
  fetchSubSectionsBySectionId,
} from "../../../../../redux/superAdminReducer/superAdminAction";

const AddSubPresentationDialog = (props) => {
  const { subsectionsList, allChapterList, sectionsbychapterList } =
    useSelector((state) => state?.SuperAdmin);
  const dispatch = useDispatch();
  const [file, setFile] = useState(undefined);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

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
    fetchSections();
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

  const [presentation, setpresentation] = useState("");
  const [subpresentation, setsubpresentation] = useState("");
  const [presentationAuthor, setpresentationAuthor] = useState("");
  const [dateOfPresentation, setdateOfPresentation] = useState(new Date());
  const [subsectionName, setsubsectionName] = React.useState([]);
  const [sectionName, setsectionName] = React.useState([]);
  const [chapterName, setchapterName] = React.useState([]);

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hey");
    const data = {
      sub_title: subpresentation,
      date: dateOfPresentation,
      author: presentationAuthor,
      chapter: chapterName.toString(),
      section: sectionName.toString(),
      sub_section: subsectionName.toString(),
    };
    console.log(data);
    await dispatch(AddSubPresentation(data, props.presentationId));
    setpresentation("");
    setsubpresentation("");
    setdateOfPresentation("");
    setpresentationAuthor("");
    setsubsectionName([]);
    setsectionName([]);
    setchapterName([]);
    props.setOpenDialog(false);
  };

  useEffect(() => {
    if (props) {
      setpresentation(props.presentationName);
    }
  }, [props]);

  useEffect(() => {
    dispatch(fetchSubSections());
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
      >
        <DialogTitle fontWeight={600}>Add Sub-Presentation </DialogTitle>
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
                <Typography>Name of the Presentation</Typography>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={presentation}
                  onChange={(e) => setpresentation(e.target.value)}
                  aria-describedby="outlined-weight-helper-text"
                  fullWidth
                  disabled
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
                <Typography sx={{ mt: 2 }}>
                  Name of the Sub-Presentation
                </Typography>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={subpresentation}
                  onChange={(e) => setsubpresentation(e.target.value)}
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
                  {allChapterList?.map((chapter) => (
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
                      <Checkbox
                        checked={
                          subsectionName.indexOf(section?.sub_section_name) > -1
                        }
                      />
                      <ListItemText primary={section?.sub_section_name} />
                    </MenuItem>
                  ))}
                </Select>
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

export default AddSubPresentationDialog;
