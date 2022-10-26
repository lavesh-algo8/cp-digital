import { Grid, TextField, Button, Container, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Layout from "../../../components/superadmin/Layout";

import { FormBuilder } from "@formio/react";
import "formiojs/dist/formio.builder.min.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const GenerateNewDocument = (props) => {
  const { name } = useParams();

  const [title, setTitle] = useState(name);
  const schemaRef = useRef();

  const onSubmitHandler = async () => {
    if (title === "") {
      alert("Please Enter Form Title");
      return;
    }
    console.log(schemaRef);
    const formData = { ...schemaRef.current, title };
    console.log(formData);
    try {
      const res = await axios.post(
        "https://cp-digital-backend.herokuapp.com/docgen/savedocument",
        formData
      );
      console.log(res);
      if (res) {
        alert("document submitted succesfully");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
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
                Document Generator
              </Typography>
            </Container>
            <Container maxWidth={false}>
              <Grid container>
                <Grid item lg={4} xs={4}>
                  <Typography sx={{ pb: 1, fontWeight: "bold" }}>
                    Document Title :
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    required
                    id="outlined-required"
                    label="Enter Document Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
        </Grid>
      </Layout>
    </>
  );
};

export default GenerateNewDocument;
