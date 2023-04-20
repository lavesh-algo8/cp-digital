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
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

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

  const [numOfDocs, setNumOfDocs] = useState(
    addedCalculatorsById?.formulaList?.length
  );
  const [fieldKey, setfieldKey] = useState("");

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

    const formulaList = [];

    const propNames = Object.keys(formulaAdded);
    // Filter out the "undefined" property
    const filteredPropNames = propNames.filter((prop) => prop !== "undefined");
    // Create a new object with the remaining properties
    const filteredFoml = {};
    filteredPropNames.forEach((prop) => {
      filteredFoml[prop] = formulaAdded[prop];
    });

    Object.entries(filteredFoml).map((formula, index) => {
      // formulaList.push(formula{index}.join(" "))
      console.log(formula[1]);
      console.log(formula[1].join(" "));
      formulaList.push({
        formulaName: `formula${index}`,
        // formula: encodeURIComponent(formula[1].join(" ")),
        formula: formula[1].join(" "),
      });
    });

    const calculatorData = {
      calculator_name: title,
      // formula: (formulaAdded && formulaAdded.join(" ")) || formula,
      formulaList: formulaList,
      formData: formData,
    };
    console.log(calculatorData);
    const success = await dispatch(
      editAddedCalculatorsById(calculatorData, id)
    );
    if (success) {
      const res = await dispatch({
        type: "REMOVE_FORMULA",
        payload: {},
      });
      navigate(-1);
    }
  };

  useEffect(() => {
    dispatch(fetchAddedCalculatorsById(id));
  }, [id]);

  useEffect(() => {
    getFormulaAndSet();
  }, [addedCalculatorsById]);

  const getFormulaAndSet = async () => {
    addedCalculatorsById?.formulaList?.map(async (formula, index) => {
      let result = [];
      let tempStr = "";

      for (let i = 0; i < formula?.formula.length; i++) {
        const char = formula?.formula.charAt(i);
        if (
          char === "+" ||
          char === "-" ||
          char === "*" ||
          char === "/" ||
          char === "%" ||
          char === "="
        ) {
          if (tempStr !== "") {
            result.push(tempStr);
            tempStr = "";
          }
          result.push(char);
        } else {
          tempStr += char;
        }
      }

      if (tempStr !== "") {
        result.push(tempStr);
      }

      const res = await dispatch({
        type: "ADD_FORMULA",
        payload: {
          forumlaName: `Formula ${index + 1}`,
          formulaText: result,
        },
      });
    });
  };

  const handleFormula = () => {
    console.log(schemaRef.current.components);
    let objArray = schemaRef.current.components;
    var processed = objArray.map(({ key }) => ({ key }.key));
    console.log(processed);
    setFields(processed);
  };

  return (
    <>
      <Layout>
        {openDialog && (
          <AddFormula
            openDialog={openDialog}
            setOpenDialog={setopenDialog}
            fields={fields}
            formulaEdit={Object.keys(formulaAdded).length > 0 ? "Edit" : ""}
            formula={addedCalculatorsById.formula}
            fieldKey={fieldKey}
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
                <Grid item lg={12} xs={12}>
                  <Typography sx={{ mt: 2, pb: 1 }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      Formula :
                    </Typography>{" "}
                    (Add the formula with field names created below)
                  </Typography>
                  {Array.from({ length: numOfDocs }, (_, key) => (
                    <Grid container spacing={3} sx={{ mt: key === 0 ? "" : 2 }}>
                      <Grid item lg={7} xs={12}>
                        <TextField
                          rows={3}
                          multiline
                          fullWidth
                          size="small"
                          required
                          id="outlined-required"
                          label={`Formula ${key + 1}`}
                          value={
                            (formulaAdded[`Formula ${key + 1}`] &&
                              formulaAdded[`Formula ${key + 1}`].join(" ")) ||
                            ""
                          }
                          onChange={(e) => setFormula(e.target.value)}
                          disabled
                        />
                      </Grid>
                      <Grid
                        item
                        lg={2}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Button
                          variant="outlined"
                          color={
                            formulaAdded[`Formula ${key + 1}`]
                              ? "info"
                              : "error"
                          }
                          onClick={() => {
                            setfieldKey(key + 1);
                            setopenDialog(true);
                            handleFormula();
                            console.log(
                              schemaRef.current.components?.filter(
                                (item) => item.label !== "Submit"
                              ).length === 0
                            );
                          }}
                        >
                          {formulaAdded[`Formula ${key + 1}`]
                            ? "Edit Formula"
                            : "Add Formula"}
                        </Button>
                      </Grid>
                      <Grid
                        item
                        lg={3}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {key + 1 === numOfDocs && (
                          <>
                            <Grid
                              container
                              item
                              lg={4}
                              style={{ padding: "0 8px" }}
                            >
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
                            <Grid
                              container
                              item
                              lg={6}
                              style={{ padding: "0 8px" }}
                            >
                              <Button
                                size="large"
                                color="primary"
                                variant="contained"
                                onClick={async () => {
                                  setNumOfDocs(numOfDocs - 1);
                                  const res = await dispatch({
                                    type: "ADD_FORMULA",
                                    payload: {
                                      forumlaName: `Formula ${key + 1}`,
                                      formulaText: "",
                                    },
                                  });
                                }}
                                disabled={numOfDocs === 1}
                              >
                                <CloseIcon />
                              </Button>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Container>
            {/* <Container>
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
            </Container> */}
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
