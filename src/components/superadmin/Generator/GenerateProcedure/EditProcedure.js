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
  CreateGenerateProcedure,
  editGenerateProcedure,
  fetchCategory,
  fetchGenerateProcedure,
} from "../../../../redux/superAdminReducer/superAdminAction";

const EditProcedure = (props) => {
  const { categoryList } = useSelector((state) => state?.SuperAdmin);

  const dispatch = useDispatch();
  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };
  const [numOfDocs, setNumOfDocs] = useState(1);
  const [newDocumentData, setNewDocumentData] = useState({
    law: props.selectedProcedure?.law_name?.category,
    act: props.selectedProcedure?.act_name?.act,
    procedure: props.selectedProcedure?.procedure,
  });
  const [headings, setHeadings] = useState({});
  console.log(categoryList);

  console.log(
    categoryList?.filter((cat) => cat.category === newDocumentData.law)[0]?.acts
  );

  const ActList = categoryList?.filter(
    (cat) => cat.category === newDocumentData.law
  )[0]?.acts;

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(newDocumentData);
    let procedureData = {
      ...newDocumentData,
      type: "",
      processidarr: [],
    };
    console.log(procedureData);
    const procedureId = props?.selectedProcedure?.procedure_id;
    await dispatch(editGenerateProcedure(procedureData, procedureId));
    await dispatch(fetchGenerateProcedure());
    handleDialogClose();
  };

  const onChange = (e) => {
    console.log(e.target.name);
    if (e.target.name === "law") {
      console.log("in");
      setNewDocumentData({
        ...newDocumentData,
        act: "",
        [e.target.name]: e.target.value,
      });
    } else {
      setNewDocumentData({
        ...newDocumentData,
        [e.target.name]: e.target.value,
      });
    }
  };

  //   useEffect(() => {
  //     dispatch(fetchCategory());
  //   }, []);

  useEffect(() => {
    if (props) {
      console.log(props);
      setNewDocumentData({
        ...newDocumentData,
        law: props.selectedProcedure?.law_name?.category,
      });
      setNewDocumentData({
        ...newDocumentData,
        act: props.selectedProcedure?.act_name?.act,
      });
      setNewDocumentData({
        ...newDocumentData,
        procedure: props.selectedProcedure?.procedure,
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
        <DialogTitle fontWeight={600}>Edit Procedure</DialogTitle>
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
                <Typography sx={{ mb: 1 }}>Procedure Name</Typography>
                <TextField
                  size="small"
                  id="procedure"
                  //   label="Procedure"
                  placeholder="Procedure Name"
                  variant="outlined"
                  fullWidth
                  name="procedure"
                  onChange={onChange}
                  value={newDocumentData.procedure}
                  required
                />
              </Box>

              <Box sx={{ display: "flex", mt: 3 }}>
                <FormControl fullWidth size="small">
                  <Typography sx={{ mb: 1 }} id="demo-simple-select-label">
                    Law
                  </Typography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // label="Law"
                    name="law"
                    onChange={onChange}
                    value={newDocumentData.law}
                    required
                    displayEmpty
                    renderValue={(value) =>
                      value || <Box sx={{ color: "gray" }}>Select Law</Box>
                    }
                  >
                    {categoryList.map((desig, index) => (
                      <MenuItem key={desig.category} value={desig.category}>
                        {desig.category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small" sx={{ ml: 2 }}>
                  <Typography sx={{ mb: 1 }} id="demo-simple-select-label">
                    Act
                  </Typography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // label="Act"
                    name="act"
                    onChange={onChange}
                    value={newDocumentData.act}
                    required
                    displayEmpty
                    renderValue={(value) => {
                      if (value) {
                        return value;
                      } else {
                        return <Box sx={{ color: "gray" }}>Select Act</Box>;
                      }
                    }}
                  >
                    {ActList.map((item, index) => (
                      <MenuItem key={item.act} value={item.act}>
                        {item.act}
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

export default EditProcedure;
