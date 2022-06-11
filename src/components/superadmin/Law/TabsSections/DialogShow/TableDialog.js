import { AppBar, Dialog, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const TableDialog = ({ open, close }) => {
  const [url, setUrl] = React.useState(
    "https://drive.google.com/file/d/1Hp1ARYpeUAfHjjox0meTfdBTLmgsileO/preview?usp=sharing"
  );

  //   const handleClickOpen = (link) => () => {
  //     setUrl(link);
  //     setOpen(true);
  //   };

  return (
    <>
      {/* pdf modal */}
      <Dialog
        open={open}
        onClose={close}
        fullWidth
        maxWidth="lg"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{
          sx: {
            height: "100%",
          },
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Reading Material
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={close}
              aria-label="close"
            >
              <CancelPresentationIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <iframe
          title="pdf show"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
          src={url}
        />

        {/* <object
          data={url}
          type="application/pdf"
          frameBorder="0"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        >
          <embed
            src="https://drive.google.com/file/d/1Hp1ARYpeUAfHjjox0meTfdBTLmgsileO/preview?usp=sharing"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
            }}
          />
        </object> */}
      </Dialog>
      {/* pdf modal */}
    </>
  );
};

export default TableDialog;
