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
  addCircular,
  addNotification,
  addSection,
  fetchSubSections,
} from "../../../../../redux/superAdminReducer/superAdminAction";

const AddCircularDialog = (props) => {
  const [file, setFile] = useState(undefined);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const [circularName, setcircularName] = useState("");
  const [circularNo, setcircularNo] = useState("");
  const [circularShortDescription, setcircularShortDescription] = useState("");
  const [dateOfCircular, setdateOfCircular] = useState(new Date());
  const [value, setValue] = useState(EditorState.createEmpty());
  const [subsectionName, setsubsectionName] = React.useState([]);

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };
  const { subsectionsList } = useSelector((state) => state?.SuperAdmin);

  const dispatch = useDispatch();

  const handleSubSectionSelectionChange = (event) => {
    console.log(event);
    const {
      target: { value },
    } = event;
    setsubsectionName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hey");
    const circularDetails = draftToHtml(
      convertToRaw(value.getCurrentContent())
    );
    const data = {
      circular_no: circularNo,
      circular_heading: circularName,
      circular_date: dateOfCircular,
      short_desc: circularShortDescription,
      circular_desc: circularDetails,
      sub_sections: subsectionName.toString(),
    };
    console.log(data);

    await dispatch(addCircular(data));
    setcircularName("");
    setcircularNo("");
    setcircularShortDescription("");
    setdateOfCircular("");
    setsubsectionName([]);
    setValue("");
    props.setOpenDialog(false);
  };

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
        <DialogTitle fontWeight={600}>Add Circular </DialogTitle>
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
                    value={circularName}
                    onChange={(e) => setcircularName(e.target.value)}
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

                  <FormControl
                    className={{
                      minWidth: 300,
                    }}
                    sx={{ mt: 2 }}
                  >
                    <Typography htmlFor="age-native-simple">Map to</Typography>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      multiple
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
                      {subsectionsList.map((section) => (
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
                <Typography sx={{ mb: 1 }}>Circular Descriptions</Typography>
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
                    height: "430px",
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

export default AddCircularDialog;
