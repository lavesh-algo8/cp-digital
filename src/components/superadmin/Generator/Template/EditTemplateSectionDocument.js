import { Grid, TextField, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { FormBuilder } from "@formio/react";
import "formiojs/dist/formio.builder.min.css";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addDocumentTemplate,
  editProcedureDocument,
  fetchtemplatebyid,
} from "../../../../redux/superAdminReducer/superAdminAction";
import Generator from "../../../../pages/superadmin/Generator/Generator";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const EditTemplateSectionDocument = () => {
  const { procedureId } = useParams();
  const { selectedTemplate, template } = useSelector(
    (state) => state.SuperAdmin
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [load, setload] = useState(false);

  const [title, setTitle] = useState("");
  const [myform, setmyform] = useState({});
  const schemaRef = useRef();
  const params = useParams();
  console.log(template);
  const onSubmitHandler = async () => {
    if (title === "") {
      alert("Please Enter Form Title");
      return;
    }
    console.log(schemaRef);
    const formData = { ...schemaRef.current, title };
    console.log(formData);
    const finalData = {
      formdata: formData,
    };
    console.log(finalData);
    // const success = await dispatch(
    //   addDocumentTemplate(formData, params.templateId)
    // );
    // console.log(success);
    // if (success) {
    //   navigate(-1);
    // }
  };

  useEffect(() => {
    // const res = dispatch(fetchtemplatebyid(params.templateId));
    // console.log(res);
    gettempData();
  }, [params.templateId]);

  const gettempData = async () => {
    const res = await dispatch(fetchtemplatebyid(params.templateId));
    console.log(res);
    if (res) {
      console.log(res);
      let sectionFormData = {};
      res.templateHeadings.map((item, index) => {
        item.templateSection.map((sec, item) => {
          if (sec._id === params.sectionId) {
            console.log(sec);
            sectionFormData = sec;
          }
        });
      });
      console.log(sectionFormData);
      setTitle(sectionFormData?.formData?.title);
      setmyform(sectionFormData?.formData);
      setload(true);
    }
  };

  //   useEffect(() => {
  //     window.location.reload();
  //   }, []);

  //   useEffect(() => {
  //     if (template) {
  //       console.log(template);
  //       let sectionFormData = {};
  //       template.templateHeadings.map((item, index) => {
  //         item.templateSection.map((sec, item) => {
  //           if (sec._id === params.sectionId) {
  //             console.log(sec);
  //             sectionFormData = sec;
  //           }
  //         });
  //       });
  //       console.log(sectionFormData);
  //       setTitle(sectionFormData?.formData?.title);
  //       setmyform(sectionFormData?.formData);
  //       setload(true);
  //     }
  //   }, [template]);

  return (
    <>
      <Generator>
        <Grid
          container
          item
          xs={12}
          sx={{
            backgroundColor: "white",
            borderRadius: "6px",
            pr: 2,
          }}
        >
          <Container sx={{ mt: 2, mb: 3, display: "flex" }}>
            <Button
              variant="contained"
              size="small"
              sx={{
                maxWidth: "30px",
                minWidth: "30px",
                paddingLeft: "18px",
              }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIosIcon fontSize="small" />
            </Button>
            <Typography variant="h5" fontWeight="bold" sx={{ ml: 4 }}>
              Edit Template Document
            </Typography>
          </Container>
          <Container maxWidth={false}>
            <Grid container>
              <Grid item lg={4} xs={4}>
                <Typography sx={{ pb: 1, fontWeight: "bold" }}>
                  Document Name :
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  id="outlined-required"
                  label="Document Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled
                />
              </Grid>
              <Grid item lg={8} xs={8} textAlign="right">
                <Button variant="contained" onClick={onSubmitHandler}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth={false} sx={{ mt: 3, mb: 5 }}>
            {load && (
              <FormBuilder
                form={myform}
                onChange={(schema) => {
                  console.log(JSON.stringify(schema));
                  schemaRef.current = schema;
                }}
              />
            )}
          </Container>
        </Grid>
      </Generator>
    </>
  );
};

export default EditTemplateSectionDocument;
