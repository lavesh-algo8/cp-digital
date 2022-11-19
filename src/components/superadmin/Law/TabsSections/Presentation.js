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
  fetchPresentation,
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
import AddPresentationDialog from "./Presentation/AddPresentationDialog";
import EditPresentationDialog from "./Presentation/EditPresentationDialog";
import DeletePresentationDialog from "./Presentation/DeletePresentationDialog";
import AddSubPresentationDialog from "./Presentation/AddSubPresentationDialog";
import EditSubPresentationDialog from "./Presentation/EditSubPresentationDialog";
import DeleteSubPresentationDialog from "./Presentation/DeleteSubPresentationDialog";

const options = ["Publish", "UnPublish"];
const ITEM_HEIGHT = 48;

const Presentation = () => {
  const dispatch = useDispatch();
  const [clickedIndex, setClickedIndex] = React.useState(-1);

  const [openDialog, setopenDialog] = React.useState(false);
  const [openEditPresentationDialog, setopenEditPresentationDialog] =
    React.useState(false);
  const [openaddsubpresentationDialog, setopenaddsubpresentationDialog] =
    React.useState(false);
  const [openeditsubpresentationDialog, setopeneditsubpresentationDialog] =
    React.useState(false);
  const [opendeletesubpresentationDialog, setopendeletesubpresentationDialog] =
    React.useState(false);

  const [openDeletePresentationDialog, setopenDeletePresentationDialog] =
    React.useState(false);
  const [presentationId, setpresentationId] = React.useState(false);
  const [subpresentationId, setsubpresentationId] = React.useState(false);

  const [presentationName, setpresentationName] = React.useState(false);

  const { presentationList } = useSelector((state) => state?.SuperAdmin);
  const [presentationDetails, setpresentationDetails] = React.useState({});
  const [subpresentationDetails, setsubpresentationDetails] = React.useState(
    {}
  );

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
      field: "presentation_date",
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
                {params?.row?.presentation.date?.toString().substring(0, 10) ||
                  new Date().toISOString().split("T")[0]}
              </Typography>
              <Collapse
                in={params?.row?.presentation?._id === clickedIndex}
                sx={{ pt: 1 }}
              >
                {params?.row?.sub_presentations?.map((item, index) => (
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
      headerName: "Presentation",
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
                  setClickedIndex(params?.row?.presentation?._id);
                }}
              >
                {params.row.presentation.title}
              </Typography>
              <Collapse
                in={params?.row?.presentation?._id === clickedIndex}
                sx={{ pt: 1 }}
              >
                {params?.row?.sub_presentations?.map((item, index) => (
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
              <Tooltip title="Add subPresentation">
                <Typography
                  color="primary"
                  sx={{ pl: 1, cursor: "pointer" }}
                  onClick={() => {
                    setpresentationName(params?.row?.presentation.title);
                    setpresentationId(params?.row?.presentation?._id);
                    setopenaddsubpresentationDialog(true);
                  }}
                >
                  <Add fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Edit Presentation">
                <Typography
                  color="primary"
                  onClick={() => {
                    setpresentationDetails(params?.row?.presentation);
                    setopenEditPresentationDialog(true);
                  }}
                  sx={{ pl: 1, cursor: "pointer" }}
                >
                  <Edit fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Delete Presentation">
                <Typography
                  color="primary"
                  sx={{ pl: 1, cursor: "pointer" }}
                  onClick={() => {
                    setpresentationId(params?.row?.presentation?._id);
                    setopenDeletePresentationDialog(true);
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
              in={params?.row?.presentation?._id === clickedIndex}
              sx={{ pt: 1 }}
            >
              {params?.row?.sub_presentations?.map((item, index) => (
                <>
                  <Box sx={{ display: "flex" }}>
                    <Tooltip title="Delete sub-presentation">
                      <Typography
                        color="primary"
                        sx={{ pl: 1, cursor: "pointer" }}
                        onClick={() => {
                          setsubpresentationId(item._id);
                          setopendeletesubpresentationDialog(true);
                        }}
                      >
                        <Delete fontSize="small" />
                      </Typography>
                    </Tooltip>
                    <Tooltip title="Edit sub-presentation">
                      <Typography
                        color="primary"
                        sx={{ pl: 1, cursor: "pointer" }}
                        onClick={() => {
                          setsubpresentationDetails(item);
                          setopeneditsubpresentationDialog(true);
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
    dispatch(fetchPresentation());
  }, [
    openDialog,
    openEditPresentationDialog,
    openDeletePresentationDialog,
    openaddsubpresentationDialog,
    openeditsubpresentationDialog,
    opendeletesubpresentationDialog,
  ]);

  return (
    <>
      <AddPresentationDialog
        openDialog={openDialog}
        setOpenDialog={setopenDialog}
      />

      <AddSubPresentationDialog
        openDialog={openaddsubpresentationDialog}
        setOpenDialog={setopenaddsubpresentationDialog}
        presentationName={presentationName}
        presentationId={presentationId}
      />

      <EditSubPresentationDialog
        openDialog={openeditsubpresentationDialog}
        setOpenDialog={setopeneditsubpresentationDialog}
        subpresentationDetails={subpresentationDetails}
      />

      <DeleteSubPresentationDialog
        openDialog={opendeletesubpresentationDialog}
        setOpenDialog={setopendeletesubpresentationDialog}
        subpresentationId={subpresentationId}
      />

      <EditPresentationDialog
        openDialog={openEditPresentationDialog}
        setOpenDialog={setopenEditPresentationDialog}
        presentationDetails={presentationDetails}
      />

      <DeletePresentationDialog
        openDialog={openDeletePresentationDialog}
        setOpenDialog={setopenDeletePresentationDialog}
        presentationId={presentationId}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          sx={{ mr: 2 }}
          onClick={() => setopenDialog(true)}
        >
          Add Presentation
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
          rows={presentationList || []}
          getRowId={(row) => row?.presentation._id}
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

export default Presentation;
