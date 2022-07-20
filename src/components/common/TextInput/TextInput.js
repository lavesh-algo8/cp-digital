import { TextField } from "@mui/material";
import React from "react";

function TextInput({ type = "text", width = "auto" }) {
  return (
    <TextField
      type={type}
      size="small"
      id="sharecapital"
      variant="outlined"
      sx={{
        width,
        m: 1,
        "& .MuiOutlinedInput-notchedOutline": {
          border: "2px solid #e8e8e8",
        },
        color: "grey",
        fontSize: "15px",
        "& .MuiSvgIcon-root": {
          color: "grey",
        },
      }}
    />
  );
}

export default TextInput;
