import { Button, Card, Grid, TableContainer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Navigate, useNavigate } from "react-router-dom";
import AddSection from "./AddSection";

function PopupTable() {
  const dispatch = useDispatch();
  const { listOfDocuments, selectedDocument = {} } = useSelector(
    (state) => state.SuperAdmin
  );
  // const currentDoc = listOfDocuments?.filter(
  //   (item) => item?.id === selectedDocument?.id
  // )[0];
  const currentDoc = listOfDocuments[0][0]?.result?.temp;
  console.log(currentDoc);
  const navigate = useNavigate();
  const [addSection, SetAddSection] = useState(false);
  const [selectedHeading, setSelectedHeading] = useState(null);

  // useEffect(() => {
  //   return () => {
  //     setSelectedHeading(null);
  //     dispatch({
  //       type: "SET_SELECT_DOCUMENT",
  //       payload: {},
  //     });
  //   };
  // }, []);

  return (
    <>
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
                  Document Generator {currentDoc?.id}
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
            {currentDoc?.map((item, index) => {
              console.log(item);
              return (
                <DataRow
                  index={index}
                  item={item}
                  key={index}
                  openAddSection={() => SetAddSection(true)}
                  setSelectedHeading={setSelectedHeading}
                />
              );
            })}
          </Grid>
        </Grid>
      </Layout>
      <AddSection
        closeDialog={() => SetAddSection(false)}
        openDialog={addSection}
        id={selectedHeading}
      />
    </>
  );
}

export default PopupTable;

function DataRow({ item, index, openAddSection, setSelectedHeading }) {
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (item) => {
    navigate(`/superadmin/documentGenerator/generatenewdocument/${item}`);
  };

  return (
    <Grid container xs={12} sx={{ margin: "8px 0" }}>
      <Grid
        container
        item
        xs={12}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setExpand(!expand);
        }}
      >
        <Grid item xs={2}>
          <h6>{index + 1}</h6>
        </Grid>
        <Grid item xs={2}>
          <h6>{new Date().toDateString()}</h6>
        </Grid>
        <Grid container item xs={6}>
          <Grid container item xs={5}>
            <h6>{item.documentHeadings}</h6>
          </Grid>
          <Grid container item xs={3}>
            <Button
              color="greycol"
              variant="contained"
              sx={{
                textTransform: "none",
              }}
              fullWidth
              onClick={() => {
                openAddSection();
                // setSelectedHeading(item?.id);
                setSelectedHeading(item.documentHeadings);
              }}
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
              disabled={item?.sections?.length !== 0}
              //   onClick={onSubmit}
            >
              {item?.sections?.length === 0 ? "Edit" : "Generate"} Document{" "}
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={2}></Grid>
      </Grid>

      {expand && (
        <>
          <Grid
            container
            xs={12}
            sx={{ margin: "12px 0", padding: "8px 16px" }}
          >
            <Grid item xs={2}>
              Sl. No.
            </Grid>
            <Grid item xs={2}>
              Date
            </Grid>
            <Grid item xs={6}>
              Section Heading
            </Grid>
            <Grid item xs={2}>
              Action
            </Grid>
          </Grid>
          {item?.titles?.map((item, index2) => (
            <Grid container item xs={12} sx={{ padding: "8px 16px" }}>
              <Grid item xs={2}>
                <h6>{index2 + 1}</h6>
              </Grid>
              <Grid item xs={2}>
                <h6>{new Date().toDateString()}</h6>
              </Grid>
              <Grid container item xs={6}>
                <Grid container item xs={5}>
                  <h6>{item}</h6>
                </Grid>
                <Grid container item xs={3}></Grid>
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
                    onClick={() => onSubmit(item)}
                  >
                    {item?.sections?.length === 0 ? "Edit" : "Generate"}{" "}
                    Document{" "}
                  </Button>
                </Grid>
              </Grid>
              <Grid container item xs={2}></Grid>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
