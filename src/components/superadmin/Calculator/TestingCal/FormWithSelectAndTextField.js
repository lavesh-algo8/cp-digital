import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const operators = [">", "<", "<=", ">="];

function SelectFields({ props, field, index, handleFieldChange }) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <FormControl fullWidth>
          <Typography sx={{ mt: 2, pb: 1 }}>Select First Field :</Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            size="small"
            displayEmpty
            value={field.field1}
            onChange={(event) => handleFieldChange(event, index, "field1")}
            renderValue={(value) =>
              value || <Box sx={{ color: "gray" }}>Select First Field</Box>
            }
          >
            {props?.fields
              ?.filter((item) => item !== "submit")
              ?.map((item, index) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mx: 2 }}>
          <Typography sx={{ mt: 2, pb: 1 }}>
            Select Evaluation Type :
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            size="small"
            displayEmpty
            value={field.field2}
            onChange={(event) => handleFieldChange(event, index, "field2")}
            renderValue={(value) =>
              value || <Box sx={{ color: "gray" }}>Select Evaluation Type </Box>
            }
          >
            {operators?.map((operator) => (
              <MenuItem value={operator}>{operator}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Typography sx={{ mt: 2, pb: 1 }}>Select Second Field :</Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            size="small"
            displayEmpty
            value={field.field3}
            onChange={(event) => handleFieldChange(event, index, "field3")}
            renderValue={(value) =>
              value || <Box sx={{ color: "gray" }}>Select Second Field</Box>
            }
          >
            {props?.fields
              ?.filter((item) => item !== "submit")
              ?.map((item, index) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

function FormWithSelectAndTextField(props) {
  console.log(props.props);
  const [resultField, setresultField] = useState("");
  const [equalTo, setequalTo] = useState("=");
  const [resultelse, setresultelse] = useState("");

  const [fields, setFields] = useState([
    { field1: "", field2: "", field3: "", text: "" },
  ]);

  const handleAddField = () => {
    const newFields = [
      ...fields,
      { field1: "", field2: "", field3: "", text: "" },
    ];
    setFields(newFields);
  };

  const handleFieldChange = (event, index, fieldName) => {
    const newFields = [...fields];
    newFields[index][fieldName] = event.target.value;
    setFields(newFields);
  };

  const handleRemoveField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fields);
    console.log(resultField);
    console.log(resultelse);
    let str = "";
    fields.forEach((field, index) => {
      console.log(
        `${field.field1} ${field.field2} ${field.field3} ? "${field.text}" :`
      );
      str = str.concat(
        `${field.field1} ${field.field2} ${field.field3} ? "${field.text}" : `
      );
    });
    console.log(str);
    console.log(`${resultField} ${equalTo} ${str} "${resultelse}"`);
    props.props.setformulaText([
      `${resultField} ${equalTo} ${str} "${resultelse}"`,
    ]);
    props.props.setifconditional(true);
    props.props.setOpenDialog(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ mt: 2, pb: 1 }}>Select Result Field :</Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            size="small"
            displayEmpty
            value={resultField}
            onChange={(e) => setresultField(e.target.value)}
            renderValue={(value) =>
              value || (
                <Box sx={{ color: "gray" }}>
                  Select Field In which You want to store the result
                </Box>
              )
            }
          >
            {props.props?.fields
              ?.filter((item) => item !== "submit")
              ?.map((item, index) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
          </Select>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ mt: 2, pb: 1 }}>Is Equal To :</Typography>
          <Select
            sx={{ textAlign: "center" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            size="small"
            displayEmpty
            defaultValue={"="}
            renderValue={(value) =>
              value || <Box sx={{ color: "gray" }}>Equal</Box>
            }
          >
            <MenuItem value={"="}>{"="}</MenuItem>
          </Select>
        </Box>
      </Box>

      {fields.map((field, index) => (
        <Box sx={{ mt: index === 0 ? "" : 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography>{index === 0 ? "If :" : "Else IF :"}</Typography>
            <Box>
              {index > 0 && (
                // <Button
                //   type="button"
                //   variant="contained"
                //   onClick={() => handleRemoveField(index)}
                // >
                //   Remove
                // </Button>
                <IconButton
                  onClick={() => handleRemoveField(index)}
                  sx={{
                    background: "#d31f1f",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#d31f1f",
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>
          <Box
            key={index}
            sx={{
              ml: 5,
              border: "1px solid black",
              borderRadius: "10px",
              p: 2,
              pb: 4,
            }}
          >
            {/* {index > 0 && (
              <Button
                type="button"
                variant="contained"
                onClick={() => handleRemoveField(index)}
              >
                Remove
              </Button>
            )} */}
            <SelectFields
              props={props.props}
              field={field}
              index={index}
              handleFieldChange={handleFieldChange}
            />
            <br />

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ pb: 1 }}>Perform / Enter value :</Typography>
              <TextField
                size="small"
                placeholder="Type what you want to show when condition met"
                fullWidth
                value={field.text}
                onChange={(event) => handleFieldChange(event, index, "text")}
              />
            </Box>
          </Box>
        </Box>
      ))}
      <Box sx={{ mt: 5 }}>
        {/* <Button type="button" variant="contained" onClick={handleAddField}>
          <AddIcon fontSize="small" />
        </Button> */}
        <IconButton
          onClick={handleAddField}
          sx={{
            background: "#121D28",
            color: "white",
            "&:hover": {
              backgroundColor: "#121D28",
            },
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
        {/* <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ ml: 3 }}
        >
          Submit
        </Button> */}
      </Box>

      <Box
        sx={{
          mt: 2,
        }}
      >
        <Typography>Else :</Typography>
        <Box
          sx={{
            ml: 5,
            // border: "1px solid black",
            borderRadius: "10px",
          }}
        >
          <Typography sx={{ pb: 1 }}>
            Else Expression (when none of condition met) :
          </Typography>
          <TextField
            size="small"
            placeholder="Type what you want to show when condition is false"
            fullWidth
            value={resultelse}
            onChange={(e) => setresultelse(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 8, mb: 3, display: "flex", justifyContent: "center" }}>
        <Button
          type="submit"
          color="redcol"
          variant="outlined"
          sx={{ px: 3, ml: 3 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ ml: 3, px: 4 }}
        >
          Done
        </Button>
      </Box>
    </form>
  );
}

export default FormWithSelectAndTextField;
