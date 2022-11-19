import {
  Box,
  Button,
  Card,
  Collapse,
  FormControl,
  Menu,
  MenuItem,
  Select,
  TableContainer,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import TableDialog from "./DialogShow/TableDialog";
import AddIcon from "@mui/icons-material/Add";
import AddDialog from "../AddDialogCommon/AddDialog";
import AddCircularDialog from "./Circular/AddCircularDialog";
import { Delete, Edit } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditCircularDialog from "./Circular/EditCircularDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArticles,
  fetchCirculars,
} from "../../../../redux/superAdminReducer/superAdminAction";
import DeleteCircularDialog from "./Circular/DeleteCircularDialog";
import Add from "@mui/icons-material/Add";
import AddSubCircularDialog from "./Circular/AddSubCircularDialog";
import AddArticleDialog from "./Article/AddArticleDialog";
import EditArticleDialog from "./Article/EditArticleDialog";
import DeleteArticleDialog from "./Article/DeleteArticleDialog";
import AddSubArticleDialog from "./Article/AddSubArticleDialog";
import EditSubArticleDialog from "./Article/EditSubArticleDialog";
import DeleteSubArticleDialog from "./Article/DeleteSubArticleDialog";

const options = ["Publish", "UnPublish"];
const ITEM_HEIGHT = 48;

const Article = () => {
  const dispatch = useDispatch();
  const [clickedIndex, setClickedIndex] = React.useState(-1);

  const [openDialog, setopenDialog] = React.useState(false);
  const [openEditArticleRuleDialog, setopenEditArticleRuleDialog] =
    React.useState(false);
  const [openaddsubarticleDialog, setopenaddsubarticleDialog] =
    React.useState(false);
  const [openeditsubarticleDialog, setopeneditsubarticleDialog] =
    React.useState(false);
  const [opendeletesubarticleDialog, setopendeletesubarticleDialog] =
    React.useState(false);

  const [openDeleteArticleDialog, setopenDeleteArticleDialog] =
    React.useState(false);
  const [articleId, setarticleId] = React.useState(false);
  const [subarticleId, setsubarticleId] = React.useState(false);

  const [articleName, setarticleName] = React.useState(false);

  const { articlesList } = useSelector((state) => state?.SuperAdmin);
  const [articleDetails, setarticleDetails] = React.useState({});
  const [subarticleDetails, setsubarticleDetails] = React.useState({});

  // menu action
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    {
      field: "article_date",
      headerName: "Date",
      flex: 0.2,

      renderCell: (params) => {
        return (
          <>
            <Box sx={{ display: "flex", flexDirection: "column", my: 2 }}>
              <Typography
                sx={{
                  cursor: "pointer",
                }}
              >
                {params?.row?.article.date?.toString().substring(0, 10) ||
                  new Date().toISOString().split("T")[0]}
              </Typography>
              <Collapse
                in={params?.row?.article?._id === clickedIndex}
                sx={{ pt: 1 }}
              >
                {params?.row?.subArticles?.map((item, index) => (
                  <Box>
                    {item.date?.toString().substring(0, 10) ||
                      new Date().toISOString().split("T")[0]}
                  </Box>
                ))}
              </Collapse>
            </Box>
          </>
        );
      },
    },
    {
      field: "circular_heading",
      headerName: "Articles",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setClickedIndex(params?.row?.article?._id);
                }}
              >
                {params.row.article.title}
              </Typography>
              <Collapse
                in={params?.row?.article?._id === clickedIndex}
                sx={{ pt: 1 }}
              >
                {params?.row?.subArticles?.map((item, index) => (
                  <>
                    <Box
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      {item.sub_title}
                    </Box>
                  </>
                ))}
              </Collapse>
            </Box>
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) =>
        //   console.log(params.row.status),
        params.row.status === "Published" ? (
          <Typography sx={{ color: "green" }}>Published</Typography>
        ) : (
          <Typography sx={{ color: "red" }}>Unpublish</Typography>
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex" }}>
              <Tooltip title="Add subArticle">
                <Typography
                  color="primary"
                  sx={{ pl: 1, cursor: "pointer" }}
                  onClick={() => {
                    setarticleName(params?.row?.article.title);
                    setarticleId(params?.row?.article?._id);
                    setopenaddsubarticleDialog(true);
                  }}
                >
                  <Add fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Edit Article">
                <Typography
                  color="primary"
                  onClick={() => {
                    setarticleDetails(params?.row?.article);
                    setopenEditArticleRuleDialog(true);
                  }}
                  sx={{ pl: 1, cursor: "pointer" }}
                >
                  <Edit fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Delete Article">
                <Typography
                  color="primary"
                  sx={{ pl: 1, cursor: "pointer" }}
                  onClick={() => {
                    setarticleId(params?.row?.article?._id);
                    setopenDeleteArticleDialog(true);
                  }}
                >
                  <Delete fontSize="small" />
                </Typography>
              </Tooltip>
              <div>
                <Typography
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  sx={{ pl: 1 }}
                >
                  <MoreVertIcon fontSize="small" />
                </Typography>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={option}
                      selected={option === "Pyxis"}
                      onClick={handleClose}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </Box>
            <Collapse
              in={params?.row?.article?._id === clickedIndex}
              sx={{ pt: 1 }}
            >
              {params?.row?.subArticles?.map((item, index) => (
                <>
                  <Box sx={{ display: "flex" }}>
                    <Tooltip title="Delete sub-article">
                      <Typography
                        color="primary"
                        sx={{ pl: 1, cursor: "pointer" }}
                        onClick={() => {
                          setsubarticleId(item._id);
                          setopendeletesubarticleDialog(true);
                        }}
                      >
                        <Delete fontSize="small" />
                      </Typography>
                    </Tooltip>
                    <Tooltip title="Edit sub-article">
                      <Typography
                        color="primary"
                        sx={{ pl: 1, cursor: "pointer" }}
                        onClick={() => {
                          setsubarticleDetails(item);
                          setopeneditsubarticleDialog(true);
                        }}
                      >
                        <Edit fontSize="small" />
                      </Typography>
                    </Tooltip>
                  </Box>
                </>
              ))}
            </Collapse>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchArticles());
  }, [
    openDialog,
    openEditArticleRuleDialog,
    openDeleteArticleDialog,
    openaddsubarticleDialog,
    openeditsubarticleDialog,
    opendeletesubarticleDialog,
  ]);

  return (
    <>
      <AddArticleDialog openDialog={openDialog} setOpenDialog={setopenDialog} />

      <AddSubArticleDialog
        openDialog={openaddsubarticleDialog}
        setOpenDialog={setopenaddsubarticleDialog}
        articleName={articleName}
        articleId={articleId}
      />

      <EditSubArticleDialog
        openDialog={openeditsubarticleDialog}
        setOpenDialog={setopeneditsubarticleDialog}
        subarticleDetails={subarticleDetails}
      />

      <DeleteSubArticleDialog
        openDialog={opendeletesubarticleDialog}
        setOpenDialog={setopendeletesubarticleDialog}
        subarticleId={subarticleId}
      />

      <EditArticleDialog
        openDialog={openEditArticleRuleDialog}
        setOpenDialog={setopenEditArticleRuleDialog}
        articleDetails={articleDetails}
      />

      <DeleteArticleDialog
        openDialog={openDeleteArticleDialog}
        setOpenDialog={setopenDeleteArticleDialog}
        articleId={articleId}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          sx={{ mr: 2 }}
          onClick={() => setopenDialog(true)}
        >
          Add Article
        </Button>
      </Box>
      <TableContainer
        sx={{
          height: `calc(100vh - ${250}px)`,
        }}
      >
        <DataGrid
          pageSize={5}
          rowsPerPageOptions={[5]}
          rows={articlesList || []}
          getRowId={(row) => row?.article._id}
          columns={columns}
          disableSelectionOnClick
          getRowHeight={() => "auto"}
          sx={{
            boxShadow: 0,
            border: 0,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
            "& .MuiDataGrid-cell:focus,.MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#bfc0c9",
            },
          }}
        />
      </TableContainer>
    </>
  );
};

export default Article;
