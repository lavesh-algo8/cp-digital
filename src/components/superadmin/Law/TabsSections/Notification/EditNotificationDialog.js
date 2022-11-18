import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
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
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import htmlToDraft from "html-to-draftjs";
import { editNotification } from "../../../../../redux/superAdminReducer/superAdminAction";

const EditNotificationDialog = (props) => {
  const notificationId = props?.notificationsDetails._id;

  const [notificationName, setnotificationName] = useState("");

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hey");

    const data = {
      notification_heading: notificationName,
    };
    console.log(data);

    await dispatch(editNotification(data, notificationId));
    setnotificationName("");
    props.setOpenDialog(false);
  };

  useEffect(() => {
    setnotificationName(props?.notificationsDetails.notification_heading);
  }, [props]);

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
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle fontWeight={600}>Edit Notification </DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ mt: 2 }}>Name of the Notification</Typography>
              <OutlinedInput
                multiline
                rows={3}
                id="outlined-adornment-weight"
                value={notificationName}
                onChange={(e) => setnotificationName(e.target.value)}
                aria-describedby="outlined-weight-helper-text"
                fullWidth
                required
                size="small"
                notched={false}
                label="Law"
                sx={{
                  mt: 1,
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                mt: 2,
                mb: 2,
                justifyContent: "center",
              }}
            >
              <Button
                size="large"
                color="greycol"
                variant="contained"
                sx={{
                  mt: 3,
                  px: 5,
                  textTransform: "none",
                }}
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
                  ml: 4,
                  color: "white",
                  textTransform: "none",
                }}
              >
                Update
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditNotificationDialog;
