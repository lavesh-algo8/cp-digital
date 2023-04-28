import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

const ViewDocumentsMapped = (props) => {
  const navigate = useNavigate();

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  console.log(props);

  return (
    <>
      {/*  dialog */}
      <Dialog
        open={props.openDialog} // Use value directly here
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: { borderRadius: 10 },
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle fontWeight={600}>Documents</DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <div style={{ width: "100%" }}>
            {props.tempFormDataArr?.map((item, index) => (
              <>
                <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                  <InsertDriveFileOutlinedIcon />
                  <Typography
                    sx={{
                      ml: 1,
                      cursor: "pointer",
                      color: "blue",
                    }}
                    onClick={() => {
                      navigate(
                        `/superadmin/generator/templateGenerator/${item.templateId}/edittemplatedocument`
                      );
                    }}
                  >
                    {item.title}
                  </Typography>
                  <br />
                </Box>
              </>
            ))}
            {props.tempSecFormDataArr?.map((item, index) => (
              <>
                <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
                  <InsertDriveFileOutlinedIcon />
                  <Typography
                    sx={{
                      ml: 1,
                      cursor: "pointer",
                      color: "blue",
                    }}
                    onClick={() => {
                      navigate(
                        `/superadmin/generator/templateGenerator/${item.templateId}/${item.templateSection}/editSectionDocument`
                      );
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              </>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      {/* add admins dialog */}
    </>
  );
};

export default ViewDocumentsMapped;
