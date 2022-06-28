import {
  Box,
  Button,
  FormControl,
  // FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { useForm } from "react-hook-form";
import SettingsIcon from "@mui/icons-material/Settings";
import EditROCFeeCalculator from "../../../components/superadmin/Calculator/EditROCFeeCalculator";

function ROCFeeCalculator() {
  const [result, setResult] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      {" "}
      <Box
        sx={{
          position: "relative",
          zIndex: 22,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Roc Fees Calculator</Typography>
          <Box>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                border: "none",
                "&:hover": {
                  border: "none",
                },
                mr: 2,
                color: "orange",
              }}
              onClick={handleOpenDialog}
            >
              <EditSharpIcon sx={{ mr: 1 }} />
              Edit
            </Button>
            <Button variant="contained" sx={{ textTransform: "none" }}>
              Publish <UploadIcon sx={{ ml: 1 }} />
            </Button>
          </Box>
        </Box>
        <Typography sx={{ mt: 2 }}>Description</Typography>
        <Typography sx={{ mt: 2, mb: 5, ml: 2 }}>
          You can use this tool to calculate your networth.
        </Typography>
        <Grid container sx={{}}>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <FormControl fullWidth>
              <Typography>Fee Type</Typography>
              <Select
                size="small"
                color="whitecol"
                defaultValue="Name"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid grey",
                  },
                  color: "grey",
                  fontSize: "15px",
                  "& .MuiSvgIcon-root": {
                    color: "grey",
                  },
                }}
              >
                <MenuItem value="Name">Select</MenuItem>
                <MenuItem value="Day Pushlished">Day Published</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8} sx={{ p: 1 }}>
            <FormControl fullWidth>
              <Typography>Form No</Typography>
              <Select
                size="small"
                color="whitecol"
                defaultValue="Name"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid grey",
                  },
                  color: "grey",
                  fontSize: "15px",
                  "& .MuiSvgIcon-root": {
                    color: "grey",
                  },
                }}
              >
                <MenuItem value="Name">Select</MenuItem>
                <MenuItem value="Day Pushlished">Day Published</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <FormControl fullWidth>
              <Typography>Select Company</Typography>
              <Select
                size="small"
                color="whitecol"
                defaultValue="Name"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid grey",
                  },
                  color: "grey",
                  fontSize: "15px",
                  "& .MuiSvgIcon-root": {
                    color: "grey",
                  },
                }}
              >
                <MenuItem value="Name">Select</MenuItem>
                <MenuItem value="Day Pushlished">Day Published</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <FormControl fullWidth>
              <Typography>Select Type</Typography>
              <Select
                size="small"
                color="whitecol"
                defaultValue="Name"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid grey",
                  },
                  color: "grey",
                  fontSize: "15px",
                  "& .MuiSvgIcon-root": {
                    color: "grey",
                  },
                }}
              >
                <MenuItem value="Name">Select</MenuItem>
                <MenuItem value="Day Pushlished">Day Published</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <FormControl fullWidth>
              <Typography>Enter Capital</Typography>

              <TextField
                size="small"
                id="sharecapital"
                variant="outlined"
                {...register("sharecapital", {
                  required: true,
                })}
                error={errors.sharecapital?.type === "required"}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid grey",
                  },
                  color: "grey",
                  fontSize: "15px",
                  "& .MuiSvgIcon-root": {
                    color: "grey",
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid
            sm={12}
            sx={{ mb: 2, mt: 2, display: "flex", justifyContent: "center" }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{ px: 2 }}
              onClick={() => setResult(!result)}
            >
              Test Run <SettingsIcon sx={{ ml: 2 }} />
            </Button>
          </Grid>
          {result && (
            <>
              <Grid
                item
                xs={12}
                sx={{
                  height: "2px",
                  backgroundColor: "black",
                  width: "100%",
                }}
              ></Grid>
              <Grid item xs={12}>
                <Typography sx={{ mt: 2 }}>Results</Typography>
              </Grid>
              <ResultItems name={"Event Date"} value={"21-06-2022"} />
              <ResultItems name={"Today Date"} value={"27-06-2022"} />
              <ResultItems name={"Last Date"} value={"N/A"} />
              <ResultItems name={"Normal Fee"} value={"10,000.00"} />
              <ResultItems name={"Additional Fee"} value={"N/A"} />
              <ResultItems name={"Total Fee"} value={"10,000.00"} />
              <Grid
                component={Typography}
                variant="body2"
                sx={{ mb: 1 }}
                item
                xs={12}
              >
                Disclaimer
              </Grid>
              <Grid
                component={Typography}
                variant="body2"
                sx={{ mb: 1, padding: 2 }}
                item
                xs={12}
              >
                The result of the aforesaid calculator is based on the relevant
                provisions of the Companies Act 2013 and rules issues thereunder
                (as amended from time to time). Though due care has been taken
                while developing the calculating but we take no responsibility
                as to the accuracy, correctness, reliability, currentness,
                timeliness, merchantability or fitness for any particular
                purpose of the Calculator or the result thereof. We shall also
                not be liable for any damage or loss of any kind, as a result of
                reliance on the Calculator or the result thereof.
              </Grid>
            </>
          )}
        </Grid>
      </Box>
      <EditROCFeeCalculator
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}

export default ROCFeeCalculator;

const ResultItems = ({ name, value }) => {
  return (
    <Grid
      item
      container
      xs={12}
      sm={6}
      md={4}
      sx={{
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 1,
        padding: 1,
      }}
    >
      <Grid
        xs={4}
        component={Typography}
        variant="body2"
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </Grid>
      <Grid xs={2}></Grid>
      <Grid
        xs={6}
        sx={{
          border: "1px solid grey",
          padding: "0 1.2rem",
          borderRadius: 1,
        }}
      >
        {value}
      </Grid>
    </Grid>
  );
};
