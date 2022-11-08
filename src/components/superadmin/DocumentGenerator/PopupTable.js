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
  const { listOfDocuments, selectedDocument } = useSelector(
    (state) => state.SuperAdmin
  );
  const currentDoc = listOfDocuments?.filter(
    (item) => item?.procedure === selectedDocument?.procedure
  )[0];
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
        <Box sx={{ maxHeight: "100vh" }}>
          <Card
            sx={{
              marginTop: "100px",
              mx: 3,
              p: 3,
              borderRadius: "10px",
              height: `calc(100vh - ${120}px)`,
              overflowY: "scroll",
            }}
          >
            {/* <Grid
              container
              xs={12}
              sx={{
                p: 3,
              }}
            > */}
            <Box container item xs={12}>
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
            </Box>

            {/* <Grid container item xs={12}></Grid>
            </Grid> */}
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
              {currentDoc?.documentHeadings?.map((item, index) => {
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
          </Card>
        </Box>
      </Layout>
      <AddSection
        closeDialog={() => SetAddSection(false)}
        openDialog={addSection}
        heading={selectedHeading}
        procedure={currentDoc?.procedure}
      />
    </>
  );
}

export default PopupTable;

function DataRow({ item, index, openAddSection, setSelectedHeading }) {
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();

  const { listOfDocuments, selectedDocument } = useSelector(
    (state) => state.SuperAdmin
  );
  const currentDoc = listOfDocuments?.filter(
    (item) => item?.procedure === selectedDocument?.procedure
  )[0];
  const [procedure, setProcedure] = useState(currentDoc?.procedure);

  const onSubmit = (procedure, heading, section) => {
    navigate(
      `/superadmin/documentGenerator/generatenewdocument/${procedure}/${heading}/${section}`
    );
  };

  const onSubmitEditDocument = (procedure, header, formdata) => {
    alert(procedure);
    alert(header);
    alert(formdata);
    console.log(formdata);
    // navigate("/superadmin/documentGenerator/editDocument");
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
        <Grid container item xs={8}>
          <Grid container item xs={8}>
            <h6>{item.header}</h6>
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
                setSelectedHeading(item.header);
              }}
            >
              Add Section
            </Button>
          </Grid>
          {/* <Grid container item xs={1}></Grid> */}
          {/* <Grid container item xs={3}>
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
          </Grid> */}
        </Grid>
        {/* <Grid container item xs={2}></Grid> */}
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
          {item?.sectionTitles?.map((items, index2) => (
            <Grid container item xs={12} sx={{ padding: "8px 16px" }}>
              <Grid item xs={2}>
                <h6>{index2 + 1}</h6>
              </Grid>
              <Grid item xs={2}>
                <h6>{new Date().toDateString()}</h6>
              </Grid>
              <Grid container item xs={8}>
                <Grid container item xs={7}>
                  <h6>{items}</h6>
                </Grid>
                {/* <Grid container item xs={3}></Grid>
                <Grid container item xs={1}></Grid> */}
                <Grid container item xs={4}>
                  <Button
                    color={
                      item?.forms?.some((item) => item.title === items)
                        ? "info"
                        : "primary"
                    }
                    variant="contained"
                    sx={{
                      color: "white",
                      textTransform: "none",
                    }}
                    fullWidth
                    onClick={() =>
                      item?.forms?.some((item) => item.title === items)
                        ? onSubmitEditDocument(
                            procedure,
                            item.header,
                            (items = item?.forms?.filter(
                              (item) => item.title === items
                            ))
                          )
                        : onSubmit(procedure, item.header, items)
                    }
                  >
                    {item?.forms?.some((item) => item.title === items)
                      ? "Edit"
                      : "Generate"}{" "}
                    Document{" "}
                  </Button>
                  {/* <Button
                    color="secondary"
                    variant="contained"
                    sx={{
                      color: "white",
                      textTransform: "none",
                      mt: 2,
                    }}
                    fullWidth
                    onClick={() =>
                      onSubmitEditDocument(procedure, item.header, items)
                    }
                  >
                    Edit Document
                  </Button> */}
                </Grid>
              </Grid>
              {/* <Grid container item xs={2}></Grid> */}
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
