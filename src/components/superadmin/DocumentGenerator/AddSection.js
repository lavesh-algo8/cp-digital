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
import { useDispatch, useSelector } from "react-redux";
import { addSectionDocumentHeading } from "../../../redux/superAdminReducer/superAdminAction";

const AddSection = (props) => {
  const dispatch = useDispatch();
  const { selectedDocument = {} } = useSelector((state) => state.SuperAdmin);
  const handleDialogClose = () => {
    props.closeDialog(); // Use the prop.
  };
  const [numOfDocs, setNumOfDocs] = useState(1);
  const [sections, setSections] = useState({});

  const onSubmit = () => {
    let subData = [];
    for (let i = 0; i < Object.keys(sections)?.length; i++) {
      subData.push({
        // id: Math.ceil(Math.random() * 10000001),
        section: Object.values(sections)[i],
      });
    }
    console.log(subData);
    let headingSection = [];
    headingSection = subData.map((head) => head.section);
    console.log(headingSection);
    console.log(headingSection.toString());
    headingSection = headingSection.toString();
    dispatch(addSectionDocumentHeading(props.id, headingSection));
    console.log(props.id);
    setNumOfDocs(1);
    setSections({});
    props.handleDialogClose();
  };

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
        <DialogTitle fontWeight={600}>Add Section {props?.id}</DialogTitle>
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

            {Array.from({ length: numOfDocs }, (_, key) => (
              <Grid container sx={{ mt: 3 }}>
                <Grid item xs={8}>
                  <Box sx={{ display: "flex" }}>
                    <TextField
                      size="small"
                      id={`Section Title ${key + 1}`}
                      label={`Section Title ${key + 1}`}
                      name={`Section Title ${key + 1}`}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setSections({
                          ...sections,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      value={sections[`Section Title ${key + 1}`]}
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
                          delete sections[`Document Heading ${key + 1}`];
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

export default AddSection;
