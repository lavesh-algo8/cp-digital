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
import AddArticleDialog from "./Article/AddArticleDialog";
import EditArticleDialog from "./Article/EditArticleDialog";
import DeleteArticleDialog from "./Article/DeleteArticleDialog";

const options = ["Publish", "UnPublish"];
const ITEM_HEIGHT = 48;

const Article = () => {
  const dispatch = useDispatch();

  const [openDialog, setopenDialog] = React.useState(false);
  const [openEditArticleRuleDialog, setopenEditArticleRuleDialog] =
    React.useState(false);

  const [openDeleteArticleDialog, setopenDeleteArticleDialog] =
    React.useState(false);
  const [articleId, setarticleId] = React.useState(false);

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
                {params?.row?.date?.toString().substring(0, 10) ||
                  new Date().toISOString().split("T")[0]}
              </Typography>
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
              <Typography>{params.row.title}</Typography>
            </Box>
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) =>
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
              <Tooltip title="Edit Article">
                <Typography
                  color="primary"
                  onClick={() => {
                    setarticleDetails(params?.row);
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
                    setarticleId(params?.row?._id);
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
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchArticles());
  }, [openDialog, openEditArticleRuleDialog, openDeleteArticleDialog]);

  return (
    <>
      <AddArticleDialog
        openDialog={openDialog}
        setOpenDialog={setopenDialog}
        articleName={articleName}
        articleId={articleId}
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
          height: `calc(100vh - ${265}px)`,
          mt: 2,
        }}
      >
        <DataGrid
          pageSize={5}
          rowsPerPageOptions={[5]}
          rows={articlesList || []}
          getRowId={(row) => row?._id}
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
