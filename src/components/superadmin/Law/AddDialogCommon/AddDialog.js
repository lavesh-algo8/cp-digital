import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
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
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const AddDialog = (props) => {
  const [law, setLaw] = useState("");
  const [value, setValue] = useState("");

  const handleDialogClose = () => {
    props.setopenDialog(false); // Use the prop.
  };

  const names = [
    { id: "1", value: "Oliver Hansen" },
    { id: "2", value: "Van Henry" },
    { id: "3", value: "Van Henry" },
    { id: "4", value: "Van Henry" },
    { id: "5", value: "Van Henry" },
    { id: "6", value: "Van Henry" },
    { id: "7", value: "Van Henry" },
    { id: "8", value: "Van Henry" },
    { id: "9", value: "Van Henry" },
    { id: "10", value: "Van Henry" },
    { id: "11", value: "Van Henry" },
    { id: "12", value: "Van Henry" },
    { id: "13", value: "Van Henry" },
    { id: "14", value: "Van Henry" },
    { id: "15", value: "Van Henry" },
    { id: "16", value: "Van Henry" },
    { id: "17", value: "Van Henry" },
    { id: "18", value: "Van Henry" },
    { id: "19", value: "Van Henry" },
    { id: "20", value: "Van Henry" },
    { id: "21", value: "Van Henry" },
  ];
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      {/* add  dialog */}
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
        <DialogTitle fontWeight={600}>Add {props.name} </DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item lg={5}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ mt: 2 }}>Name of the {props.name}</Typography>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={law}
                  onChange={(e) => setLaw(e.target.value)}
                  aria-describedby="outlined-weight-helper-text"
                  fullWidth
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
                  <Typography htmlFor="age-native-simple">Map to</Typography>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={personName}
                    name="first"
                    onChange={handleChange}
                    input={
                      <OutlinedInput
                        sx={{ mt: 1 }}
                        notched={false}
                        label="Tag"
                        size="small"
                      />
                    }
                    renderValue={(selected) =>
                      selected.map((obj) => names[obj - 1].value).join(", ")
                    }
                  >
                    {names.map((name) => (
                      <MenuItem key={name.id} value={name.id}>
                        <Checkbox checked={personName.indexOf(name.id) > -1} />
                        <ListItemText primary={name.value} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Typography sx={{ mt: 2 }}>Regulation Name</Typography>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={law}
                  onChange={(e) => setLaw(e.target.value)}
                  aria-describedby="outlined-weight-helper-text"
                  fullWidth
                  size="small"
                  notched={false}
                  label="Law"
                  sx={{
                    mt: 1,
                  }}
                />

                <Typography sx={{ mt: 2 }}>Regulation No.</Typography>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={law}
                  onChange={(e) => setLaw(e.target.value)}
                  aria-describedby="outlined-weight-helper-text"
                  fullWidth
                  size="small"
                  notched={false}
                  label="Law"
                  sx={{
                    mt: 1,
                  }}
                />

                <Typography sx={{ mt: 2 }}>Date of update</Typography>
                <DesktopDatePicker
                  //   label="Date desktop"
                  inputFormat="dd/MM/yyyy"
                  value={Date()}
                  //   onChange={handleChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      variant="outlined"
                      sx={{
                        mt: 1,
                        "& legend": { display: "none" },
                        "& fieldset": { top: 0 },
                      }}
                    />
                  )}
                />

                <Typography sx={{ mt: 2 }}>Updated by </Typography>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={law}
                  onChange={(e) => setLaw(e.target.value)}
                  aria-describedby="outlined-weight-helper-text"
                  fullWidth
                  size="small"
                  notched={false}
                  label="Law"
                  sx={{
                    mt: 1,
                  }}
                />

                <Typography sx={{ mt: 2 }}>Sorting </Typography>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={law}
                  onChange={(e) => setLaw(e.target.value)}
                  aria-describedby="outlined-weight-helper-text"
                  fullWidth
                  size="small"
                  notched={false}
                  label="Law"
                  sx={{
                    mt: 1,
                  }}
                />
              </Box>
            </Grid>
            <Grid item lg={7}>
              <Typography>Regulation Details</Typography>
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
                  height: "380px",
                  width: "100%",
                }}
                onEditorStateChange={setValue}
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
              // onClick={onSubmit}
            >
              Save
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddDialog;
