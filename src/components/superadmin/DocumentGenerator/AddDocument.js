import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";

const AddDocument = (props) => {
  const dispatch = useDispatch();
  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };
  const [numOfDocs, setNumOfDocs] = useState(1);
  const [newDocumentData, setNewDocumentData] = useState({});
  const [headings, setHeadings] = useState({});

  const onSubmit = () => {
    console.log({
      ...newDocumentData,
      numOfDocs,
      headings,
    });
    let subData = [];
    for (let i = 0; i < Object.keys(headings)?.length; i++) {
      subData.push({
        heading: Object.values(headings)[i],
      });
    }
    dispatch({
      type: "ADD_DOCUMENTS",
      payload: {
        ...newDocumentData,
        numOfDocs,
        headings: subData,
      },
    });
  };

  const onChange = (e) => {
    setNewDocumentData({ ...newDocumentData, [e.target.name]: e.target.value });
  };

  const Designation = [
    {
      value: "Executive",
    },
    {
      value: "Director",
    },
  ];

  const access = ["Procedures", "Calculators", "Content mangement"];

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
        maxWidth="lg"
      >
        <DialogTitle fontWeight={600}>Add New Document</DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent style={{ width: "480px" }}>
          <div style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Box>

            <Box sx={{ display: "flex", mt: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Law</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Law"
                  name="law"
                  onChange={onChange}
                  value={newDocumentData.law}
                >
                  {Designation.map((desig, index) => (
                    <MenuItem key={desig.value} value={desig.value}>
                      {desig.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", mt: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Act</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Act"
                  name="act"
                  onChange={onChange}
                  value={newDocumentData.act}
                >
                  {Designation.map((desig, index) => (
                    <MenuItem key={desig.value} value={desig.value}>
                      {desig.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", mt: 3 }}>
              <TextField
                size="small"
                id="procedure"
                label="Procedure"
                variant="outlined"
                fullWidth
                name="procedure"
                onChange={onChange}
                value={newDocumentData.procedure}
              />
            </Box>

            <Box sx={{ display: "flex", mt: 3 }}>
              <TextField
                size="small"
                id="type"
                label="Type (Optional)"
                variant="outlined"
                fullWidth
                name="type"
                onChange={onChange}
                value={newDocumentData.type}
              />
            </Box>

            {Array.from({ length: numOfDocs }, (_, key) => (
              <Grid container sx={{ mt: 3 }}>
                <Grid item xs={8}>
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      size="small"
                      id={`Document Heading ${key + 1}`}
                      label={`Document Heading ${key + 1}`}
                      name={`Document Heading ${key + 1}`}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setHeadings({
                          ...headings,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      value={headings[`Document Heading ${key + 1}`]}
                    />
                  </Box>
                </Grid>
                {key + 1 === numOfDocs && (
                  <>
                    <Grid container item xs={2} style={{ padding: "0 8px" }}>
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        onClick={() => setNumOfDocs(numOfDocs + 1)}
                        disabled={numOfDocs === 4}
                      >
                        <AddIcon />
                      </Button>
                    </Grid>
                    <Grid container item xs={2} style={{ padding: "0 8px" }}>
                      <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          setNumOfDocs(numOfDocs - 1);
                          delete headings[`Document Heading ${key + 1}`];
                        }}
                        disabled={numOfDocs === 1}
                      >
                        <CloseIcon />
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            ))}

            <Box sx={{ display: "flex" }}>
              <Button
                size="large"
                color="greycol"
                variant="contained"
                sx={{
                  mt: 3,
                  px: 5,
                  textTransform: "none",
                }}
                fullWidth
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
                  ml: 2,
                  color: "white",
                  textTransform: "none",
                }}
                fullWidth
                onClick={onSubmit}
              >
                Create
              </Button>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
      {/* add admins dialog */}
    </>
  );
};

export default AddDocument;
