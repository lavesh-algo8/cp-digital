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
import { EditorState, convertToRaw } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import {
  addRule,
  addSection,
  addSubNews,
  addSubRule,
  fetchSections,
  fetchSectionsByChapterId,
  fetchSubSections,
  fetchSubSectionsBySectionId,
} from "../../../../../redux/superAdminReducer/superAdminAction";

const AddSubNewsDialog = (props) => {
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

  const [news, setnews] = useState("");
  const [subnews, setsubnews] = useState("");
  const [newsSource, setnewsSource] = useState("");
  const [dateOfNews, setdateOfNews] = useState(new Date());
  const [value, setValue] = useState(EditorState.createEmpty());
  const [subsectionName, setsubsectionName] = React.useState([]);
  const [sectionName, setsectionName] = React.useState([]);
  const [chapterName, setchapterName] = React.useState([]);

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hey");
    const newsData = draftToHtml(convertToRaw(value.getCurrentContent()));
    const data = {
      sub_heading: subnews,
      date: dateOfNews,
      description: newsData,
      source: newsSource,
      chapter: chapterName.toString(),
      section: sectionName.toString(),
      sub_section: subsectionName.toString(),
    };
    console.log(data);
    await dispatch(addSubNews(data, props.newsId));
    setnews("");
    setsubnews("");
    setdateOfNews("");
    setValue("");
    setnewsSource("");
    setsubsectionName([]);
    setsectionName([]);
    setchapterName([]);
    props.setOpenDialog(false);
  };

  useEffect(() => {
    if (props) {
      setnews(props.newsName);
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
        <DialogTitle fontWeight={600}>Add Sub-News </DialogTitle>
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
                    height: "470px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography>Name of the News</Typography>
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      value={news}
                      onChange={(e) => setnews(e.target.value)}
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
                    <Typography sx={{ mt: 2 }}>Name of the Sub-News</Typography>
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
                              subsectionName.indexOf(
                                section?.sub_section_name
                              ) > -1
                            }
                          />
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
                    height: "540px",
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

export default AddSubNewsDialog;
