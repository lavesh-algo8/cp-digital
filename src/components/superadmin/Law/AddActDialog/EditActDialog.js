import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  addAct,
  editAct,
  fetchCategory,
} from "../../../../redux/superAdminReducer/superAdminAction";
import { useNavigate, useParams } from "react-router-dom";

const EditActDialog = (props) => {
  const params = useParams();
  const { category, actid } = params;
  const oldcategory = category;
  const oldactid = actid;
  const [act, setact] = useState(props && props.act);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editAct(act, props.actid));
    await dispatch(fetchCategory());
    navigate(`/superadmin/laws/${oldcategory}/${act}/${oldactid}`);
    setact("");
    props.setOpenDialog(false);
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
        <DialogTitle fontWeight={600}>
          Edit Act : <span style={{ color: "grey" }}>{props.act}</span>
        </DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent style={{ width: "480px" }}>
          <div style={{ width: "100%" }}>
            <form onSubmit={onSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography>Name of the Act</Typography>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  value={act}
                  onChange={(e) => setact(e.target.value)}
                  aria-describedby="outlined-weight-helper-text"
                  fullWidth
                  size="small"
                  notched={false}
                  required
                  label="act"
                  sx={{
                    mt: 2,
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", mt: 2, mb: 2 }}>
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditActDialog;
