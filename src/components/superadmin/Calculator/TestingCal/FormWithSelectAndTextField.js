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
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";

const operators = [">", "<", "<=", ">="];
const conditionbetw = ["Any", "All"];

function SelectFields({ props, field, index, handleFieldChange, parentIndex }) {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              size="small"
              displayEmpty
              value={field.field0}
              onChange={(event) =>
                handleFieldChange(event, index, "field0", parentIndex)
              }
              renderValue={(value) =>
                value || <Box sx={{ color: "gray" }}>Select condition</Box>
              }
            >
              {conditionbetw?.map((item, index) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography sx={{ ml: 2 }}>
            of the conditions are met .................
          </Typography>
        </Box>

        <Box sx={{ width: "100%", display: "flex" }}>
          <FormControl fullWidth>
            <Typography sx={{ mt: 2, pb: 1 }}>Select First Field :</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              size="small"
              displayEmpty
              value={field.field1}
              onChange={(event) =>
                handleFieldChange(event, index, "field1", parentIndex)
              }
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
              onChange={(event) =>
                handleFieldChange(event, index, "field2", parentIndex)
              }
              renderValue={(value) =>
                value || (
                  <Box sx={{ color: "gray" }}>Select Evaluation Type </Box>
                )
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
              onChange={(event) =>
                handleFieldChange(event, index, "field3", parentIndex)
              }
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
      </Box>
    </>
  );
}

function ChildSelectFields({
  props,
  field,
  index,
  handleFieldChange,
  parentIndex,
}) {
  return (
    <>
      <Box sx={{ width: "100%", display: "flex" }}>
        <FormControl fullWidth>
          <Typography sx={{ mt: 2, pb: 1 }}>Select First Field :</Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            size="small"
            displayEmpty
            value={field.field1}
            onChange={(event) =>
              handleFieldChange(event, index, "field1", parentIndex)
            }
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
            onChange={(event) =>
              handleFieldChange(event, index, "field2", parentIndex)
            }
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
            onChange={(event) =>
              handleFieldChange(event, index, "field3", parentIndex)
            }
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
    {
      field0: "All",
      field1: "",
      field2: "",
      field3: "",
      text: "",
      childFields: [],
    },
  ]);

  const handleAddField = () => {
    const newFields = [
      ...fields,
      {
        field0: "All",
        field1: "",
        field2: "",
        field3: "",
        text: "",
        childFields: [],
      },
    ];
    setFields(newFields);
  };

  const handleAddChildField = (field) => {
    const newFields = [...fields];
    field.childFields.push({
      field1: "",
      field2: "",
      field3: "",
    });
    setFields(newFields);
  };

  const handleChildFieldChange = (event, index, fieldName, parentIndex) => {
    const newFields = [...fields];
    console.log(newFields);
    newFields[parentIndex].childFields[index][fieldName] = event.target.value;
    setFields(newFields);
  };

  const handleFieldChange = (event, index, fieldName) => {
    const newFields = [...fields];
    console.log(newFields);
    newFields[index][fieldName] = event.target.value;
    setFields(newFields);
  };

  const handleRemoveField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleRemoveChildField = (i, index) => {
    const newFields = [...fields];
    console.log(newFields);
    newFields[index].childFields.splice(i, 1);
    setFields(newFields);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(fields);
  //   console.log(resultField);
  //   console.log(resultelse);
  //   let str = "";
  //   fields.forEach((field, index) => {
  //     console.log(
  //       `${field.field1} ${field.field2} ${field.field3} ? "${field.text}" :`
  //     );
  //     str = str.concat(
  //       `${field.field1} ${field.field2} ${field.field3} ? "${field.text}" : `
  //     );
  //   });
  //   console.log(str);
  //   console.log(`${resultField} ${equalTo} ${str} "${resultelse}"`);
  //   props.props.setformulaText([
  //     `${resultField} ${equalTo} ${str} "${resultelse}"`,
  //   ]);
  //   props.props.setifconditional(true);
  //   props.props.setOpenDialog(false);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fields);
    console.log(resultField);
    console.log(resultelse);
    let str = "";
    fields.forEach((field, index) => {
      let childstr = "";
      console.log(field);
      console.log(
        `${field.field1} ${field.field2} ${field.field3} ? "${field.text}" :`
      );
      if (field.childFields.length > 0) {
        childstr = `(${field.field1} ${field.field2} ${field.field3})`;
        field.childFields.forEach((child) => {
          console.log(
            `${field.field0 === "All" ? "and" : "or"} ${child.field1} ${
              child.field2
            } ${child.field3} `
          );
          childstr = childstr.concat(
            ` ${field.field0 === "All" ? "and" : "or"} (${child.field1} ${
              child.field2
            } ${child.field3})`
          );
        });
        console.log(childstr);
        str = str.concat(`${childstr} ? "${field.text}" : `);
      } else {
        str = str.concat(
          `${field.field1} ${field.field2} ${field.field3} ? "${field.text}" : `
        );
      }
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <SelectFields
                props={props.props}
                field={field}
                index={index}
                handleFieldChange={handleFieldChange}
              />

              <IconButton
                onClick={() => handleAddChildField(field)}
                sx={{
                  ml: 3,
                  mb: 1,
                  background: "#121D28",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#121D28",
                  },
                  p: 0.5,
                }}
              >
                <AddIcon sx={{ fontSize: "14px" }} />
              </IconButton>
            </Box>

            <br />
            {field.childFields.map((childfield, i) => (
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <ChildSelectFields
                  props={props.props}
                  field={childfield}
                  index={i}
                  handleFieldChange={handleChildFieldChange}
                  parentIndex={index}
                />

                <IconButton
                  onClick={() => handleRemoveChildField(i, index)}
                  sx={{
                    ml: 3,
                    mb: 1,
                    background: "#ce1a1a",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#ce1a1a",
                    },
                    p: 0.5,
                  }}
                >
                  <RemoveIcon sx={{ fontSize: "14px" }} />
                </IconButton>
              </Box>
            ))}
            <br />

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ pb: 1 }}>
                Enter what you want to display when condition met :
              </Typography>
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
