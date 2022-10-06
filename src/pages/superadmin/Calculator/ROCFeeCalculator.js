import {
  Box,
  Button,
  CircularProgress,
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
import SettingsIcon from "@mui/icons-material/Settings";
import { useForm } from "react-hook-form";
import EditROCFeeCalculator from "../../../components/superadmin/Calculator/EditROCFeeCalculator";
import { useDispatch } from "react-redux";
import { saveRocFeeCalculator } from "../../../redux/superAdminReducer/superAdminAction";

function ROCFeeCalculator() {
  const [result, setResult] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [formData, setFormData] = useState({
    feeType: "",
    form: "",
    company: "",
    type: "",
    capital: "",
    dayscount: "",
  });

  const dispatch = useDispatch();
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    // console.log(formData);
    setIsLoading(true);
    const resp = await dispatch(saveRocFeeCalculator(formData));
    setResponse(resp);
    setResult(true);
    setIsLoading(false);
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

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
              <Typography sx={{ mb: 1 }} variant="body2">
                Fee Type
              </Typography>
              <Select
                size="small"
                color="whitecol"
                defaultValue="Name"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid grey",
                  },
                  color: "grey",
                  fontSize: "15px",
                  "& .MuiSvgIcon-root": {
                    color: "grey",
                  },
                }}
                value={formData.feeType}
                onChange={handleInput}
                name="feeType"
              >
                {[{ value: "other", title: "Other" }].map((item, index) => (
                  <MenuItem key={index} value={item?.value}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <FormControl fullWidth>
              <Typography sx={{ mb: 1 }} variant="body2">
                Form No
              </Typography>
              <Select
                size="small"
                color="whitecol"
                defaultValue="Name"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid grey",
                  },
                  color: "grey",
                  fontSize: "15px",
                  "& .MuiSvgIcon-root": {
                    color: "grey",
                  },
                }}
                value={formData.form}
                onChange={handleInput}
                name="form"
              >
                {[{ value: "DIR-12", title: "DIR-12" }].map((item, index) => (
                  <MenuItem key={index} value={item?.value}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <FormControl fullWidth>
              <Typography sx={{ mb: 1 }} variant="body2">
                Select Company
              </Typography>
              <Select
                size="small"
                color="whitecol"
                defaultValue="Name"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid grey",
                  },
                  color: "grey",
                  fontSize: "15px",
                  "& .MuiSvgIcon-root": {
                    color: "grey",
                  },
                }}
                value={formData.company}
                onChange={handleInput}
                name="company"
              >
                {[
                  { value: "With share capital", title: "With Share Capital" },
                ].map((item, index) => (
                  <MenuItem key={index} value={item?.value}>
                    {item.title}
                  </MenuItem>
                ))}
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
                value={formData.capital}
                onChange={handleInput}
                name="capital"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <FormControl fullWidth>
              <Typography sx={{ mb: 1 }} variant="body2">
                Select Type
              </Typography>
              <Select
                size="small"
                color="whitecol"
                defaultValue="Name"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid grey",
                  },
                  color: "grey",
                  fontSize: "15px",
                  "& .MuiSvgIcon-root": {
                    color: "grey",
                  },
                }}
                value={formData.type}
                onChange={handleInput}
                name="type"
              >
                {[{ value: "", title: "N/A" }].map((item, index) => (
                  <MenuItem key={index} value={item?.value}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1 }}>
            <FormControl fullWidth>
              <Typography sx={{ mb: 1 }} variant="body2">
                Days Count
              </Typography>

              <TextField
                size="small"
                id="sharecapital"
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid grey",
                  },
                  color: "grey",
                  fontSize: "15px",
                  "& .MuiSvgIcon-root": {
                    color: "grey",
                  },
                }}
                value={formData.dayscount}
                onChange={handleInput}
                name="dayscount"
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
              onClick={submit}
            >
              Test Run
              {isLoading && (
                <CircularProgress sx={{ ml: 2 }} color="inherit" size={20} />
              )}
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
              <ResultItems
                name={"Nominal Fees"}
                value={response?.nominalFees}
              />
              <ResultItems
                name={"Additional Fees"}
                value={response?.additionalFees}
              />
              <ResultItems name={"Total Fees"} value={response?.totalfees} />
              {/* <ResultItems name={"Normal Fee"} value={"10,000.00"} />
              <ResultItems name={"Additional Fee"} value={"N/A"} />
              <ResultItems name={"Total Fee"} value={"10,000.00"} /> */}
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
