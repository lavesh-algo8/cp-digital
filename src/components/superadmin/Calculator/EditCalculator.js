import { Grid, TextField, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/superadmin/Layout";

import { FormBuilder } from "@formio/react";
import "formiojs/dist/formio.builder.min.css";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editAddedCalculatorsById,
  editProcedureDocument,
  fetchAddedCalculatorsById,
} from "../../../redux/superAdminReducer/superAdminAction";
import AddFormula from "./AddFormula";
import EditFormula from "./EditFormula";

const EditCalculator = () => {
  const { id } = useParams();
  const { addedCalculatorsById } = useSelector((state) => state.SuperAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setopenDialog] = React.useState(false);

  const [title, setTitle] = useState(addedCalculatorsById.calculator_name);
  const [formula, setFormula] = useState(addedCalculatorsById.formula);
  const [myform, setmyform] = useState(addedCalculatorsById.formData);
  const schemaRef = useRef();

  const [fields, setFields] = useState([]);
  const { formulaAdded } = useSelector((state) => state?.SuperAdmin);

  const onSubmitHandler = async () => {
    if (title === "") {
      alert("Please Enter Form Title");
      return;
    }
    if (formula === "") {
      alert("Please Enter Formula");
      return;
    }
    console.log(schemaRef);
    const formData = { ...schemaRef.current, title };
    const calculatorData = {
      calculator_name: title,
      formula: (formulaAdded && formulaAdded.join(" ")) || formula,
      formData: formData,
    };
    console.log(calculatorData);
    const success = await dispatch(
      editAddedCalculatorsById(calculatorData, id)
    );
    if (success) {
      navigate(-1);
    }
  };

  useEffect(() => {
    dispatch(fetchAddedCalculatorsById(id));
  }, [id]);

  const handleFormula = () => {
    console.log(schemaRef.current.components);
    let objArray = schemaRef.current.components;
    var processed = objArray.map(({ label }) => ({ label }.label));
    console.log(processed);
    setFields(processed);
  };

  return (
    <>
      <Layout>
        {openDialog && (
          <EditFormula
            openDialog={openDialog}
            setOpenDialog={setopenDialog}
            fields={fields}
            formula={addedCalculatorsById.formula}
          />
        )}

        <Grid
          container
          spacing={3}
          sx={{
            marginTop: "100px",
            position: "relative",
            zIndex: "12",
            borderRadius: "4px",
            height: "87vh",
            overflowY: "scroll",
            pr: 4,
            pl: 6,
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
                Edit Calculator
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
                    Update
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
                    value={(formulaAdded && formulaAdded.join(" ")) || formula}
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
                color={"info"}
                onClick={() => {
                  setopenDialog(true);
                  handleFormula();
                }}
              >
                Edit Formula
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
      </Layout>
    </>
  );
};

export default EditCalculator;
