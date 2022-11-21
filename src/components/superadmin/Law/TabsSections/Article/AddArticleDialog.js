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
  addArticle,
  fetchActByCategory,
  fetchAllCategory,
  fetchAllChapters,
  fetchChapters,
  fetchSections,
  fetchSectionsByChapterId,
  fetchSubSectionsBySectionId,
} from "../../../../../redux/superAdminReducer/superAdminAction";

const AddArticleDialog = (props) => {
  const [file, setFile] = useState(undefined);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const [articleName, setarticleName] = useState("");
  const [subArticleWrittenBy, setsubArticleWrittenBy] = useState("");
  const [dateOfArticle, setdateOfArticle] = useState(new Date());
  const [value, setValue] = useState(EditorState.createEmpty());
  const [subsectionName, setsubsectionName] = React.useState([]);
  const [sectionName, setsectionName] = React.useState([]);
  const [chapterName, setchapterName] = React.useState([]);
  const [actName, setactName] = React.useState([]);
  const [lawName, setlawName] = React.useState([]);

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };
  const {
    categoryAllList,
    actsByCategoryList,
    chapterList,
    subsectionsList,
    sectionsbychapterList,
  } = useSelector((state) => state?.SuperAdmin);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hey");
    const articlesDetails = draftToHtml(
      convertToRaw(value.getCurrentContent())
    );
    const data = {
      title: articleName,
      date: dateOfArticle,
      description: articlesDetails,
      written_by: subArticleWrittenBy,
      law: lawName.toString(),
      act: actName.toString(),
      chapter: chapterName.toString(),
      section: sectionName.toString(),
      sub_section_no: parseFloat(subsectionName.toString()),
    };
    console.log(data);
    await dispatch(addArticle(data));
    setarticleName("");
    setdateOfArticle("");
    setsubsectionName([]);
    setsectionName([]);
    setchapterName([]);
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

  useEffect(() => {
    dispatch(fetchAllCategory());
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
        <DialogTitle fontWeight={600}>Add Article </DialogTitle>
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
                  <Typography>Name of the Article</Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={articleName}
                    onChange={(e) => setarticleName(e.target.value)}
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

                  <Typography sx={{ mt: 2 }}>Date of Article</Typography>
                  <DesktopDatePicker
                    inputFormat="dd/MM/yyyy"
                    value={dateOfArticle}
                    onChange={(date) => setdateOfArticle(date)}
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

                  <Typography sx={{ mt: 2 }}>Written By</Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={subArticleWrittenBy}
                    onChange={(e) => setsubArticleWrittenBy(e.target.value)}
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

                  <FormControl
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
                  </FormControl>
                </Box>
              </Grid>
              <Grid item lg={7} md={12}>
                <Typography sx={{ mb: 1 }}>Article Descriptions</Typography>
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
                    height: "530px",
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

export default AddArticleDialog;
