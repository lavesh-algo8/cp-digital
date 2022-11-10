import React, { useState } from "react";
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
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import UploadIcon from "@mui/icons-material/Upload";
import { useDispatch } from "react-redux";
// import { saveDocument } from "../../../redux/superAdminReducer/superAdminAction";

const UploadDocument = (props) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    file: null,
    law: "",
    act: "",
  });

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("file", userData?.file);
    formData.append("document", userData?.act);
    formData.append("collection", userData?.law);
    // dispatch(saveDocument(formData));
    setUserData({
      file: null,
      law: "",
      act: "",
    });
    props.refresh();
  };

  const Laws = [
    {
      title: "Corporate Law",
      value: "corporatelaw",
    },
  ];

  const Acts = [
    {
      title: "Company Act",
      value: "companyact",
    },
  ];

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
        <DialogTitle fontWeight={600}>Upload Document</DialogTitle>
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
            ></Box>

            <Box sx={{ display: "flex", mt: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Law</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Law"
                  onChange={(e) =>
                    setUserData({ ...userData, law: e.target.value })
                  }
                  value={userData?.law}
                >
                  {Laws.map((desig, index) => (
                    <MenuItem key={desig.value} value={desig.value}>
                      {desig.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", mt: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Act</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Act"
                  onChange={(e) =>
                    setUserData({ ...userData, act: e.target.value })
                  }
                  value={userData?.act}
                >
                  {Acts.map((desig, index) => (
                    <MenuItem key={desig.value} value={desig.value}>
                      {desig.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", mt: 3, flexDirection: "column" }}>
              <Typography variant="body2">Upload</Typography>
              <label className="documentGenerator_upload">
                <UploadIcon /> Upload .DOCX or .PDF format.
                <input
                  type="file"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      file: e.target.files[0],
                    })
                  }
                />
              </label>
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
                onClick={onSubmit}
              >
                Done
              </Button>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
      {/* add admins dialog */}
    </>
  );
};

export default UploadDocument;
