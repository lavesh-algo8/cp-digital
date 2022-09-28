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
import {
  getSubAdminList,
  updateSubAdmin,
} from "../../redux/superAdminReducer/superAdminAction";
import { useDispatch } from "react-redux";

const EditSubAdminDialog = (props) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    props.setOpenSubAdminDialog(false); // Use the prop.
    props.handleClose();
  };

  const onSubmit = async () => {
    const resp = await dispatch(updateSubAdmin(user, user?._id));
    console.log(user);
    if (resp) {
      dispatch(getSubAdminList());
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

  const access = [
    "Comapany Law",
    "Civil Law",
    "Corporate Law",
    "Procedures",
    "Calculators",
  ];

  const SubAdmins = [
    {
      name: "Rahul",
    },
    {
      name: "Shayam",
    },
    {
      name: "Mohan",
    },
    {
      name: "Sahil",
    },
    {
      name: "Fatima",
    },
  ];

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
      {/* add Subadmins dialog */}
      <Dialog
        open={props.openSubAdminDialog} // Use value directly here
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: { borderRadius: 10 },
        }}
        maxWidth="lg"
      >
        <DialogTitle fontWeight={600}>Update Sub-admin Details</DialogTitle>
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
                id="Id_No"
                label="Id No*"
                fullWidth
                name="id_no"
                value={user?.id_no}
                onChange={handleChange}
              />

              <TextField
                size="small"
                sx={{ ml: 2 }}
                label="name*"
                variant="outlined"
                fullWidth
                name="name"
                value={user?.name}
                onChange={handleChange}
              />
            </Box>

            <TextField
              size="small"
              sx={{ mt: 3 }}
              label="Email Id*"
              variant="outlined"
              fullWidth
              name="email"
              value={user?.email}
              onChange={handleChange}
            />

            <FormControl fullWidth size="small" sx={{ mt: 3 }}>
              <InputLabel
                id="input_designationselected"
                sx={{ backgroundColor: "white" }}
              >
                Managed by (admin)
              </InputLabel>
              <Select
                labelId="input_designationselected"
                id="manageByAdmin"
                label="manageByAdmin"
                name="managed_by"
                value={user?.managed_by}
                onChange={handleChange}
              >
                {SubAdmins.map((admin, index) => (
                  <MenuItem key={admin.name} value={admin.name}>
                    {admin.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
                label="contact No*"
                variant="outlined"
                fullWidth
                name="contact_number"
                value={user?.contact_number}
                onChange={handleChange}
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
                id="access"
                label="Access"
                value={user?.access}
                name="access"
                onChange={handleChange}
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

export default EditSubAdminDialog;
