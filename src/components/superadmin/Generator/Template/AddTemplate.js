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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  addDocument,
  addTemplate,
  fetchCategory,
  getDocuments,
} from "../../../../redux/superAdminReducer/superAdminAction";

const AddTemplate = (props) => {
  const { categoryList, listOfProcedures } = useSelector(
    (state) => state?.SuperAdmin
  );

  const dispatch = useDispatch();
  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };
  const [numOfDocs, setNumOfDocs] = useState(1);
  const [newDocumentData, setNewDocumentData] = useState({});
  const [headings, setHeadings] = useState({});

  console.log(
    categoryList?.filter((cat) => cat.category === newDocumentData.law)[0]?.acts
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(headings);
    console.log({
      ...newDocumentData,
    });
    let subData = [];
    for (let i = 0; i < Object.keys(headings)?.length; i++) {
      subData.push({
        id: Math.ceil(Math.random() * 10000001),
        heading: Object.values(headings)[i],
        sections: [],
      });
    }
    console.log(subData);
    let templateHeadingsArray = [];
    templateHeadingsArray = subData.map((head) => head.heading);
    console.log(templateHeadingsArray);

    const templateHeadings = templateHeadingsArray.map((heading) => {
      return { templateHeading: heading.trim(), templateSection: [] };
    });

    let finalData = {
      law: newDocumentData.law,
      act: newDocumentData.act,
      procedure: newDocumentData.procedure,
      type: newDocumentData.type || "",
      templateHeadings,
    };
    console.log(finalData);
    const res = await dispatch(addTemplate(finalData));
    if (res) {
      handleDialogClose();
    }
  };

  const onChange = (e) => {
    setNewDocumentData({ ...newDocumentData, [e.target.name]: e.target.value });
  };

  const access = ["Procedures", "Calculators", "Content mangement"];

  useEffect(() => {
    dispatch(fetchCategory());
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
        maxWidth="lg"
      >
        <DialogTitle fontWeight={600}>Add New Template</DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent style={{ width: "480px" }}>
          <div style={{ width: "100%" }}>
            <form onSubmit={onSubmit}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></Box>

              <Box sx={{ display: "flex" }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Law*</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Law"
                    name="law"
                    onChange={onChange}
                    value={newDocumentData.law}
                    required
                  >
                    {categoryList.map((desig, index) => (
                      <MenuItem key={desig.category} value={desig.category}>
                        {desig.category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: "flex", mt: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Act*</InputLabel>
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
              </Box>

              {/* <Box sx={{ display: "flex", mt: 3 }}>
                <TextField
                  size="small"
                  id="procedure"
                  label="Procedure"
                  variant="outlined"
                  fullWidth
                  name="procedure"
                  onChange={onChange}
                  value={newDocumentData.procedure}
                  required
                />
              </Box> */}

              <Box sx={{ display: "flex", mt: 3 }}>
                {/* <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Procedure
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Procedure"
                    name="procedure"
                    onChange={onChange}
                    // value={newDocumentData.procedure}
                    required
                  >
                    {listOfProcedures.map((item, index) => (
                      <MenuItem key={item.procedure} value={item}>
                        {item.procedure}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}

                <TextField
                  size="small"
                  id="procedure"
                  label="Procedure"
                  variant="outlined"
                  fullWidth
                  name="procedure"
                  required
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
                        id={`Template Heading ${key + 1}`}
                        label={`Template Heading ${key + 1}`}
                        name={`Template Heading ${key + 1}`}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                          setHeadings({
                            ...headings,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        required
                        value={headings[`Template Heading ${key + 1}`]}
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
                            delete headings[`Template Heading ${key + 1}`];
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
                >
                  Create
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

export default AddTemplate;
