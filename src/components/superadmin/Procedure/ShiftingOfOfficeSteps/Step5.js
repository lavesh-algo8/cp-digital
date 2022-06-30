import { Grid, Typography } from "@mui/material";
import React from "react";

function Step5() {
  return (
    <Grid container item xs={12} sx={{ fontSize: "14px" }}>
      <Grid container item xs={12}>
        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
          POST-COMPLIANCES
        </Typography>
      </Grid>
      <Grid container item xs={12} sx={{ m: 1 }}>
        <Typography variant="body1" sx={{ border: 1, p: 1, fontSize: "14px" }}>
          1.Change the existing registered office address of the company to the
          new address:
          <br />
          <span>
            (i) Outside of every office or place in which it's business is
            carried on.
          </span>
          <br />
          <span>
            (ii)On all business letters, billheads, letter papers and in all its
            notices and other official publications.
          </span>
          <br />
          2.Inform the change in registered office of the company to all the
          stationary authorities, wherever the company is registered.
        </Typography>
      </Grid>
      <Grid container item xs={12}>
        <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
          At the end of the procedure automated "MIS" will be generated with the
          following information:
        </Typography>
      </Grid>
      <Grid container item xs={12} sx={{ mb: 1 }}>
        <Grid
          container
          item
          xs={12}
          sx={{
            alignItems: "center",
          }}
        >
          <Grid container item xs={12} md={4}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              1. Company Name
            </Typography>
          </Grid>
          <Grid container item xs={12} md={8}>
            <p
              style={{
                border: "1px solid grey",
                padding: "4px 16px",
                borderRadius: "4px",
                width: "100%",
              }}
            >
              WELCOME INDIA VISIT PRIVATE LIMITED
            </p>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          sx={{
            alignItems: "center",
          }}
        >
          <Grid container item xs={12} md={4}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              2. CIN
            </Typography>
          </Grid>
          <Grid container item xs={12} md={8}>
            <p
              style={{
                border: "1px solid grey",
                padding: "4px 16px",
                width: "100%",
                borderRadius: "4px",
              }}
            >
              U7598WNCK242938JKCDX
            </p>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          sx={{
            alignItems: "center",
          }}
        >
          <Grid container item xs={12} md={4}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              3. Assignment Name
            </Typography>
          </Grid>
          <Grid container item xs={12} md={8}>
            <p
              style={{
                border: "1px solid grey",
                padding: "4px 16px",
                borderRadius: "4px",
                width: "100%",
              }}
            >
              Shifting of Registered Office within the Local Limits of the
              City/Town/Village
            </p>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          sx={{
            alignItems: "center",
          }}
        >
          <Grid container item xs={12} md={4}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              4. Time taken during completion of the assignment
            </Typography>
          </Grid>
          <Grid container item xs={12} md={8}>
            <p
              style={{
                border: "1px solid grey",
                padding: "4px 16px",
                borderRadius: "4px",
                width: "100%",
              }}
            >
              5 days (01/07/2022 to 01/08/2022)
            </p>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          sx={{
            alignItems: "flex-start",
          }}
        >
          <Grid container item xs={12} md={4}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
              5. Documents generated during assignment
            </Typography>
          </Grid>
          <Grid container item xs={12} md={8}>
            <p
              style={{
                border: "1px solid grey",
                padding: "4px 16px",
                borderRadius: "4px",
                width: "100%",
              }}
            >
              (i) Notice of Board Meeting{" "}
              <button className="custom_download">
                <i class="fa-solid fa-download"></i>Download
              </button>
              <br />
              (ii) CTC of Board Meeting{" "}
              <button className="custom_download">
                <i class="fa-solid fa-download"></i>Download
              </button>
              <br />
              (iii) Minutes of the Board Meeting{" "}
              <button className="custom_download">
                <i class="fa-solid fa-download"></i>Download
              </button>
              <br />
              (iv) Disclosure of Stock Exchange (in case of listed company){" "}
              <button className="custom_download">
                <i class="fa-solid fa-download"></i>Download
              </button>
              <br />
              (v) Form INC-22{" "}
              <button className="custom_download">
                <i class="fa-solid fa-download"></i>Download
              </button>
            </p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Step5;
