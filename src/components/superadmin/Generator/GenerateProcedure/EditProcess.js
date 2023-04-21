import React, { useEffect, useState } from "react";
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
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateProcess,
  addDocument,
  fetchCategory,
  fetchProcessesByProcedure,
  getDocuments,
  updateProcess,
} from "../../../../redux/superAdminReducer/superAdminAction";
import { useParams } from "react-router-dom";

const numberOfDays = [
  { no: "01" },
  { no: "02" },
  { no: "03" },
  { no: "04" },
  { no: "05" },
  { no: "06" },
  { no: "07" },
  { no: "08" },
  { no: "09" },
  { no: "10" },
  { no: "11" },
];

const EditProcess = (props) => {
  const params = useParams();
  const { categoryList } = useSelector((state) => state?.SuperAdmin);
  //   alert(String(props.processDetails?.numOfDays));
  const dispatch = useDispatch();
  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };
  const [numOfDocs, setNumOfDocs] = useState(1);
  const [newDocumentData, setNewDocumentData] = useState({
    process: props.processDetails?.process,
    numofdays: String(props.processDetails?.numOfDays)?.padStart(2, "0"),
  });
  const [headings, setHeadings] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log({
      ...newDocumentData,
    });
    let finalData = {
      process: newDocumentData.process,
      numofdays: parseInt(newDocumentData.numofdays),
      templateidarr: [],
    };
    console.log(finalData);
    await dispatch(updateProcess(finalData, props?.processDetails?._id));
    await dispatch(fetchProcessesByProcedure(params.procedureId));
    setNewDocumentData({});
    handleDialogClose();
  };

  const onChange = (e) => {
    setNewDocumentData({ ...newDocumentData, [e.target.name]: e.target.value });
  };

  const access = ["Procedures", "Calculators", "Content mangement"];

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  useEffect(() => {
    if (props) {
      console.log(props);
      setNewDocumentData({
        ...newDocumentData,
        process: props.processDetails?.process,
      });
      setNewDocumentData({
        ...newDocumentData,
        numofdays: String(props.processDetails?.numOfDays)?.padStart(2, "0"),
      });
    }
  }, [props]);

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
        <DialogTitle fontWeight={600}>Edit Process</DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <div style={{ width: "100%" }}>
            <form onSubmit={onSubmit}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Box>

              <Box>
                <Typography sx={{ mb: 1 }}>Process Name</Typography>
                <TextField
                  size="small"
                  id="process"
                  placeholder="Process Name"
                  variant="outlined"
                  fullWidth
                  name="process"
                  onChange={onChange}
                  value={newDocumentData.process}
                  required
                />
              </Box>

              <Box sx={{ display: "flex", mt: 3 }}>
                <FormControl fullWidth size="small">
                  <Typography sx={{ mb: 1 }} id="demo-simple-select-label">
                    Total No. of Days
                  </Typography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="numofdays"
                    name="numofdays"
                    onChange={onChange}
                    value={newDocumentData.numofdays}
                    required
                    displayEmpty
                    renderValue={(value) =>
                      value || (
                        <Box sx={{ color: "gray" }}>Select No. of Days</Box>
                      )
                    }
                  >
                    {numberOfDays.map((item, index) => (
                      <MenuItem key={item.no} value={item.no}>
                        {item.no}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small" sx={{ ml: 2 }}>
                  <Typography sx={{ mb: 1 }} id="demo-simple-select-label">
                    Documents
                  </Typography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="documents"
                    onChange={onChange}
                    value={newDocumentData.documents}
                    // required
                    displayEmpty
                    renderValue={(value) =>
                      value || (
                        <Box sx={{ color: "gray" }}>Select Documents</Box>
                      )
                    }
                  >
                    {categoryList
                      ?.filter((cat) => cat.category === newDocumentData.law)[0]
                      ?.acts?.map((desig, index) => (
                        <MenuItem key={desig.act} value={desig.act}>
                          {desig.act}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>

              {/* <Box sx={{ display: "flex", mt: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Act</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Act"
                    name="act"
                    onChange={onChange}
                    value={newDocumentData.act}
                    required
                  >
                    {categoryList
                      ?.filter((cat) => cat.category === newDocumentData.law)[0]
                      ?.acts?.map((desig, index) => (
                        <MenuItem key={desig.act} value={desig.act}>
                          {desig.act}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box> */}

              {/* <Box sx={{ display: "flex", mt: 3 }}>
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
              </Box> */}

              {/* {Array.from({ length: numOfDocs }, (_, key) => (
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
                        required
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
              ))} */}

              <Box
                sx={{ display: "flex", justifyContent: "center", mb: 3, mt: 2 }}
              >
                <Button
                  size="large"
                  color="greycol"
                  variant="contained"
                  sx={{
                    mt: 3,
                    px: 5,
                    textTransform: "none",
                    width: "30%",
                  }}
                  //   fullWidth
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
                    width: "30%",
                  }}
                  //   fullWidth
                >
                  Update
                </Button>
              </Box>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      {/* add admins dialog */}
    </>
  );
};

export default EditProcess;
