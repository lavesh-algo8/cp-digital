/* eslint-disable no-unused-vars */
import React from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";

function EditROCFeeCalculator({ openDialog, setOpenDialog }) {
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm();
  const handleDialogClose = () => {
    setOpenDialog(false); // Use the prop.
  };
  return (
    <>
      <Dialog
        open={openDialog} // Use value directly here
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: { borderRadius: 10, minWidth: "900px" },
        }}
        maxWidth="lg"
      >
        <DialogTitle fontWeight={600}>Edit Calculator</DialogTitle>
        <Box position="absolute" top={5} right={160}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              backgroundColor: "grey",
              mr: 2,
              color: "black",
            }}
          >
            Cancel
          </Button>
        </Box>
        <Box position="absolute" top={5} right={80}>
          <Button variant="contained" sx={{ textTransform: "none" }}>
            Update
          </Button>
        </Box>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Grid container sx={{ border: 0 }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Description
            </Typography>
            <Grid
              xs={12}
              sx={{
                p: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "black",
                  backgroundColor: "#f5f5f5",
                  padding: "2px 4px",
                }}
              >
                You can use this tool to calculate your ROC Fee.
              </Typography>
            </Grid>
            {/* fee type select */}
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
            {/* form number select */}
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
            {/* line break */}
            <Grid
              item
              xs={12}
              sx={{
                height: "2px",
                backgroundColor: "black",
                width: "100%",
              }}
            ></Grid>
            {/* selected form No */}
            <Grid
              xs={12}
              sx={{
                p: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  display: "block",
                }}
              >
                Form No
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "black",
                  backgroundColor: "#f5f5f5",
                  padding: "2px 4px",
                }}
              >
                You can use this tool to calculate your ROC Fee.
              </Typography>
            </Grid>
            {/* select company */}
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
            {/* select type */}
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
            {/* Enter Capital */}
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
              item
              xs={12}
              sx={{
                height: "2px",
                backgroundColor: "black",
                width: "100%",
                mb: 1,
              }}
            ></Grid>
            {/* disclaimer */}
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
              sx={{
                mb: 1,
                color: "black",
                backgroundColor: "#f5f5f5",
                padding: "4px 8px",
              }}
              item
              xs={12}
            >
              The result of the aforesaid calculator is based on the relevant
              provisions of the Companies Act 2013 and rules issues thereunder
              (as amended from time to time). Though due care has been taken
              while developing the calculating but we take no responsibility as
              to the accuracy, correctness, reliability, currentness,
              timeliness, merchantability or fitness for any particular purpose
              of the Calculator or the result thereof. We shall also not be
              liable for any damage or loss of any kind, as a result of reliance
              on the Calculator or the result thereof.
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditROCFeeCalculator;
