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
  Paper,
  Divider,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import { FormBuilder } from "@formio/react";
import "formiojs/dist/formio.builder.min.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddSimpleCalculator } from "../../../redux/superAdminReducer/superAdminAction";
import ConditionalDialog from "./TestingCal/ConditionalDialog";

const AddFormula = (props) => {
  console.log(props);
  const [conditionalFormulaDialog, setconditionalFormulaDialog] =
    useState(false);

  const { formulaAdded } = useSelector((state) => state?.SuperAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [formula, setFormula] = useState("");
  const [myform, setmyform] = useState("");
  const schemaRef = useRef();

  const [formulaText, setformulaText] = useState(
    formulaAdded[`Formula ${props.fieldKey}`] || []
  );
  const [formulaError, setformulaError] = useState(false);
  const [ifconditional, setifconditional] = useState(false);

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
      formula: formula,
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

  const check_start_and_end = (str) => {
    if (
      str.startsWith("+") ||
      str.endsWith("+") ||
      str.startsWith("-") ||
      str.endsWith("-") ||
      str.startsWith("*") ||
      str.endsWith("*") ||
      str.startsWith("/") ||
      str.endsWith("/")
      // ||
      // str.startsWith("%") ||
      // str.endsWith("%")
    ) {
      return true;
    } else {
      return false;
    }
  };

  const adjacent_operator = (str) => {
    var operators = ["+", "-", "/", "*", "%"];

    var adjacent = [];

    for (let i = 0; i < str.length - 1; i++) {
      if (
        operators.includes(str[i]) === true &&
        operators.includes(str[i + 1]) === true
      ) {
        adjacent.push(true);
      } else {
        adjacent.push(false);
      }
    }

    if (adjacent.includes(true)) return true;
    else return false;
  };

  const handleFieldClick = (item) => {
    setformulaText((prevState) => [...prevState, item]);
    console.log(formulaText);
  };

  return (
    <>
      {/* conditional dialog */}
      <ConditionalDialog
        openDialog={conditionalFormulaDialog}
        setOpenDialog={setconditionalFormulaDialog}
        fields={props.fields}
        setformulaText={setformulaText}
        setifconditional={setifconditional}
      />

      {/* add admins dialog */}
      <Dialog
        BackdropProps={{
          style: {
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0,0,30,0.4)",
          },
        }}
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
        <DialogTitle fontWeight={600}>
          {props.formulaEdit ? "Edit Formula" : "Add Formula"}
        </DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Paper>
            <Grid container sx={{ height: "65vh" }}>
              <Grid
                item
                xs={12}
                lg={4}
                sx={{ height: "100%" }}
                style={{ border: "1px solid grey", overflowY: "scroll" }}
              >
                <Box>
                  <Typography
                    sx={{
                      py: 2,
                      pl: 1,
                      background: "#F9F9F9",
                    }}
                  >
                    <strong>Fields</strong>
                  </Typography>
                  <Divider />

                  <Box>
                    {props.fields
                      .filter((item) => item !== "Submit")
                      .map((item, index) => (
                        <Box
                          sx={{
                            cursor: "pointer",
                            pointerEvents: ifconditional ? "none" : "auto",
                            color: ifconditional ? "#E0E0E0" : "auto",
                          }}
                        >
                          <Typography
                            onClick={
                              ifconditional
                                ? undefined
                                : () => {
                                    handleFieldClick(item);
                                  }
                            }
                            sx={{
                              py: 1,
                              px: 2,
                              "&:hover": {
                                background: "#5F7F9C",
                                color: "white",
                              },
                            }}
                          >
                            {item}
                          </Typography>
                          <Divider />
                        </Box>
                      ))}
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                lg={4}
                sx={{ height: "100%" }}
                style={{ border: "1px solid grey" }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      background: "#F9F9F9",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    <Typography sx={{ py: 2 }}>
                      <strong>Formula</strong>
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        textTransform: "none",
                      }}
                      color="info"
                      onClick={() => {
                        setformulaText([]);
                        setifconditional(false);
                      }}
                    >
                      Clear
                    </Button>
                  </Box>

                  <TextField
                    error={formulaError}
                    multiline
                    value={formulaText.join("  ")}
                    variant="outlined"
                    inputProps={{
                      style: {
                        height: "52vh",
                      },
                    }}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                    fullWidth
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      console.log(e.code);
                      let text = "";
                      if (e.code === "Backspace") {
                        text = formulaText.slice(0, -1);

                        console.log(formulaText);
                        if (!isNaN(formulaText.at(-1))) {
                          let x = formulaText.at(-1);
                          let number = x.slice(0, -1);
                          if (number === "") {
                            setformulaText(text);
                          } else {
                            setformulaText([...text, number]);
                          }
                        } else {
                          setformulaText(text);
                        }
                      } else if (e.code.slice(0, -1) === "Digit") {
                        let lastnumber = formulaText.at(-1);
                        if (!isNaN(formulaText.at(-1))) {
                          text = formulaText.slice(0, -1);
                          setformulaText([
                            ...text,
                            lastnumber + e.code.slice(-1),
                          ]);
                        } else {
                          setformulaText((prevState) => [
                            ...prevState,
                            e.code.slice(-1),
                          ]);
                        }
                      }
                    }}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                lg={4}
                sx={{ height: "100%" }}
                style={{ border: "1px solid grey" }}
              >
                <Box>
                  <Typography sx={{ py: 2, pl: 1, background: "#F9F9F9" }}>
                    <strong>Operator</strong>
                  </Typography>
                  <Grid container spacing={1} textAlign="center" sx={{ mt: 4 }}>
                    {[
                      "(",
                      ")",
                      "+",
                      "*",
                      "-",
                      "/",
                      "%",
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "0",
                      "=",
                      "min",
                      "max",
                      ",",
                      "DEL",
                      // ">",
                      // ">=",
                      // "<",
                      // "<=",
                    ].map((item, index) => (
                      <Grid item xs={12} sm={3}>
                        <Button
                          disabled={ifconditional}
                          variant="outlined"
                          onClick={(e) => {
                            if (item === "+") {
                              setformulaText((prevState) => [
                                ...prevState,
                                item,
                              ]);
                            } else if (item === "-") {
                              setformulaText((prevState) => [
                                ...prevState,
                                item,
                              ]);
                            } else if (item === "*") {
                              setformulaText((prevState) => [
                                ...prevState,
                                item,
                              ]);
                            } else if (item === "(") {
                              setformulaText((prevState) => [
                                ...prevState,
                                item,
                              ]);
                            } else if (item === ")") {
                              setformulaText((prevState) => [
                                ...prevState,
                                item,
                              ]);
                            } else if (item === "/") {
                              setformulaText((prevState) => [
                                ...prevState,
                                item,
                              ]);
                            } else if (item === "=") {
                              setformulaText((prevState) => [
                                ...prevState,
                                item,
                              ]);
                            } else if (item === ">") {
                              setformulaText((prevState) => [
                                ...prevState,
                                item,
                              ]);
                            } else if (item === "<") {
                              setformulaText((prevState) => [
                                ...prevState,
                                item,
                              ]);
                            } else if (item === ">=") {
                              setformulaText((prevState) => [
                                ...prevState,
                                item,
                              ]);
                            } else if (item === "<=") {
                              setformulaText((prevState) => [
                                ...prevState,
                                item,
                              ]);
                            } else if (item === "DEL") {
                              let text = "";
                              text = formulaText.slice(0, -1);

                              console.log(formulaText);
                              if (!isNaN(formulaText.at(-1))) {
                                let x = formulaText.at(-1);
                                let number = x.slice(0, -1);
                                if (number === "") {
                                  setformulaText(text);
                                } else {
                                  setformulaText([...text, number]);
                                }
                              } else {
                                setformulaText(text);
                              }
                            } else {
                              let lastnumber = formulaText.at(-1);
                              let text = "";
                              if (!isNaN(formulaText.at(-1))) {
                                text = formulaText.slice(0, -1);
                                setformulaText([...text, lastnumber + item]);
                              } else {
                                setformulaText((prevState) => [
                                  ...prevState,
                                  item,
                                ]);
                              }
                            }
                            console.log(formulaText);
                          }}
                        >
                          {item}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>

                  <Box sx={{ mt: 5, px: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => setconditionalFormulaDialog(true)}
                    >
                      Add Conditional Formula
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              onClick={async () => {
                const check1 = check_start_and_end(formulaText.join(" "));
                const check2 = adjacent_operator(formulaText.join(" "));
                console.log(check1, check2);
                if (!check1 || check2) {
                  setformulaError(false);
                  const res = await dispatch({
                    type: "ADD_FORMULA",
                    payload: {
                      forumlaName: `Formula ${props.fieldKey}`,
                      formulaText: formulaText,
                    },
                  });
                  if (res) {
                    handleDialogClose();
                  }
                } else {
                  setformulaError(true);
                }
              }}
            >
              Done
            </Button>
            <Button
              variant="outlined"
              sx={{ ml: 3 }}
              onClick={handleDialogClose}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddFormula;
