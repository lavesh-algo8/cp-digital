import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const operators = [">", "<", "<=", ">="];

const ConditionalDialog = (props) => {
  const dispatch = useDispatch();
  const [resultField, setresultField] = useState("");
  const [equalTo, setequalTo] = useState("=");
  const [firstField, setfirstField] = useState("");
  const [evaluationType, setevaluationType] = useState("");
  const [secondField, setsecondField] = useState("");
  const [conditionalop, setconditionalop] = useState("?");
  const [conditionalop2, setconditionalop2] = useState(":");
  const [resulttrue, setresulttrue] = useState("");
  const [resultfalse, setresultfalse] = useState("");

  const handleClick = async () => {
    props.setformulaText([
      `${resultField} ${equalTo} ${firstField} ${evaluationType} ${secondField} ${conditionalop} "${resulttrue}" ${conditionalop2} "${resultfalse}"`,
    ]);
    props.setifconditional(true);
    handleDialogClose();
  };

  const handleDialogClose = () => {
    props.setOpenDialog(false);
  };

  return (
    <Dialog
      open={props.openDialog}
      onClose={handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle id="alert-dialog-title">
        {"Add Conditional Formula"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex" }}>
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
              {props?.fields
                ?.filter((item) => item !== "Submit")
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

          <Box sx={{ width: "100%" }}>
            <Typography sx={{ mt: 2, pb: 1 }}>Select First Field :</Typography>
            <Select
              sx={{ textAlign: "center" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              size="small"
              displayEmpty
              value={firstField}
              onChange={(e) => setfirstField(e.target.value)}
              renderValue={(value) =>
                value || <Box sx={{ color: "gray" }}>Select First Field</Box>
              }
            >
              {props?.fields
                ?.filter((item) => item !== "Submit")
                ?.map((item, index) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
            </Select>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Typography sx={{ mt: 2, pb: 1 }}>
              Select Evaluation Type :
            </Typography>
            <Select
              sx={{ textAlign: "center" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              size="small"
              displayEmpty
              value={evaluationType}
              onChange={(e) => setevaluationType(e.target.value)}
              renderValue={(value) =>
                value || (
                  <Box sx={{ color: "gray" }}>Select Evaluation Type</Box>
                )
              }
            >
              {operators?.map((operator) => (
                <MenuItem value={operator}>{operator}</MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Typography sx={{ mt: 2, pb: 1 }}>Select Second Field :</Typography>
            <Select
              sx={{ textAlign: "center" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              size="small"
              displayEmpty
              value={secondField}
              onChange={(e) => setsecondField(e.target.value)}
              renderValue={(value) =>
                value || <Box sx={{ color: "gray" }}>Select Second Field </Box>
              }
            >
              {props?.fields
                ?.filter((item) => item !== "Submit")
                ?.map((item, index) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
            </Select>
          </Box>
        </Box>

        <Grid container sx={{ mt: 4, mb: 3 }} spacing={3}>
          <Grid item lg={6}>
            <Typography sx={{ pb: 1 }}>If Expression True :</Typography>
            <TextField
              size="small"
              placeholder="Type what you want to show when condition is true"
              fullWidth
              value={resulttrue}
              onChange={(e) => setresulttrue(e.target.value)}
            />
          </Grid>

          <Grid item lg={6}>
            <Typography sx={{ pb: 1 }}>Else Expression False :</Typography>
            <TextField
              size="small"
              placeholder="Type what you want to show when condition is false"
              fullWidth
              value={resultfalse}
              onChange={(e) => setresultfalse(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={handleDialogClose}
          color="redcol"
          variant="outlined"
          size="small"
          sx={{ px: 2, mr: 2 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleClick}
          autoFocus
          variant="contained"
          size="small"
          sx={{ px: 4 }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConditionalDialog;
