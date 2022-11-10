import {
  Box,
  Button,
  Dialog,
  DialogActions,
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
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  addChapter,
  editChapter,
  fetchChapters,
} from "../../../../redux/superAdminReducer/superAdminAction";

const EditChapterDialog = (props) => {
  const [chapter, setchapter] = useState(props.chapterData.chapter);
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };
  console.log(props);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(props);
    console.log(chapter);
    await dispatch(editChapter(chapter, props.chapterData._id));
    props.setOpenDialog(false);
    setchapter("");
  };

  useEffect(() => {
    if (props) {
      setchapter(props.chapterData.chapter);
    }
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
        maxWidth="md"
      >
        <DialogTitle fontWeight={600}>Edit Chapter </DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <form onSubmit={submitHandler}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography>Name of the Chapter</Typography>
              <OutlinedInput
                id="outlined-adornment-weight"
                value={chapter}
                onChange={(e) => setchapter(e.target.value)}
                aria-describedby="outlined-weight-helper-text"
                fullWidth
                required
                size="small"
                notched={false}
                label="chapter"
                sx={{
                  mt: 2,
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
                Save
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditChapterDialog;
