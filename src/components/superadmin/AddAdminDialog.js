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
import { useDispatch } from "react-redux";
import { addAdmin } from "../../redux/superAdminReducer/superAdminAction";
import { openSnackBar } from "../../redux/utilityReducer/UtilityAction";

const AddAdminDialog = (props) => {
  const dispatch = useDispatch();
  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const formData = {
      id_no: data?.Id_No,
      name: data?.name,
      email: data?.email,
      contact_number: data?.contact,
      access: data?.access,
      designation: data?.designation,
    };
    let isAdded = await dispatch(addAdmin(formData));
    console.log(isAdded);
    if (isAdded) {
      handleDialogClose();
    }
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
        <DialogTitle fontWeight={600}>Add Admin</DialogTitle>
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
            >
              <TextField
                size="small"
                id="Id_No"
                label="Id No*"
                variant="outlined"
                {...register("Id_No", {
                  required: true,
                })}
                fullWidth
                error={errors.Id_No?.type === "required"}
              />

              <TextField
                size="small"
                sx={{ ml: 2 }}
                id="name"
                label="name*"
                variant="outlined"
                {...register("name", { required: true })}
                fullWidth
                error={errors.name?.type === "required"}
              />
            </Box>

            <TextField
              size="small"
              sx={{ mt: 3 }}
              id="email"
              label="Email Id*"
              variant="outlined"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              fullWidth
              error={
                errors.email?.type === "required" ||
                errors?.email?.type === "pattern"
              }
            />

            <Box sx={{ display: "flex", mt: 3 }}>
              <Controller
                name="designation"
                control={control}
                type="text"
                defaultValue={""}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Designation
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Designation"
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

              <TextField
                size="small"
                sx={{ ml: 3 }}
                id="contact"
                label="contact No*"
                variant="outlined"
                {...register("contact", {
                  required: true,
                })}
                fullWidth
                error={errors.contact?.type === "required"}
              />
            </Box>

            <Controller
              name="access"
              control={control}
              type="text"
              defaultValue={[]}
              render={({ field }) => (
                <FormControl fullWidth sx={{ mt: 3 }} size="large">
                  <InputLabel id="demo-multiple-chip-label">Access</InputLabel>
                  <Select
                    {...field}
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    label="Access"
                    // multiple
                    // input={
                    //   <OutlinedInput id="select-multiple-chip" label="Chip" />
                    // }
                    // renderValue={(selected) => (
                    //   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    //     {selected.map((value) => (
                    //       <Chip key={value} label={value} />
                    //     ))}
                    //   </Box>
                    // )}
                    {...register("access", { required: true })}
                    error={errors.access?.type === "required"}
                  >
                    {access.map((desig) => (
                      <MenuItem key={desig} value={desig}>
                        {desig}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

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
              >
                Save
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
      {/* add admins dialog */}
    </>
  );
};

export default AddAdminDialog;
