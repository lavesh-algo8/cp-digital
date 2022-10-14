import React from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddDocument = (props) => {
  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const Designation = [
    {
      value: "Executive",
    },
    {
      value: "Director",
    },
  ];

  const access = ["Procedures", "Calculators", "Content mangement"];

  return (
    <>
      {/* add admins dialog */}
      <Dialog
        open={props.openDialog} // Use value directly here
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: { borderRadius: 10 },
        }}
        maxWidth="lg"
      >
        <DialogTitle fontWeight={600}>Add New Document</DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Box>

            <Box sx={{ display: "flex", mt: 3 }}>
              <Controller
                name="designation"
                control={control}
                type="text"
                defaultValue={""}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Law</InputLabel>
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Law"
                      {...register("designation", { required: true })}
                      error={errors.designation?.type === "required"}
                    >
                      {Designation.map((desig, index) => (
                        <MenuItem key={desig.value} value={desig.value}>
                          {desig.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Box>

            <Box sx={{ display: "flex", mt: 3 }}>
              <Controller
                name="designation"
                control={control}
                type="text"
                defaultValue={""}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Act</InputLabel>
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Act"
                      {...register("designation", { required: true })}
                      error={errors.designation?.type === "required"}
                    >
                      {Designation.map((desig, index) => (
                        <MenuItem key={desig.value} value={desig.value}>
                          {desig.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Box>

            <Box sx={{ display: "flex" }}>
              <Button
                size="large"
                color="greycol"
                variant="contained"
                sx={{
                  mt: 3,
                  px: 5,
                  textTransform: "none",
                }}
                fullWidth
                onClick={handleDialogClose}
              >
                Cancel
              </Button>
              <Button
                size="large"
                color="primary"
                variant="contained"
                type="submit"
                sx={{
                  mt: 3,
                  px: 5,
                  ml: 2,
                  color: "white",
                  textTransform: "none",
                }}
                fullWidth
                onClick={() =>
                  navigate("/superadmin/documentGenerator/generatenewdocument")
                }
              >
                Create
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
      {/* add admins dialog */}
    </>
  );
};

export default AddDocument;
