import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, ContentState } from "draft-js";

import { useDispatch, useSelector } from "react-redux";
import {
  editRule,
  getDataTree,
} from "../../../../../redux/superAdminReducer/superAdminAction";
import { CKEditor } from "ckeditor4-react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const EditRuleDialog = (props) => {
  const ruleId = props.rulesDetails._id;
  const copyData = props?.rulesDetails;

  const { dataTree } = useSelector((state) => state?.SuperAdmin);

  console.log(props);

  console.log(props.rulesDetails);

  console.log(copyData);
  const checkedData = [
    ...copyData?.law,
    ...copyData?.act,
    ...copyData?.chapter,
    ...copyData?.section,
    ...copyData?.subsection,
  ];

  function dfs(o, target) {
    if (o.value === target) return [target];
    if (!o.children) return false;
    let path;
    o.children.find((x) => (path = dfs(x, target)));
    if (path) {
      return [o.value].concat(path);
    }
  }
  let path;
  // dataTree.find((x) => (path = dfs(x, "63995983506bac3aee929016")));
  // console.log(path);

  const expandedDataArr = [];
  checkedData.map((value) => {
    dataTree.find((x) => (path = dfs(x, value)));
    if (path?.length > 0) {
      expandedDataArr.push(...path);
    }
  });
  console.log(expandedDataArr);

  const dispatch = useDispatch();

  const [rule, setrule] = useState(props?.rulesDetails?.rule_name);
  const [value, setValue] = useState(props?.rulesDetails?.rule_details);

  // tree data implemented
  const [checked, setchecked] = useState(checkedData);
  const [expanded, setexpanded] = useState(expandedDataArr);
  const onCheck = (checked) => {
    console.log(checked);

    setchecked(checked);
  };

  const onExpand = (expanded) => {
    setexpanded(expanded);
  };

  const handleDialogClose = () => {
    props.setOpenDialog(false); // Use the prop.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hey");
    const data = {
      rule_name: rule,
      rule_details: value,
      mapTo: checked,
    };
    console.log(data);
    await dispatch(editRule(data, ruleId));
    props.setOpenDialog(false);
    setrule("");
  };

  useEffect(() => {
    if (props) {
      setrule(props.rulesDetails.rule_name);
      if (props?.subruleDetails?.rule_details) {
        setValue(props.rulesDetails.rule_details);
      }
    }
  }, [copyData]);

  useEffect(() => {
    dispatch(getDataTree());
  }, []);

  return (
    <>
      {/* add admins dialog */}
      <Dialog
        open={props.openDialog} // Use value directly here
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: { borderRadius: 10 },
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle fontWeight={600}>Edit Rule </DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography>Name of the Rule</Typography>
                <OutlinedInput
                  multiline
                  rows={3}
                  id="outlined-adornment-weight"
                  value={rule}
                  onChange={(e) => setrule(e.target.value)}
                  aria-describedby="outlined-weight-helper-text"
                  fullWidth
                  required
                  size="small"
                  notched={false}
                  label="Law"
                  sx={{
                    mt: 1,
                  }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography sx={{ mb: 2 }}>Rule Contents</Typography>

                <CKEditor
                  config={{
                    // readOnly: true,
                    allowedContent: true,
                    // forceEnterMode: true,
                    enterMode: "p",
                    extraPlugins: ["amendments"],
                    height: "210px",
                    resize_enabled: false,
                    removeButtons: false,
                  }}
                  initData={value}
                  onInstanceReady={() => {
                    //   alert("Editor is ready!");
                  }}
                  onChange={(e) => {
                    setValue(e.editor.getData());
                    console.log(e.editor.getData());
                  }}
                  onBeforeLoad={(CKEDITOR) => {
                    if (!CKEDITOR.plugins.registered["timestamp"]) {
                      CKEDITOR.plugins.add("timestamp", {
                        init: function (editor) {
                          editor.addCommand("insertTimestamp", {
                            exec: function (editor) {
                              var now = new Date();
                              alert("yo");
                              editor.insertHtml(
                                "The current date and time is: <em>" +
                                  now.toString() +
                                  "</em>"
                              );
                            },
                          });
                          editor.ui.addButton("Timestamp", {
                            label: "Insert Timestamp",
                            command: "insertTimestamp",
                            toolbar: "insert",
                            icon: "https://cdn4.iconfinder.com/data/icons/24x24-free-pixel-icons/24/Clock.png",
                          });
                        },
                      });
                    }

                    if (!CKEDITOR.plugins.registered["amendments"]) {
                      CKEDITOR.plugins.add("amendments", {
                        init: function (editor) {
                          editor.addCommand("addAmendments", {
                            exec: function (editor) {
                              if (editor.getSelection().getSelectedText()) {
                                // alert(editor.getSelection().getSelectedText());
                                // handleClickOpen();
                                const amentmentText = window.prompt(
                                  "Type Amendment text here...",
                                  ""
                                );
                                // amentmentText + editor.getSelection().getSelectedText()
                                editor.insertHtml(
                                  // "<p>This is a new paragraph.</p>"
                                  " <span class=tooltip>" +
                                    amentmentText +
                                    " <span class=tooltiptext>" +
                                    editor.getSelection().getSelectedText() +
                                    "</span> </span>"
                                );
                              }
                            },
                          });
                          editor.ui.addButton("Amendments", {
                            label: "Add Amendments",
                            command: "addAmendments",
                            toolbar: "insert",
                            icon: "https://cdn-icons-png.flaticon.com/512/6846/6846310.png",
                          });
                        },
                      });
                    }
                  }}
                />
              </Box>

              <FormControl
                sx={{
                  mt: 3,
                  borderRadius: "6px",
                  ".dropdown": {
                    width: "100%",
                    ".dropdown-trigger ": {
                      width: "100%",
                      borderRadius: "4px",
                      ".tag-list .tag-item": {
                        width: "93%",
                      },
                    },
                  },

                  ".dropdown-content": {
                    maxHeight: "420px",
                    overflowY: "auto",
                    minWidth: "100%",
                  },
                }}
              >
                <Typography sx={{ mb: 1 }}>Map To</Typography>
                {dataTree && (
                  <CheckboxTree
                    // disabled
                    showExpandAll
                    noCascade
                    nodes={dataTree}
                    checkModel="all"
                    checked={checked}
                    expanded={expanded}
                    iconsClass="fa5"
                    onCheck={onCheck}
                    onExpand={onExpand}
                  />
                )}
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                mt: 2,
                mb: 2,
                justifyContent: "center",
              }}
            >
              <Button
                size="large"
                color="greycol"
                variant="contained"
                sx={{
                  mt: 3,
                  px: 5,
                  textTransform: "none",
                }}
                onClick={handleDialogClose}
              >
                Cancel
              </Button>
              <Button
                size="large"
                color="primary"
                variant="contained"
                type="submit"
                sx={{
                  mt: 3,
                  px: 5,
                  ml: 4,
                  color: "white",
                  textTransform: "none",
                }}
              >
                Update
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditRuleDialog;
