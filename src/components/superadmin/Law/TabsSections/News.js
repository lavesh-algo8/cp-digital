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
  fetchNews,
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
import AddNewsDialog from "./News/AddNewsDialog";
import EditNewsDialog from "./News/EditNewsDialog";
import DeleteNewsDialog from "./News/DeleteNewsDialog";
import AddSubNewsDialog from "./News/AddSubNewsDialog";

const options = ["Publish", "UnPublish"];
const ITEM_HEIGHT = 48;

const News = () => {
  const dispatch = useDispatch();
  const [clickedIndex, setClickedIndex] = React.useState(-1);

  const [openDialog, setopenDialog] = React.useState(false);
  const [openEditNewsRuleDialog, setopenEditNewsRuleDialog] =
    React.useState(false);
  const [openaddsubnewsDialog, setopenaddsubnewsDialog] = React.useState(false);
  const [openeditsubarticleDialog, setopeneditsubarticleDialog] =
    React.useState(false);
  const [opendeletesubarticleDialog, setopendeletesubarticleDialog] =
    React.useState(false);

  const [openDeleteNewsDialog, setopenDeleteNewsDialog] = React.useState(false);
  const [newsId, setnewsId] = React.useState(false);
  const [subnewsId, setsubnewsId] = React.useState(false);

  const [newsName, setnewsName] = React.useState(false);

  const { newsList } = useSelector((state) => state?.SuperAdmin);
  const [newsDetails, setnewsDetails] = React.useState({});
  const [subnewsDetails, setsubnewsDetails] = React.useState({});

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
      field: "date",
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
                {params?.row?.news.date?.toString().substring(0, 10) ||
                  new Date().toISOString().split("T")[0]}
              </Typography>
              <Collapse
                in={params?.row?.news?._id === clickedIndex}
                sx={{ pt: 1 }}
              >
                {params?.row?.sub_news?.map((item, index) => (
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
      field: "heading",
      headerName: "News",
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
                  setClickedIndex(params?.row?.news?._id);
                }}
              >
                {params.row.news.heading}
              </Typography>
              <Collapse
                in={params?.row?.news?._id === clickedIndex}
                sx={{ pt: 1 }}
              >
                {params?.row?.sub_news?.map((item, index) => (
                  <>
                    <Box
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      {item.sub_heading}
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
              <Tooltip title="Add subNews">
                <Typography
                  color="primary"
                  sx={{ pl: 1, cursor: "pointer" }}
                  onClick={() => {
                    setnewsName(params?.row?.news.heading);
                    setnewsId(params?.row?.news?._id);
                    setopenaddsubnewsDialog(true);
                  }}
                >
                  <Add fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Edit News">
                <Typography
                  color="primary"
                  onClick={() => {
                    setnewsDetails(params?.row?.news);
                    setopenEditNewsRuleDialog(true);
                  }}
                  sx={{ pl: 1, cursor: "pointer" }}
                >
                  <Edit fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Delete News">
                <Typography
                  color="primary"
                  sx={{ pl: 1, cursor: "pointer" }}
                  onClick={() => {
                    setnewsId(params?.row?.news?._id);
                    setopenDeleteNewsDialog(true);
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
              in={params?.row?.news?._id === clickedIndex}
              sx={{ pt: 1 }}
            >
              {params?.row?.sub_news?.map((item, index) => (
                <>
                  <Box sx={{ display: "flex" }}>
                    <Tooltip title="Delete sub-news">
                      <Typography
                        color="primary"
                        sx={{ pl: 1, cursor: "pointer" }}
                        onClick={() => {
                          setsubnewsId(item._id);
                          setopendeletesubarticleDialog(true);
                        }}
                      >
                        <Delete fontSize="small" />
                      </Typography>
                    </Tooltip>
                    <Tooltip title="Edit sub-news">
                      <Typography
                        color="primary"
                        sx={{ pl: 1, cursor: "pointer" }}
                        onClick={() => {
                          setsubnewsDetails(item);
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
    dispatch(fetchNews());
  }, [
    openDialog,
    openEditNewsRuleDialog,
    openDeleteNewsDialog,
    openaddsubnewsDialog,
    openeditsubarticleDialog,
    opendeletesubarticleDialog,
  ]);

  return (
    <>
      <AddNewsDialog openDialog={openDialog} setOpenDialog={setopenDialog} />

      <AddSubNewsDialog
        openDialog={openaddsubnewsDialog}
        setOpenDialog={setopenaddsubnewsDialog}
        newsName={newsName}
        newsId={newsId}
      />

      {/* <EditSubArticleDialog
        openDialog={openeditsubarticleDialog}
        setOpenDialog={setopeneditsubarticleDialog}
        subnewsDetails={subnewsDetails}
      /> */}

      {/* <DeleteSubArticleDialog
        openDialog={opendeletesubarticleDialog}
        setOpenDialog={setopendeletesubarticleDialog}
        subnewsId={subnewsId}
      /> */}

      <EditNewsDialog
        openDialog={openEditNewsRuleDialog}
        setOpenDialog={setopenEditNewsRuleDialog}
        newsDetails={newsDetails}
      />

      <DeleteNewsDialog
        openDialog={openDeleteNewsDialog}
        setOpenDialog={setopenDeleteNewsDialog}
        newsId={newsId}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          sx={{ mr: 2 }}
          onClick={() => setopenDialog(true)}
        >
          Add News
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
          rows={newsList || []}
          getRowId={(row) => row?.news._id}
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

export default News;
