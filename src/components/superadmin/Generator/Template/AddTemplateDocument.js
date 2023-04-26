import { Grid, TextField, Button, Container, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Layout from "../../../../components/superadmin/Layout";

import { FormBuilder } from "@formio/react";
import "formiojs/dist/formio.builder.min.css";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Generator from "../../../../pages/superadmin/Generator/Generator";
import { addDocumentTemplate } from "../../../../redux/superAdminReducer/superAdminAction";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const AddTemplateDocument = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState("");
  const schemaRef = useRef();

  const onSubmitHandler = async () => {
    if (title === "") {
      alert("Please Enter Form Title");
      return;
    }
    console.log(schemaRef);
    const formData = { ...schemaRef.current, title };
    console.log(formData);
    console.log(params);
    const finalData = {
      formData: formData,
    };
    console.log(finalData);
    const success = await dispatch(
      addDocumentTemplate(formData, params.templateId)
    );
    console.log(success);
    if (success) {
      navigate(-1);
    }
  };

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
              Generate Template Document
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
                  //   disabled
                />
              </Grid>
              <Grid item lg={8} xs={8} textAlign="right">
                <Button variant="contained" onClick={onSubmitHandler}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth={false} sx={{ mt: 3, mb: 5 }}>
            <FormBuilder
              form={{ display: "form" }}
              onChange={(schema) => {
                console.log(JSON.stringify(schema));
                schemaRef.current = schema;
              }}
            />
          </Container>
        </Grid>
      </Generator>
    </>
  );
};

export default AddTemplateDocument;
