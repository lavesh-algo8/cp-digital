import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { GREY } from "../../../../Utility/Colors";
import TextInput from "../../../common/TextInput/TextInput";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

function Step4() {
  return (
    <Grid container item xs={12} sx={{ fontSize: "14px" }}>
      <Grid container item xs={12}>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
          FORM AND DOCUMENTS FILING
        </Typography>
      </Grid>
      <Grid container item xs={12} sx={{ m: 1 }}>
        <Typography variant="body1" sx={{ border: 1, p: 1 }}>
          File notice of change of the situation of the registered office and
          verification
        </Typography>
      </Grid>
      <Grid container item xs={12}>
        <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
          You can download the FORM INC-22 here
        </Typography>
        <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
          Once to download the form, fill and sign the form and upload it. After
          uploading, Payment needs to be done for the further process.
        </Typography>
      </Grid>
      <Grid container item xs={12} sx={{ alignItems: "center", m: 1 }}>
        <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
          STEP 1{" "}
        </Typography>
        <Button
          sx={{
            width: "480px",
            height: "48px",
            ml: 2,
          }}
          variant="contained"
        >
          <FileDownloadIcon />
          Download FORM INC-22
        </Button>
      </Grid>
      <Grid container item xs={12} sx={{ alignItems: "center", m: 1 }}>
        <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
          STEP 2
        </Typography>
        <label
          style={{
            width: "480px",
            height: "48px",
            backgroundColor: GREY,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            color: "white",
            marginLeft: "1rem",
          }}
        >
          <p>
            <FileUploadIcon />
            UPLOAD FILLED AND SIGNED FORM INC-22
          </p>
          <input
            type="file"
            style={{
              display: "none",
            }}
          />
        </label>
      </Grid>
    </Grid>
  );
}

export default Step4;
