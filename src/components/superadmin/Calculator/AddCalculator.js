import {
  Grid,
  TextField,
  Button,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  Box,
  IconButton,
  DialogContent,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import { FormBuilder } from "@formio/react";
import "formiojs/dist/formio.builder.min.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddSimpleCalculator } from "../../../redux/superAdminReducer/superAdminAction";
import AddFormula from "./AddFormula";

const AddCalculator = (props) => {
  const { formulaAdded } = useSelector((state) => state?.SuperAdmin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fields, setFields] = useState([]);

  const [title, setTitle] = useState("");
  const [formula, setFormula] = useState(formulaAdded);
  const [myform, setmyform] = useState("");
  const schemaRef = useRef();
  const [openDialog, setopenDialog] = React.useState(false);

  const onSubmitHandler = async () => {
    if (title === "") {
      alert("Please Enter Form Title");
      return;
    }
    if (formulaAdded === "") {
      alert("Please Enter Formula");
      return;
    }
    console.log(schemaRef);
    const formData = { ...schemaRef.current, title };
    const calculatorData = {
      calculator_name: title,
      formula: formulaAdded && formulaAdded.join(" "),
      formData: formData,
    };
    console.log(calculatorData);
    const success = await dispatch(AddSimpleCalculator(calculatorData));
    if (success) {
      handleDialogClose();
    }
  };

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  const handleFormula = () => {
    console.log(schemaRef.current.components);
    let objArray = schemaRef.current.components;
    var processed = objArray.map(({ label }) => ({ label }.label));
    console.log(processed);
    setFields(processed);
  };

  return (
    <>
      {/* add admins dialog */}

      {openDialog && (
        <AddFormula
          openDialog={openDialog}
          setOpenDialog={setopenDialog}
          fields={fields}
          formulaEdit={formulaAdded && "Edit"}
        />
      )}

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
        disableEnforceFocus
      >
        <DialogTitle fontWeight={600}>Add Calculator</DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Grid
            container
            spacing={3}
            sx={{
              position: "relative",
              zIndex: "12",
              borderRadius: "4px",
              overflowY: "scroll",
              pb: 4,
            }}
          >
            <Grid
              container
              item
              xs={12}
              sx={{
                backgroundColor: "white",
                borderRadius: "6px",
                pr: 2,
              }}
            >
              <Container
                sx={{ mb: 3, display: "flex", justifyContent: "center" }}
              >
                <Typography variant="h5" fontWeight="bold">
                  Add Calculator
                </Typography>
              </Container>
              <Container maxWidth={false}>
                <Grid container>
                  <Grid item lg={5} xs={4}>
                    <Typography sx={{ pb: 1, fontWeight: "bold" }}>
                      Calculator Name :
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      required
                      id="outlined-required"
                      // label="Document Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      // disabled
                    />
                  </Grid>
                  <Grid item lg={7} xs={8} textAlign="right">
                    <Button variant="contained" onClick={onSubmitHandler}>
                      Save
                    </Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item lg={8} xs={12}>
                    <Typography sx={{ mt: 2, pb: 1 }}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Formula :
                      </Typography>{" "}
                      (Add the formula with field names created below)
                    </Typography>
                    <TextField
                      rows={3}
                      multiline
                      fullWidth
                      size="small"
                      required
                      id="outlined-required"
                      // label="Document Title"
                      value={(formulaAdded && formulaAdded.join(" ")) || ""}
                      onChange={(e) => setFormula(e.target.value)}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Container>
              <Container>
                <Button
                  sx={{ mt: 2 }}
                  variant="outlined"
                  color={formulaAdded ? "info" : "error"}
                  onClick={() => {
                    setopenDialog(true);
                    handleFormula();
                    console.log(
                      schemaRef.current.components?.filter(
                        (item) => item.label !== "Submit"
                      ).length === 0
                    );
                  }}
                >
                  {formulaAdded ? "Edit Formula" : "Add Formula"}
                </Button>
              </Container>

              <Container maxWidth={false} sx={{ mt: 3, mb: 5 }}>
                {/* <Typography sx={{ mb: 1 }}>
                  Note : The API key and the field name should be same
                </Typography> */}
                <FormBuilder
                  form={myform}
                  options={{
                    builder: {
                      layout: false,
                      premium: false,
                      advanced: false,
                      data: false,
                      basic: {
                        default: true,
                        components: {
                          password: false,
                          radio: false,
                          button: false,
                          checkbox: false,
                        },
                      },
                    },
                  }}
                  onChange={(schema) => {
                    console.log(JSON.stringify(schema));
                    schemaRef.current = schema;
                  }}
                />
              </Container>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCalculator;
