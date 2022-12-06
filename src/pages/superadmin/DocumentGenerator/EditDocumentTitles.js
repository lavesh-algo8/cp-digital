import { Grid, TextField, Button, Container, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Layout from "../../../components/superadmin/Layout";

import { FormBuilder } from "@formio/react";
import "formiojs/dist/formio.builder.min.css";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProcedureDocument,
  editSubheadingDocument,
} from "../../../redux/superAdminReducer/superAdminAction";

const EditDocumentTitles = () => {
  const { subheadingId } = useParams();
  const { selectedSubHeadingDocument } = useSelector(
    (state) => state.SuperAdmin
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(selectedSubHeadingDocument.formData.title);
  const [myform, setmyform] = useState(selectedSubHeadingDocument.formData);
  const schemaRef = useRef();

  const onSubmitHandler = async () => {
    if (title === "") {
      alert("Please Enter Form Title");
      return;
    }
    console.log(schemaRef);
    const formData = { ...schemaRef.current, title };
    console.log(formData);
    const success = await dispatch(
      editSubheadingDocument(formData, subheadingId)
    );
    if (success) {
      navigate(-1);
    }
  };

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
            borderRadius: "4px",
            height: "87vh",
            overflowY: "scroll",
            pr: 4,
            pl: 6,
            pb: 4,
          }}
        >
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
            <Container
              sx={{ mb: 3, display: "flex", justifyContent: "center" }}
            >
              <Typography variant="h5" fontWeight="bold">
                Edit Section Document
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
              <FormBuilder
                form={myform}
                onChange={(schema) => {
                  console.log(JSON.stringify(schema));
                  schemaRef.current = schema;
                }}
              />
            </Container>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default EditDocumentTitles;