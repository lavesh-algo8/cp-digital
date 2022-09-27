import React, { useEffect, useState } from "react";
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
import {
  getAdminList,
  updateAdmin,
} from "../../redux/superAdminReducer/superAdminAction";

const EditAdminDialog = (props) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
    props.handleClose();
  };

  const preloadedValues = {
    Id_No: "CORPROA1",
    name: "Rahul",
    email: "rahul@corpro.com",
    contact: "7017539182",
    designation: "Executive",
    access: ["Procedures", "Content mangement"],
  };

  const onSubmit = async () => {
    console.log(user);
    const resp = await dispatch(updateAdmin(user, user?._id));
    console.log(resp);
    if (resp) {
      dispatch(getAdminList());
      handleDialogClose();
    }
    // handleDialogClose();
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

  useEffect(() => {
    console.log("Edit Admin");
    console.log(props?.selectedAdmin);
    setUser(props?.selectedAdmin);
  }, [props?.selectedAdmin]);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

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
        <DialogTitle fontWeight={600}>Update Admin Details</DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                size="small"
                name="id_no"
                value={user?.id_no}
                onChange={handleChange}
                label="Id No*"
                variant="outlined"
                fullWidth
              />

              <TextField
                size="small"
                sx={{ ml: 2 }}
                name="name"
                value={user?.name}
                onChange={handleChange}
                label="name*"
                variant="outlined"
                fullWidth
              />
            </Box>

            <TextField
              size="small"
              sx={{ mt: 3 }}
              name="email"
              value={user?.email}
              onChange={handleChange}
              label="Email Id*"
              variant="outlined"
              fullWidth
            />

            <Box sx={{ display: "flex", mt: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Designation
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="designation"
                  label="Designation"
                  name="designation"
                  value={user?.designation}
                  onChange={handleChange}
                >
                  {Designation.map((desig, index) => (
                    <MenuItem key={desig.value} value={desig.value}>
                      {desig.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                size="small"
                sx={{ ml: 3 }}
                name="contact_number"
                value={user?.contact_number}
                onChange={handleChange}
                label="contact No*"
                variant="outlined"
                fullWidth
              />
            </Box>

            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel
                id="demo-multiple-chip-label"
                sx={{ background: "white" }}
              >
                Access
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                name="access"
                id="demo-multiple-chip"
                value={user?.access}
                onChange={handleChange}
                label="Access"
              >
                {access.map((desig) => (
                  <MenuItem key={desig} value={desig}>
                    {desig}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
                onClick={onSubmit}
              >
                Update
              </Button>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
      {/* add admins dialog */}
    </>
  );
};

export default EditAdminDialog;
