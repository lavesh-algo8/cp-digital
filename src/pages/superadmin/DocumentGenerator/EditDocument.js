import { Grid, TextField, Button, Container, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Layout from "../../../components/superadmin/Layout";

import { FormBuilder } from "@formio/react";
import "formiojs/dist/formio.builder.min.css";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveDocument } from "../../../redux/superAdminReducer/superAdminAction";

const EditDocument = (props) => {
  const { procedure, heading, sectiontitle } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(sectiontitle);
  const [myform, setmyform] = useState({
    display: "form",
    components: [
      {
        label: "Company Name",
        labelPosition: "top",
        placeholder: "",
        description: "",
        tooltip: "",
        prefix: "",
        suffix: "",
        widget: {
          type: "input",
        },
        inputMask: "",
        displayMask: "",
        allowMultipleMasks: false,
        customClass: "",
        tabindex: "",
        autocomplete: "",
        hidden: false,
        hideLabel: false,
        showWordCount: false,
        showCharCount: false,
        mask: false,
        autofocus: false,
        spellcheck: true,
        disabled: false,
        tableView: true,
        modalEdit: false,
        multiple: false,
        persistent: true,
        inputFormat: "plain",
        protected: false,
        dbIndex: false,
        case: "",
        truncateMultipleSpaces: false,
        encrypted: false,
        redrawOn: "",
        clearOnHide: true,
        customDefaultValue: "",
        calculateValue: "",
        calculateServer: false,
        allowCalculateOverride: false,
        validateOn: "change",
        validate: {
          required: false,
          pattern: "",
          customMessage: "",
          custom: "",
          customPrivate: false,
          json: "",
          minLength: "",
          maxLength: "",
          strictDateValidation: false,
          multiple: false,
          unique: false,
        },
        unique: false,
        errorLabel: "",
        errors: "",
        key: "companyName",
        tags: [],
        properties: {},
        conditional: {
          show: null,
          when: null,
          eq: "",
          json: "",
        },
        customConditional: "",
        logic: [],
        attributes: {},
        overlay: {
          style: "",
          page: "",
          left: "",
          top: "",
          width: "",
          height: "",
        },
        type: "textfield",
        input: true,
        refreshOn: "",
        dataGridLabel: false,
        addons: [],
        inputType: "text",
        id: "ecw2neg",
        defaultValue: "",
      },
      {
        label: "Serial No",
        labelPosition: "top",
        placeholder: "",
        description: "",
        tooltip: "",
        prefix: "",
        suffix: "",
        widget: {
          type: "input",
        },
        inputMask: "",
        displayMask: "",
        allowMultipleMasks: false,
        customClass: "",
        tabindex: "",
        autocomplete: "",
        hidden: false,
        hideLabel: false,
        showWordCount: false,
        showCharCount: false,
        mask: false,
        autofocus: false,
        spellcheck: true,
        disabled: false,
        tableView: true,
        modalEdit: false,
        multiple: false,
        persistent: true,
        inputFormat: "plain",
        protected: false,
        dbIndex: false,
        case: "",
        truncateMultipleSpaces: false,
        encrypted: false,
        redrawOn: "",
        clearOnHide: true,
        customDefaultValue: "",
        calculateValue: "",
        calculateServer: false,
        allowCalculateOverride: false,
        validateOn: "change",
        validate: {
          required: false,
          pattern: "",
          customMessage: "",
          custom: "",
          customPrivate: false,
          json: "",
          minLength: "",
          maxLength: "",
          strictDateValidation: false,
          multiple: false,
          unique: false,
        },
        unique: false,
        errorLabel: "",
        errors: "",
        key: "serialNo",
        tags: [],
        properties: {},
        conditional: {
          show: null,
          when: null,
          eq: "",
          json: "",
        },
        customConditional: "",
        logic: [],
        attributes: {},
        overlay: {
          style: "",
          page: "",
          left: "",
          top: "",
          width: "",
          height: "",
        },
        type: "textfield",
        input: true,
        refreshOn: "",
        dataGridLabel: false,
        addons: [],
        inputType: "text",
        id: "e85jm5",
        defaultValue: "",
      },
      {
        label: "Date Of Incorporation",
        labelPosition: "top",
        placeholder: "",
        description: "",
        tooltip: "",
        prefix: "",
        suffix: "",
        widget: {
          type: "input",
        },
        inputMask: "",
        displayMask: "",
        allowMultipleMasks: false,
        customClass: "",
        tabindex: "",
        autocomplete: "",
        hidden: false,
        hideLabel: false,
        showWordCount: false,
        showCharCount: false,
        mask: false,
        autofocus: false,
        spellcheck: true,
        disabled: false,
        tableView: true,
        modalEdit: false,
        multiple: false,
        persistent: true,
        inputFormat: "plain",
        protected: false,
        dbIndex: false,
        case: "",
        truncateMultipleSpaces: false,
        encrypted: false,
        redrawOn: "",
        clearOnHide: true,
        customDefaultValue: "",
        calculateValue: "",
        calculateServer: false,
        allowCalculateOverride: false,
        validateOn: "change",
        validate: {
          required: false,
          pattern: "",
          customMessage: "",
          custom: "",
          customPrivate: false,
          json: "",
          minLength: "",
          maxLength: "",
          strictDateValidation: false,
          multiple: false,
          unique: false,
        },
        unique: false,
        errorLabel: "",
        errors: "",
        key: "date_of_incorporation",
        tags: [],
        properties: {},
        conditional: {
          show: null,
          when: null,
          eq: "",
          json: "",
        },
        customConditional: "",
        logic: [],
        attributes: {},
        overlay: {
          style: "",
          page: "",
          left: "",
          top: "",
          width: "",
          height: "",
        },
        type: "textfield",
        input: true,
        refreshOn: "",
        dataGridLabel: false,
        addons: [],
        inputType: "text",
        id: "ecgybq",
        defaultValue: "",
      },
      {
        label: "The Registered Address of the company",
        labelPosition: "top",
        placeholder: "",
        description: "",
        tooltip: "",
        prefix: "",
        suffix: "",
        widget: {
          type: "input",
        },
        inputMask: "",
        displayMask: "",
        allowMultipleMasks: false,
        customClass: "",
        tabindex: "",
        autocomplete: "",
        hidden: false,
        hideLabel: false,
        showWordCount: false,
        showCharCount: false,
        mask: false,
        autofocus: false,
        spellcheck: true,
        disabled: false,
        tableView: true,
        modalEdit: false,
        multiple: false,
        persistent: true,
        inputFormat: "plain",
        protected: false,
        dbIndex: false,
        case: "",
        truncateMultipleSpaces: false,
        encrypted: false,
        redrawOn: "",
        clearOnHide: true,
        customDefaultValue: "",
        calculateValue: "",
        calculateServer: false,
        allowCalculateOverride: false,
        validateOn: "change",
        validate: {
          required: false,
          pattern: "",
          customMessage: "",
          custom: "",
          customPrivate: false,
          json: "",
          minLength: "",
          maxLength: "",
          strictDateValidation: false,
          multiple: false,
          unique: false,
        },
        unique: false,
        errorLabel: "",
        errors: "",
        key: "registered_address",
        tags: [],
        properties: {},
        conditional: {
          show: null,
          when: null,
          eq: "",
          json: "",
        },
        customConditional: "",
        logic: [],
        attributes: {},
        overlay: {
          style: "",
          page: "",
          left: "",
          top: "",
          width: "",
          height: "",
        },
        type: "textfield",
        input: true,
        refreshOn: "",
        dataGridLabel: false,
        addons: [],
        inputType: "text",
        id: "erwcc1c",
        defaultValue: null,
      },
      {
        type: "button",
        label: "Submit",
        key: "submit",
        size: "md",
        block: false,
        action: "submit",
        disableOnInvalid: true,
        theme: "primary",
        input: true,
        placeholder: "",
        prefix: "",
        customClass: "",
        suffix: "",
        multiple: false,
        defaultValue: null,
        protected: false,
        unique: false,
        persistent: false,
        hidden: false,
        clearOnHide: true,
        refreshOn: "",
        redrawOn: "",
        tableView: false,
        modalEdit: false,
        dataGridLabel: true,
        labelPosition: "top",
        description: "",
        errorLabel: "",
        tooltip: "",
        hideLabel: false,
        tabindex: "",
        disabled: false,
        autofocus: false,
        dbIndex: false,
        customDefaultValue: "",
        calculateValue: "",
        calculateServer: false,
        widget: {
          type: "input",
        },
        attributes: {},
        validateOn: "change",
        validate: {
          required: false,
          custom: "",
          customPrivate: false,
          strictDateValidation: false,
          multiple: false,
          unique: false,
        },
        conditional: {
          show: null,
          when: null,
          eq: "",
        },
        overlay: {
          style: "",
          left: "",
          top: "",
          width: "",
          height: "",
        },
        allowCalculateOverride: false,
        encrypted: false,
        showCharCount: false,
        showWordCount: false,
        properties: {},
        allowMultipleMasks: false,
        addons: [],
        leftIcon: "",
        rightIcon: "",
        id: "e5eh0hy",
      },
    ],
    title: "title1",
  });
  const schemaRef = useRef();

  const onSubmitHandler = async () => {
    if (title === "") {
      alert("Please Enter Form Title");
      return;
    }
    console.log(schemaRef);
    const formData = { ...schemaRef.current, title };
    console.log(formData);
    const success = dispatch(
      saveDocument(formData, procedure, heading, sectiontitle)
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
                Document Generator
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
                    Save
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

export default EditDocument;
