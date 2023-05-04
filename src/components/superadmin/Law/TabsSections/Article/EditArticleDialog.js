import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useDispatch, useSelector } from "react-redux";
import {
  editArticle,
  editSubArticle,
  editSubCircular,
  fetchActByCategory,
  fetchAllCategory,
  fetchAllChapters,
  fetchChapters,
  fetchSectionsByChapterId,
  fetchSubSectionsBySectionId,
  getDataTree,
} from "../../../../../redux/superAdminReducer/superAdminAction";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { CKEditor } from "ckeditor4-react";
import DropdownTreeSelect from "react-dropdown-tree-select";

import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import parse from "html-react-parser";
// import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from "@mui/icons-material/Add";
import { convert } from "html-to-text";
import { all } from "mathjs";
const diff = require("diff");

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const EditArticleDialog = (props) => {
  const [descriptionVersion, setdescriptionVersion] = useState([]);
  const [expandedhistory, setExpandedHistory] = React.useState(true);
  const [expandedhistoryversion, setExpandedHistoryVersion] =
    React.useState("");

  const editorRef = useRef();

  const [markedWords, setMarkedWords] = useState([]);

  const extractMarkedWords = (html) => {
    const parser = new DOMParser();
    console.log(html);
    const doc = parser.parseFromString(html, "text/html");
    const elements = doc.querySelectorAll(".marker"); // replace with the class name you used to mark the words
    let markedWords = [];
    for (let i = 0; i < elements.length; i++) {
      // markedWords += elements[i].textContent + " ";
      markedWords.push(elements[i].textContent);
    }
    setMarkedWords(markedWords);
    console.log(markedWords);
  };

  const handleKeyDown = (event) => {
    console.log(event);
    console.log(editorRef);
    const editor = editorRef.current.editor;
    const keyCode = event.data.keyCode;

    if (keyCode === 219) {
      editor.insertHtml("<span style='color: #983301;'>");
    }

    if (keyCode === 221) {
      editor.insertHtml("<span style='color: #000000;'>");
    }

    if (keyCode === 2228240) {
      editor.insertHtml("<span style='color: #27e55c;'>");
    }

    if (keyCode === 2228445) {
      editor.insertHtml("<span style='color: #000000;'>");
    }
  };

  const handleExpandClick = () => {
    setExpandedHistory(!expandedhistory);
  };

  const handleExpandVersionClick = () => {
    setExpandedHistoryVersion(!expandedhistoryversion);
  };

  const handleClick = (index) => {
    setExpandedHistoryVersion((prev) => (prev === index ? "" : index));
  };

  const [file, setFile] = useState(undefined);

  const {
    dataTree,
    categoryAllList,
    actsByCategoryList,
    chapterList,
    subsectionsList,
    allChapterList,
    sectionsbychapterList,
  } = useSelector((state) => state?.SuperAdmin);

  const copyData = props?.articleDetails;

  console.log(copyData);
  const checkedData = [
    ...copyData.law,
    ...copyData.act,
    ...copyData.chapter,
    ...copyData.section,
    ...copyData.subsection,
  ];
  console.log(checkedData);

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
  // dataTree.find((x) => (path = dfs(x, checkedData[0])));
  // console.log(path);
  console.log(dataTree);

  function checkrootNode(o, target) {
    if (o.value === target) return [target];
    if (!o.children) return false;
    let rootpath;
    o.children.find((x) => (rootpath = checkrootNode(x, target)));
    if (rootpath) {
      return [o.label].concat(rootpath);
    }
  }
  let rootpath;
  dataTree.find(
    (x) =>
      (rootpath = checkrootNode(
        x,
        copyData?.subsection[0] || copyData?.section[0]
      ))
  );
  console.log(rootpath);

  const expandedDataArr = [];
  checkedData.map((value) => {
    dataTree.find((x) => (path = dfs(x, value)));
    if (path?.length > 0) {
      expandedDataArr.push(...path);
    }
  });
  console.log(expandedDataArr);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  const [articleName, setarticleName] = useState("");
  const [ArticleWrittenBy, setArticleWrittenBy] = useState("");
  const [dateOfArticle, setdateOfArticle] = useState(new Date());
  const [value, setValue] = useState("");
  const [subsectionName, setsubsectionName] = React.useState([]);
  const [sectionName, setsectionName] = React.useState([]);
  const [chapterName, setchapterName] = React.useState([]);
  const [actName, setactName] = React.useState([]);
  const [lawName, setlawName] = React.useState([]);
  const [treeData, settreeData] = useState([]);

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

  const dispatch = useDispatch();

  const versionhistory = (item) => {
    return (
      <Box sx={{ border: "1px solid black", p: 1 }}>
        <Typography variant="body2">{parse(item)}</Typography>
      </Box>
    );
  };

  const DropDownTreeSelect = useMemo(() => {
    return (
      <DropdownTreeSelect
        data={dataTree}
        onChange={(currentNode, selectedNodes) => {
          console.log("onChange::", currentNode, selectedNodes);
          let arr = [];
          selectedNodes.map((node) => arr.push(node.label));
          console.log(arr);
          settreeData(arr);
        }}
        // className="bootstrap-demo"
        // showDropdown="always"
        // texts={{ placeholder: "Search" }}
        // showPartiallySelected="true"
      />
    );
  }, [dataTree]);

  const handleSubSectionSelectionChange = (event) => {
    console.log(event);
    const {
      target: { value },
    } = event;
    setsubsectionName(value);
  };

  const handleSectionSelectionChange = async (event, key) => {
    console.log(event);
    let itemKey;
    if (key.key) {
      setsubsectionName("");
      itemKey = key.key.slice(2); //Removes the .$ from the key.
      console.log(itemKey);
    } else {
      itemKey = key;
    }
    await dispatch(fetchSubSectionsBySectionId(itemKey));
    if (key.key) {
      const {
        target: { value },
      } = event;
      setsectionName(typeof value === "string" ? value.split(",") : value);
    } else {
    }
  };

  const handleChapterSelectionChange = async (event, key) => {
    // event.preventDefault();
    console.log(event);
    let itemKey;
    if (key.key) {
      setsectionName("");
      itemKey = key.key.slice(2); //Removes the .$ from the key.
      console.log(itemKey);
    } else {
      itemKey = key;
    }
    await dispatch(fetchSectionsByChapterId(itemKey));
    if (key.key) {
      const {
        target: { value },
      } = event;
      setchapterName(
        // On autofill we get a the stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    } else {
    }
  };

  const handleActSelectionChange = async (event, key) => {
    console.log(event);
    let itemKey;
    if (key.key) {
      setchapterName("");
      itemKey = key.key.slice(2); //Removes the .$ from the key.
      console.log(itemKey);
    } else {
      itemKey = key;
    }
    await dispatch(fetchChapters(itemKey));
    if (key.key) {
      const {
        target: { value },
      } = event;
      setactName(
        // On autofill we get a the stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  const handleLawSelectionChange = async (event, key) => {
    console.log(event);
    let itemKey;
    if (key.key) {
      setactName("");
      itemKey = key.key.slice(2); //Removes the .$ from the key.
      console.log(itemKey);
    } else {
      itemKey = key;
    }
    await dispatch(fetchActByCategory(itemKey));
    if (key.key) {
      const {
        target: { value },
      } = event;
      setlawName(
        // On autofill we get a the stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hey");
    // const articlesDetails = draftToHtml(
    //   convertToRaw(value.getCurrentContent())
    // );
    const checkedDescriptionversionData = descriptionVersion.reduce(
      (values, value) => {
        console.log(value);
        if (value) values.push({ id: value._id, publish: value.checked });
        return values;
      },
      []
    );
    console.log(checkedDescriptionversionData);

    const articlesDetails = value;
    const data = {
      sub_title: articleName,
      date: dateOfArticle,
      description: articlesDetails,
      written_by: ArticleWrittenBy,
      mapTo: checked,
      isChecked: checkedDescriptionversionData,
      // law: lawName.toString(),
      // act: actName.toString(),
      // chapter: chapterName.toString(),
      // section: sectionName.toString(),
      // sub_section_no: parseFloat(subsectionName.toString()),
    };
    console.log(data);
    await dispatch(editArticle(data, props?.articleDetails._id));
    setarticleName("");
    setdateOfArticle("");
    setsubsectionName([]);
    setsectionName([]);
    setchapterName([]);
    setValue("");
    props.setOpenDialog(false);
    await dispatch({
      type: "REMOVE_SUBSECTIONSBYSECTIONID",
      payload: [],
    });
    await dispatch({
      type: "REMOVE_SECTIONSBYSECTIONID",
      payload: [],
    });
  };

  const htmlToDraftBlocks = (html) => {
    if (!html) {
      return;
    }
    const blocksFromHtml = htmlToDraft(html);
    // console.log(blocksFromHtml);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    console.log(editorState);

    return editorState;

    // return blocksFromHtml;
  };

  useEffect(() => {
    dispatch(fetchAllCategory());
    dispatch(getDataTree());
  }, []);

  useEffect(() => {
    if (props) {
      // setdescriptionVersion(props?.articleDetails?.history.slice().reverse());
      setdescriptionVersion(props?.articleDetails?.history.slice().reverse());
      setarticleName(props.articleDetails.title);
      setArticleWrittenBy(props.articleDetails.written_by);
      setdateOfArticle(props.articleDetails.date);
      setsubsectionName([props?.articleDetails?.subsection?.sub_regulation_no]);
      if (props.articleDetails?.section?.section_name != null) {
        setsectionName([props?.articleDetails?.section?.section_name]);
        handleSectionSelectionChange(12, props?.articleDetails?.section?._id);
      }
      if (props.articleDetails?.chapter?.chapter != null) {
        setchapterName([props?.articleDetails?.chapter?.chapter]);
        handleChapterSelectionChange(23, props?.articleDetails?.chapter?._id);
      }
      if (props?.articleDetails) {
        // setValue(htmlToDraftBlocks(props.articleDetails.description));
        setValue(props.articleDetails.description);
      }
      if (props.articleDetails?.act?.act != null) {
        setactName([props?.articleDetails?.act?.act]);
        handleChapterSelectionChange(23, props?.articleDetails?.act?._id);
      }
      if (props.articleDetails?.law?.category != null) {
        setlawName([props?.articleDetails?.law?.category]);
        handleChapterSelectionChange(23, props?.articleDetails?.law?._id);
      }
    }
  }, [copyData]);

  const onCheckedHandler = (index) => {
    setdescriptionVersion((prev) => [
      ...prev?.map(({ checked, ...rest }, idx) =>
        idx === index ? { ...rest, checked: !checked } : { ...rest, checked }
      ),
    ]);
    console.log(descriptionVersion);
  };

  const checkRootNodeLabel = (node) => {
    console.log(node);
    if (!node) {
      return " ";
    } else {
      return node[1];
    }
  };

  const lineCheck = (ch, re) => {
    var a = ch.join("😁");
    var b = re.join("😁");

    const string1 = convert(b, {
      wordwrap: 130,
    });
    const string2 = convert(a, {
      wordwrap: 130,
    });
    let allchange = "";
    var changes = diff.diffWordsWithSpace(string1, string2);
    console.log(changes);
    changes.forEach(function (part) {
      let value = part.value;
      let added = part.added;
      let removed = part.removed;
      var color = part.added ? "green" : part.removed ? "red" : "grey";
      console.log(part.value[color]);
      console.log(part.value);
      if (added) {
        console.log(value);
        allchange = allchange.concat(` <ins>${value}</ins`);
      } else if (removed) {
        console.log(value);
        allchange = allchange.concat(` <del>${value}</del>`);
      } else {
        console.log(value);
        allchange = allchange.concat(` ${value}`);
      }
    });
    console.log(allchange);
    const myArray = allchange.split("😁");
    return myArray;
  };

  const CheckStringChanges = (item, descversn, index) => {
    if (!descversn[index + 1]?.description) {
      return;
    }
    let changed = [];
    let removed = [];
    let difference = diff.diffLines(
      descversn[index + 1]?.description,
      item?.description
    );
    console.log(difference);
    let final = [];
    difference.forEach(function (part) {
      let value = part.value;
      let added = part.added;
      let removeds = part.removed;

      if (added) {
        final.push(`+ ${value}`);
        console.log(`+ ${value}`);
        changed.push(value);
      } else if (removeds) {
        final.push(`- ${value}`);
        console.log(`- ${value}`);
        removed.push(value);
      } else {
        final.push(` ${value}`);
        console.log(`  ${value}`);
      }
    });

    let change = "";
    let remove = "";
    const string1 = convert(descversn[index + 1]?.description, {
      wordwrap: 130,
    });
    const string2 = convert(item?.description, {
      wordwrap: 130,
    });
    let diffs = diff.diffWords(string1, string2);
    console.log(diffs);
    let changes = [];
    diffs.forEach(function (part) {
      let value = part.value;
      let added = part.added;
      let removed = part.removed;

      if (added) {
        changes.push(`+ ${value}`);
        console.log(`+ ${value}`);
        change = change.concat(" " + value);
      } else if (removed) {
        changes.push(`- ${value}`);
        console.log(`- ${value}`);
        remove = remove.concat(" " + value);
      } else {
        // changes.push(` ${value}`);
        console.log(`  ${value}`);
      }
    });
    console.log(changes);
    return (
      <Box sx={{ background: "#f2f2f2", p: 2, borderRadius: "8px" }}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {articleName}{" "}
          {changed.map((change) => {
            return convert(change).slice(0, 3) + " ";
          })}{" "}
          of the {checkRootNodeLabel(rootpath)} Dated :{" "}
          {`${("0" + new Date(item?.date)?.getDate()).slice(-2)}-${(
            "0" +
            (new Date(item?.date)?.getMonth() + 1)
          ).slice(-2)}-${new Date(item?.date)
            ?.getFullYear()
            .toString()
            .slice(-2)}`}{" "}
          w.e.f{" "}
          {`${("0" + new Date(item?.date)?.getDate()).slice(-2)}-${(
            "0" +
            (new Date(item?.date)?.getMonth() + 1)
          ).slice(-2)}-${new Date(item?.date)
            ?.getFullYear()
            .toString()
            .slice(-2)}`}{" "}
          changes are :
        </Typography>
        <Typography>
          {/* {changes.map((change) => (
            <Typography>{change}</Typography>
          ))} */}
          {lineCheck(changed, removed).map((line) => (
            <Typography>{parse(line)}</Typography>
          ))}
        </Typography>
        {/* <Typography variant="body2" color="error">
          {" "}
          - {parse(remove)}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, ml: 10 }}>
          {" "}
          <ArrowDownwardIcon />
        </Typography>
        <Typography variant="body2" color="green">
          {" "}
          + {parse(change)}
        </Typography> */}
      </Box>
    );
  };

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
        maxWidth="lg"
        disableEnforceFocus
      >
        <DialogTitle fontWeight={600}>Edit Article </DialogTitle>
        <Box position="absolute" top={5} right={10}>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item lg={5} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography>Name of the Article</Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={articleName}
                    onChange={(e) => setarticleName(e.target.value)}
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

                  <Typography sx={{ mt: 2 }}>Date of Article</Typography>
                  <DesktopDatePicker
                    inputFormat="dd/MM/yyyy"
                    value={dateOfArticle}
                    onChange={(date) => setdateOfArticle(date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        variant="outlined"
                        required
                        sx={{
                          mt: 1,
                          "& legend": { display: "none" },
                          "& fieldset": { top: 0 },
                        }}
                      />
                    )}
                  />

                  <Typography sx={{ mt: 2 }}>Written By</Typography>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={ArticleWrittenBy}
                    onChange={(e) => setArticleWrittenBy(e.target.value)}
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

                  {/* <FormControl
                    className={{
                      minWidth: 300,
                    }}
                    sx={{ mt: 2 }}
                  >
                    <Typography htmlFor="age-native-simple">
                      Map Law (optional)
                    </Typography>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      // multiple
                      value={lawName}
                      name="first"
                      onChange={handleLawSelectionChange}
                      input={
                        <OutlinedInput
                          sx={{ mt: 1 }}
                          notched={false}
                          label="Tag"
                          size="small"
                        />
                      }
                      renderValue={(selected) =>
                        selected
                          .map(
                            (obj) =>
                              // console.log(obj);
                              obj
                          )
                          .join(", ")
                      }
                    >
                      {categoryAllList?.map((category) => (
                        <MenuItem key={category._id} value={category?.category}>
                          <Checkbox
                            checked={lawName.indexOf(category?.category) > -1}
                          />
                          <ListItemText primary={category?.category} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    className={{
                      minWidth: 300,
                    }}
                    sx={{ mt: 2 }}
                  >
                    <Typography htmlFor="age-native-simple">
                      Map Act (optional)
                    </Typography>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      // multiple
                      value={actName}
                      name="first"
                      onChange={handleActSelectionChange}
                      input={
                        <OutlinedInput
                          sx={{ mt: 1 }}
                          notched={false}
                          label="Tag"
                          size="small"
                        />
                      }
                      renderValue={(selected) =>
                        selected
                          .map(
                            (obj) =>
                              // console.log(obj);
                              obj
                          )
                          .join(", ")
                      }
                    >
                      {actsByCategoryList?.map((act) => (
                        <MenuItem key={act._id} value={act?.act}>
                          <Checkbox checked={actName.indexOf(act?.act) > -1} />
                          <ListItemText primary={act?.act} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    className={{
                      minWidth: 300,
                    }}
                    sx={{ mt: 2 }}
                  >
                    <Typography htmlFor="age-native-simple">
                      Map chapter
                    </Typography>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      // multiple
                      value={chapterName}
                      name="first"
                      onChange={handleChapterSelectionChange}
                      input={
                        <OutlinedInput
                          sx={{ mt: 1 }}
                          notched={false}
                          label="Tag"
                          size="small"
                        />
                      }
                      renderValue={(selected) =>
                        selected
                          .map(
                            (obj) =>
                              // console.log(obj);
                              obj
                          )
                          .join(", ")
                      }
                    >
                      {chapterList?.map((chapter) => (
                        <MenuItem key={chapter._id} value={chapter?.chapter}>
                          <Checkbox
                            checked={chapterName.indexOf(chapter?.chapter) > -1}
                          />
                          <ListItemText primary={chapter?.chapter} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    className={{
                      minWidth: 300,
                    }}
                    sx={{ mt: 2 }}
                  >
                    <Typography htmlFor="age-native-simple">
                      Map section (optional)
                    </Typography>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      // multiple
                      value={sectionName}
                      name="first"
                      onChange={handleSectionSelectionChange}
                      input={
                        <OutlinedInput
                          sx={{ mt: 1 }}
                          notched={false}
                          label="Tag"
                          size="small"
                        />
                      }
                      renderValue={(selected) =>
                        selected
                          .map(
                            (obj) =>
                              // console.log(obj);
                              obj
                          )
                          .join(", ")
                      }
                    >
                      {sectionsbychapterList?.map((section) => (
                        <MenuItem
                          key={section.section._id}
                          value={section?.section.section_name}
                        >
                          <Checkbox
                            checked={
                              sectionName.indexOf(
                                section?.section.section_name
                              ) > -1
                            }
                          />
                          <ListItemText
                            primary={section?.section.section_name}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    className={{
                      minWidth: 300,
                    }}
                    sx={{ mt: 2 }}
                  >
                    <Typography htmlFor="age-native-simple">
                      Map sub section (optional)
                    </Typography>
                    <Select
                      labelId="demo-mutiple-checkbox-label"
                      id="demo-mutiple-checkbox"
                      // multiple
                      value={subsectionName}
                      name="first"
                      onChange={handleSubSectionSelectionChange}
                      input={
                        <OutlinedInput
                          sx={{ mt: 1 }}
                          notched={false}
                          label="Tag"
                          size="small"
                        />
                      }
                      renderValue={(selected) => selected}
                    >
                      {subsectionsList?.map((section) => (
                        <MenuItem
                          key={section._id}
                          value={section?.sub_regulation_no}
                        >
                          <ListItemText primary={section?.sub_regulation_no} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}

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
              </Grid>
              <Grid item lg={7} md={12}>
                <Typography sx={{ mb: 1 }}>Article Descriptions</Typography>
                {/* <Editor
                  placeholder="Start Typing........"
                  editorState={value}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  editorStyle={{
                    border: "1px solid #f1f1f1",
                    padding: "5px",
                    borderRadius: "2px",
                    height: "545px",
                    width: "100%",
                  }}
                  onEditorStateChange={(item) => {
                    console.log(
                      draftToHtml(convertToRaw(item.getCurrentContent()))
                    );
                    setValue(item);
                  }}
                /> */}

                {value && (
                  <CKEditor
                    ref={editorRef}
                    onKey={handleKeyDown}
                    // name="editor"
                    config={{
                      allowedContent: true,
                      forceEnterMode: true,
                      enterMode: "p",
                      // extraPlugins: ["amendments", "substitution"],
                      extraPlugins: ["substitution", "colorbutton"],
                      height: "235px",
                      resize_enabled: false,
                      removeButtons: false,
                    }}
                    initData={value}
                    onInstanceReady={(event) => {
                      //   alert("Editor is ready!");
                      editorRef.current = event;
                    }}
                    onChange={(e) => {
                      setValue(e.editor.getData());
                      extractMarkedWords(e.editor.getData());
                      console.log(e.editor.getData());
                    }}
                    onBeforeLoad={(CKEDITOR) => {
                      CKEDITOR.dtd.$removeEmpty["span"] = false;
                      CKEDITOR.dtd.$removeEmpty["i"] = false;
                      CKEDITOR.dtd.$removeEmpty["b"] = false;
                      CKEDITOR.dtd.$removeEmpty["u"] = false;
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

                      // if (!CKEDITOR.plugins.registered["amendments"]) {
                      //   CKEDITOR.plugins.add("amendments", {
                      //     init: function (editor) {
                      //       editor.addCommand("addAmendments", {
                      //         exec: function (editor) {
                      //           if (editor.getSelection().getSelectedText()) {
                      //             // alert(editor.getSelection().getSelectedText());
                      //             // handleClickOpen();
                      //             const amentmentText = window.prompt(
                      //               "Type Amendment text here...",
                      //               ""
                      //             );
                      //             // amentmentText + editor.getSelection().getSelectedText()
                      //             editor.insertHtml(
                      //               // "<p>This is a new paragraph.</p>"
                      //               " <span class=tooltip>" +
                      //                 amentmentText +
                      //                 " <span class=tooltiptext>" +
                      //                 editor.getSelection().getSelectedText() +
                      //                 "</span> </span>"
                      //             );
                      //           }
                      //         },
                      //       });
                      //       editor.ui.addButton("Amendments", {
                      //         label: "Add Amendments",
                      //         command: "addAmendments",
                      //         toolbar: "insert",
                      //         icon: "https://cdn-icons-png.flaticon.com/512/6846/6846310.png",
                      //       });
                      //     },
                      //   });
                      // }

                      if (!CKEDITOR.plugins.registered["substitution"]) {
                        CKEDITOR.plugins.add("substitution", {
                          init: function (editor) {
                            console.log(editor);
                            editor.addCommand("addSubstitution", {
                              exec: function (editor) {
                                console.log(editor);
                                if (editor.getSelection().getSelectedText()) {
                                  console.log(
                                    editor.getSelection().getSelectedText()
                                  );
                                  editor.insertHtml(
                                    "<span style='color: #983301;'>" +
                                      editor.getSelection().getSelectedText() +
                                      "</span> <br/>"

                                    // "<font color='#983301'>" +
                                    //   editor.getSelection().getSelectedText() +
                                    //   "</font>"
                                  );
                                }
                              },
                            });
                            editor.ui.addButton("Substitutions", {
                              label: "Add Substitutions",
                              command: "addSubstitution",
                              toolbar: "insert",
                              icon: "https://cdn-icons-png.flaticon.com/512/3047/3047335.png",
                            });
                          },
                        });
                      }
                    }}
                  />
                )}
                {/* <Box sx={{ mt: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={handleExpandClick}
                  >
                    <Typography sx={{ mb: 2 }}>
                      <strong>Description History</strong>
                    </Typography>
                    <ExpandMore
                      expand={expandedhistory}
                      onClick={handleExpandClick}
                      aria-expanded={expandedhistory}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </Box>

                  <Collapse in={expandedhistory} timeout="auto" unmountOnExit>
                    {descriptionVersion.map((item, index) => (
                      <Box
                        sx={{
                          background:
                            expandedhistoryversion === index ? "#f9f9f9" : "",
                          borderRadius: "5px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            background:
                              expandedhistoryversion === index ? "#e8e8e8" : "",
                            borderRadius: "5px",
                            ":hover": {
                              background: "#e8e8e8",
                            },
                          }}
                        >
                          <Checkbox
                            checked={item.checked}
                            onChange={(event) => onCheckedHandler(index)}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                          <Typography
                            sx={{ ml: 2, mt: 1, cursor: "pointer" }}
                            onClick={() => handleClick(index)}
                          >
                            Version : {descriptionVersion.length - index}
                          </Typography>
                          <Box sx={{ flexGrow: 1 }} />
                          <IconButton onClick={() => handleClick(index)}>
                            {expandedhistoryversion === index ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </IconButton>
                        </Box>

                        <Collapse
                          in={expandedhistoryversion === index}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box
                            sx={{
                              border: "1px solid black",
                              p: 3,
                              mt: 2,
                              mb: 2,
                              ml: 2,
                              mr: 2,
                              borderRadius: "10px",
                            }}
                          >
                            <Typography variant="body2">
                              <strong>Description:</strong>{" "}
                              {parse(item.description)}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              <strong>Date:</strong>{" "}
                              {`${("0" + new Date(item?.date)?.getDate()).slice(
                                -2
                              )}-${(
                                "0" +
                                (new Date(item?.date)?.getMonth() + 1)
                              ).slice(-2)}-${new Date(item?.date)
                                ?.getFullYear()
                                .toString()
                                .slice(-2)}`}
                            </Typography>
                            <Typography sx={{ mt: 1, mb: 1 }}>
                              <strong>Changes: --</strong>
                            </Typography>
                            <Typography>
                              {CheckStringChanges(
                                item,
                                descriptionVersion,
                                index
                              )}
                            </Typography>
                          </Box>
                        </Collapse>
                      </Box>
                    ))}
                  </Collapse>
                </Box> */}
              </Grid>
            </Grid>

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
                Save
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditArticleDialog;
