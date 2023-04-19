import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function SelectFieldExample() {
  const [rows, setRows] = useState([
    {
      fields: [
        { option1: "", option2: "", option3: "", text: "" },
        { option1: "", option2: "", option3: "", text: "" },
      ],
    },
  ]);

  const handleChange = (event, rowIndex, fieldIndex) => {
    const { name, value } = event.target;
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[rowIndex].fields[fieldIndex][name] = value;
      return updatedRows;
    });
  };

  const handleAddRow = () => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows.push({
        fields: [
          { option1: "", option2: "", option3: "", text: "" },
          { option1: "", option2: "", option3: "", text: "" },
        ],
      });
      return newRows;
    });
  };

  const handleRemoveRow = (index) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows.splice(index, 1);
      return newRows;
    });
  };

  const handleFieldChange = (event, rowIndex, fieldIndex, fieldName) => {
    const { value } = event.target;
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[rowIndex].fields[fieldIndex][fieldName] = value;
      return updatedRows;
    });
  };

  const handleAddField = (rowIndex) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[rowIndex].fields.push({
        option1: "",
        option2: "",
        option3: "",
        text: "",
      });
      return updatedRows;
    });
  };

  const handleRemoveField = (rowIndex, fieldIndex) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[rowIndex].fields.splice(fieldIndex, 1);
      return updatedRows;
    });
  };

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <Box key={rowIndex} display="flex" alignItems="center">
          {row.fields.map((field, fieldIndex) => (
            <Box key={fieldIndex} display="flex" alignItems="center">
              <FormControl>
                <InputLabel id={`select-label-1-${rowIndex}-${fieldIndex}`}>
                  Option 1
                </InputLabel>
                <Select
                  labelId={`select-label-1-${rowIndex}-${fieldIndex}`}
                  name={`option1-${rowIndex}-${fieldIndex}`}
                  value={field.option1 || ""}
                  onChange={(e) => handleChange(e, rowIndex, fieldIndex)}
                >
                  <MenuItem value="option1-value-1">Option 1 Value 1</MenuItem>
                  <MenuItem value="option1-value-2">Option 1 Value 2</MenuItem>
                  <MenuItem value="option1-value-3">Option 1 Value 3</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id={`select-label-2-${rowIndex}-${fieldIndex}`}>
                  Option 2
                </InputLabel>
                <Select
                  labelId={`select-label-2-${rowIndex}-${fieldIndex}`}
                  name={`option2-${rowIndex}-${fieldIndex}`}
                  value={field.option2 || ""}
                  onChange={(e) => handleChange(e, rowIndex, fieldIndex)}
                >
                  <MenuItem value="option2-value-1">Option 2 Value 1</MenuItem>
                  <MenuItem value="option2-value-2">Option 2 Value 2</MenuItem>
                  <MenuItem value="option2-value-3">Option 2 Value 3</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id={`select-label-3-${rowIndex}-${fieldIndex}`}>
                  Option 3
                </InputLabel>
                <Select
                  labelId={`select-label-3-${rowIndex}-${fieldIndex}`}
                  name={`option3-${rowIndex}-${fieldIndex}`}
                  value={field.option3 || ""}
                  onChange={(e) => handleChange(e, rowIndex, fieldIndex)}
                >
                  <MenuItem value="option3-value-1">Option 3 Value 1</MenuItem>
                  <MenuItem value="option3-value-2">Option 3 Value 2</MenuItem>
                  <MenuItem value="option3-value-3">Option 3 Value 3</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Text"
                name={`text-${rowIndex}-${fieldIndex}`}
                value={field.text || ""}
                onChange={(e) =>
                  handleFieldChange(e, rowIndex, fieldIndex, "text")
                }
              />
              {row.fields.length > 1 && (
                <IconButton
                  onClick={() => handleRemoveField(rowIndex, fieldIndex)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
          {rows.length > 1 && (
            <IconButton onClick={() => handleRemoveRow(rowIndex)}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddRow}
      >
        Add Row
      </Button>
    </div>
  );
}
