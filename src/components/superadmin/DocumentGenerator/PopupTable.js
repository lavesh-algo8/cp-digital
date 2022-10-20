import { Button, Card, Grid, TableContainer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import Layout from "../Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function PopupTable() {
  const { selectedDocument = {} } = useSelector((state) => state.SuperAdmin);
  const navigate = useNavigate();

  return (
    <Layout>
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: "100px",
          position: "relative",
          zIndex: "12",
          borderRadius: "10px",
          // height: "180vh",
          overflowY: "scroll",
          p: 6,
        }}
      >
        <Grid
          container
          item
          xs={12}
          sx={{
            backgroundColor: "white",
            p: 6,
          }}
        >
          <Grid container item xs={12}>
            <div
              style={{
                display: "flex",
              }}
            >
              <Button onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </Button>
              <Typography variant="h6" fontWeight={600}>
                Document Generator
              </Typography>
            </div>
            <Grid
              item
              lg={9}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              {/* <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                    lg: "block",
                    xl: "block",
                  },
                  mr: 3,
                }}
              ></Box> */}
            </Grid>
          </Grid>

          <Grid container item xs={12}></Grid>
        </Grid>
        <Grid
          container
          xs={12}
          sx={{
            backgroundColor: "white",
            p: 2,
          }}
        >
          <Grid container xs={12} sx={{ margin: "12px 0" }}>
            <Grid item xs={2}>
              Sl. No.
            </Grid>
            <Grid item xs={2}>
              Date
            </Grid>
            <Grid item xs={6}>
              Document Heading
            </Grid>
            <Grid item xs={2}>
              Action
            </Grid>
          </Grid>
          {selectedDocument?.headings?.map((item, index) => (
            <Grid container xs={12} sx={{ margin: "8px 0" }}>
              <Grid item xs={2}>
                <h4>{index + 1}</h4>
              </Grid>
              <Grid item xs={2}>
                <h4>{new Date().toDateString()}</h4>
              </Grid>
              <Grid container item xs={6}>
                <Grid container item xs={5}>
                  <h4>{item?.heading}</h4>
                </Grid>
                <Grid container item xs={3}>
                  <Button
                    color="greycol"
                    variant="contained"
                    sx={{
                      textTransform: "none",
                    }}
                    fullWidth
                  >
                    Add Section
                  </Button>
                </Grid>
                <Grid container item xs={1}></Grid>
                <Grid container item xs={3}>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{
                      color: "white",
                      textTransform: "none",
                    }}
                    fullWidth
                    //   onClick={onSubmit}
                  >
                    Edit Document
                  </Button>
                </Grid>
              </Grid>
              <Grid container item xs={2}></Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default PopupTable;
