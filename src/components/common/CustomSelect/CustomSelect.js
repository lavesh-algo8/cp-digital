import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { GREY } from "../../../Utility/Colors";

function CustomSelect({ title = "", options = [], onChange, width = "100%" }) {
  return (
    <FormControl
      fullWidth
      sx={{
        width: width,
      }}
    >
      <Typography sx={{ color: GREY }} variant="body2">
        {title}
      </Typography>
      <Select
        onChange={onChange}
        size="small"
        color="whitecol"
        defaultValue="Name"
        sx={{
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
      >
        {options?.map((item, index) => (
          <MenuItem value={item} key={index}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
