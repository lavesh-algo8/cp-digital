import {
  Button,
  Card,
  Grid,
  IconButton,
  TableContainer,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AddSection from "./AddSection";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { fetchProcedureHeadings } from "../../../redux/superAdminReducer/superAdminAction";
import { Add, Delete, Edit } from "@mui/icons-material";
import EditSection from "./EditSection";
import DeleteSection from "./DeleteSection";

function PopupTable() {
  const params = useParams();
  const dispatch = useDispatch();
  const { listOfDocuments, selectedDocument, procedureHeadingsList } =
    useSelector((state) => state.SuperAdmin);
  const currentDoc = listOfDocuments?.filter(
    (item) => item?.procedure === selectedDocument?.procedure
  )[0];
  console.log(currentDoc);
  console.log(procedureHeadingsList);
  const navigate = useNavigate();
  const [addSection, SetAddSection] = useState(false);
  const [editSection, SetEditSection] = useState(false);
  const [deleteSection, SetDeleteSection] = useState(false);
  const [selectedHeading, setSelectedHeading] = useState(null);
  const [selectedSectionData, setSelectedSectionData] = useState(null);

  useEffect(() => {
    dispatch(fetchProcedureHeadings(params.procedureId));
  }, [params, addSection, deleteSection, selectedSectionData, editSection]);

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

            <Grid
              container
              xs={12}
              sx={{
                backgroundColor: "white",
                p: 2,
              }}
            >
              <Grid
                container
                xs={12}
                sx={{ margin: "12px 0", color: "#224260" }}
              >
                <Grid item xs={2}>
                  Sl. No.
                </Grid>
                <Grid item xs={2}>
                  Date
                </Grid>
                <Grid item xs={6}>
                  Document Heading
                </Grid>
                <Grid item xs={2} display="flex" justifyContent="center">
                  Action
                </Grid>
              </Grid>
              {procedureHeadingsList?.headings?.map((item, index) => {
                console.log(item);
                return (
                  <DataRow
                    index={index}
                    item={item}
                    key={index}
                    openAddSection={() => SetAddSection(true)}
                    setSelectedHeading={setSelectedHeading}
                    openEditSection={() => SetEditSection(true)}
                    setSelectedSectionData={setSelectedSectionData}
                    openDeleteSection={() => SetDeleteSection(true)}
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
      />
      <EditSection
        closeDialog={() => SetEditSection(false)}
        openDialog={editSection}
        selectedSectionData={selectedSectionData}
      />
      <DeleteSection
        closeDialog={() => SetDeleteSection(false)}
        openDialog={deleteSection}
        selectedSectionData={selectedSectionData}
      />
    </>
  );
}

export default PopupTable;

function DataRow({
  item,
  index,
  openAddSection,
  openEditSection,
  openDeleteSection,
  setSelectedHeading,
  setSelectedSectionData,
}) {
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { listOfDocuments, selectedDocument, procedureHeadingsList } =
    useSelector((state) => state.SuperAdmin);
  const currentDoc = listOfDocuments?.filter(
    (item) => item?.procedure === selectedDocument?.procedure
  )[0];
  const [procedure, setProcedure] = useState(currentDoc?.procedure);

  const onSubmit = (subsectiontitle, subheadingId) => {
    navigate(
      `/superadmin/documentGenerator/generatedocument/${subsectiontitle}/${subheadingId}`
    );
  };

  const onSubmitEditDocument = (items) => {
    navigate(
      `/superadmin/documentGenerator/editsectiondocument/${items?.title}/${items?._id}`
    );
    // alert(procedure);
    // alert(header);
    // alert(formdata);
    // console.log(formdata);
    // navigate("/superadmin/documentGenerator/editDocument");
  };

  return (
    <Grid container xs={12} sx={{ margin: "10px 0" }}>
      <Grid
        container
        item
        xs={12}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setExpand(!expand);
        }}
      >
        <Grid item xs={2} display="flex" alignItems="center">
          <h6>
            <b>{index + 1}.</b>
          </h6>
        </Grid>
        <Grid item xs={2} display="flex" alignItems="center">
          <h6>{new Date().toDateString()}</h6>
        </Grid>
        <Grid container item xs={8}>
          <Grid container item xs={8} display="flex" alignItems="center">
            <h6>{item}</h6>
          </Grid>
          <Grid
            container
            item
            xs={4}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                color="greycol"
                variant="contained"
                sx={{
                  textTransform: "none",
                  mr: 3,
                }}
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  openAddSection();
                  setSelectedHeading(item);
                }}
              >
                <Add fontSize="small" />
                Add Section
              </Button>
              {/* <IconButton sx={{ ml: 1 }} onClick={(e) => e.stopPropagation()}>
                <Delete color="primary" />
              </IconButton> */}
              {/* <Typography sx={{ ml: 2 }}>
                {expand ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </Typography> */}
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {expand && (
        <>
          <Grid
            container
            xs={12}
            sx={{
              marginTop: "12px",
              padding: "8px 16px",
              background: "#BDBDBD",
              color: "#2A4966",
            }}
          >
            <Grid item xs={2}>
              Sl. No.
            </Grid>
            <Grid item xs={2}>
              Date
            </Grid>
            <Grid item xs={5}>
              Section Heading
            </Grid>
            <Grid item xs={3} display="flex" justifyContent="center">
              Action
            </Grid>
          </Grid>
          {procedureHeadingsList.heading_with_titles[index]
            .filter((row) => row.documentHeading === item)
            .map((items, index2) => (
              <Grid
                container
                item
                xs={12}
                sx={{
                  py: 2,
                  px: 3,
                  // padding: "8px 16px",
                  background: "#707070",
                  color: "white",
                }}
              >
                <Grid item xs={2}>
                  <h6>{index2 + 1}</h6>
                </Grid>
                <Grid item xs={2}>
                  <h6>{new Date().toDateString()}</h6>
                </Grid>
                <Grid container item xs={8}>
                  <Grid container item xs={7}>
                    <h6>{items.title}</h6>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={5}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <Button
                      color={items?.formData ? "info" : "primary"}
                      variant="contained"
                      sx={{
                        color: "white",
                        textTransform: "none",
                        width: "22ch",
                      }}
                      fullWidth
                      onClick={() => {
                        dispatch({
                          type: "SET_SELECT_SUB_HEADING_DOCUMENT",
                          payload: items,
                        });
                        items?.formData
                          ? onSubmitEditDocument(items)
                          : onSubmit(items.title, items._id);
                      }}
                    >
                      {items?.formData ? "Edit" : "Generate"} Document{" "}
                    </Button>
                    <IconButton
                      sx={{ ml: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteSection();
                        setSelectedSectionData(items);
                      }}
                    >
                      <Delete sx={{ color: "white" }} />
                    </IconButton>
                    {items?.formData ? (
                      ""
                    ) : (
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditSection();
                          setSelectedSectionData(items);
                        }}
                      >
                        <Edit sx={{ color: "white" }} />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </>
      )}
    </Grid>
  );
}
