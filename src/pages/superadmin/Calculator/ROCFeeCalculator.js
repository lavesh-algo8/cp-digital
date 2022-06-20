import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import UploadIcon from "@mui/icons-material/Upload";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { useForm } from "react-hook-form";
import SettingsIcon from "@mui/icons-material/Settings";

function ROCFeeCalculator() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 2,
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
          <Button type="submit" variant="contained" sx={{ px: 2 }}>
            Test Run <SettingsIcon sx={{ ml: 2 }} />
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            height: "2px",
            backgroundColor: "black",
            width: "100%",
          }}
        ></Grid>
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
      </Grid>
    </Box>
  );
}

export default ROCFeeCalculator;
