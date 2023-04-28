import {
  Button,
  Card,
  Checkbox,
  Grid,
  IconButton,
  TableContainer,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import AddSection from "./AddSection";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {
  fetchProcedureHeadings,
  getAllTemplates,
} from "../../../../../redux/superAdminReducer/superAdminAction";
import { Add, Delete, Edit } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// import EditSection from "./EditSection";
// import DeleteSection from "./DeleteSection";

function ViewTemplateHeadingsDoc() {
  const params = useParams();
  const dispatch = useDispatch();
  const {
    listOfDocuments,
    selectedDocument,
    procedureHeadingsList,
    templateDocIds,
  } = useSelector((state) => state.SuperAdmin);

  const { selectedTemplate, listOfTemplates } = useSelector(
    (state) => state.SuperAdmin
  );
  console.log(selectedTemplate);

  const currentTemplate = listOfTemplates?.filter(
    (item) => item?._id === selectedTemplate?._id
  )[0];
  console.log(currentTemplate);
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

  useEffect(() => {
    dispatch(getAllTemplates());
  }, [addSection]);

  return (
    <>
      <Box
        sx={{
          p: 3,
        }}
      >
        <Box container item xs={12}>
          <div
            style={{
              display: "flex",
              marginLeft: "10px",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Template : {currentTemplate?.procedurename}
            </Typography>
          </div>
        </Box>

        <Grid
          container
          xs={12}
          sx={{
            backgroundColor: "white",
            p: 2,
            mt: 2,
          }}
        >
          <Grid container xs={12} sx={{ margin: "12px 0", color: "#224260" }}>
            <Grid item xs={2}>
              Sl. No.
            </Grid>
            <Grid item xs={2}>
              Date
            </Grid>
            <Grid item xs={6}>
              Template Heading
            </Grid>
            <Grid item xs={2} display="flex" justifyContent="center">
              Action
            </Grid>
          </Grid>
          {currentTemplate?.templateHeadings?.map((item, index) => {
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
      </Box>
    </>
  );
}

export default ViewTemplateHeadingsDoc;

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
  const params = useParams();

  const { templateDocIds, selectedTemplate } = useSelector(
    (state) => state.SuperAdmin
  );
  //   const currenttemplate = listOfDocuments?.filter(
  //     (item) => item?.procedure === selectedDocument?.procedure
  //   )[0];
  //   const [procedure, setProcedure] = useState(currenttemplate?.procedure);

  const onSubmit = (items, item) => {
    console.log(items);
    console.log(item);
    navigate(
      `/superadmin/generator/templateGenerator/${params.templateId}/${item.templateHeading}/${items.sectionHeading}`
    );
  };

  const onSubmitEditDocument = (items) => {
    // navigate(
    //   `/superadmin/generator/documentGenerator/editsectiondocument/${items?.title}/${items?._id}`
    // );
  };

  const handleCheckBox = async (e, section, tempheading) => {
    console.log(e.target.value);
    console.log(section);
    console.log(tempheading);
    console.log(selectedTemplate);

    const finalData = {
      templateId: selectedTemplate._id,
      templateHeading: tempheading._id,
      templateSection: section._id,
      title: section.formData.title,
    };

    console.log({
      templateId: selectedTemplate._id,
      templateHeading: tempheading._id,
      templateSection: section._id,
      title: section.formData.title,
    });

    if (templateDocIds.some((item) => item.templateSection === section._id)) {
      await dispatch({
        type: "REMOVE_TEMPLATES_DOC_ID",
        payload: finalData,
      });
    } else {
      await dispatch({
        type: "SET_TEMPLATES_DOC_ID",
        payload: finalData,
      });
    }
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
            <h6>{item.templateHeading}</h6>
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
              {/* <Button
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
              </Button> */}
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
            <Grid item xs={4}>
              Section Heading
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center">
              Document
            </Grid>
          </Grid>
          {item.templateSection.map((items, index2) => (
            <Grid
              container
              item
              xs={12}
              sx={{
                py: 2,
                px: 3,
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
                <Grid container item xs={6}>
                  <h6>{items.sectionHeading}</h6>
                </Grid>
                <Grid
                  container
                  item
                  xs={6}
                  display="flex"
                  // justifyContent="flex-end"
                  justifyContent="center"
                >
                  {/* <Button
                    disabled
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
                        : onSubmit(items, item);
                    }}
                  >
                    {items?.formData ? "Edit" : "Generate"} Document{" "}
                  </Button> */}
                  {items?.formData && (
                    <Box sx={{ ml: 2 }}>
                      <Checkbox
                        checked={templateDocIds?.some(
                          (item) => item.templateSection === items._id
                        )}
                        onClick={(e) => handleCheckBox(e, items, item)}
                        color="secondary"
                      />
                    </Box>
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
