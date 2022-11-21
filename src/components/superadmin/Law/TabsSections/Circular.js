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
import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import TableDialog from "./DialogShow/TableDialog";
import AddIcon from "@mui/icons-material/Add";
import AddDialog from "../AddDialogCommon/AddDialog";
import AddCircularDialog from "./Circular/AddCircularDialog";
import { Delete, Edit } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditCircularDialog from "./Circular/EditCircularDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchCirculars } from "../../../../redux/superAdminReducer/superAdminAction";
import DeleteCircularDialog from "./Circular/DeleteCircularDialog";
import Add from "@mui/icons-material/Add";
import AddSubCircularDialog from "./Circular/AddCircularDialog";
import { useLocation, useNavigate } from "react-router-dom";

const options = ["Publish", "UnPublish"];
const ITEM_HEIGHT = 48;

const Circular = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [openDialog, setopenDialog] = React.useState(false);
  const [openaddsubcircularDialog, setopenaddsubcircularDialog] =
    React.useState(false);
  const [openeditsubcircularDialog, setopeneditsubcircularDialog] =
    React.useState(false);
  const [opendeletesubcircularDialog, setopendeletesubcircularDialog] =
    React.useState(false);
  const [openEditCircularRuleDialog, setopenEditCircularRuleDialog] =
    React.useState(false);
  const [openDeleteCircularDialog, setopenDeleteCircularDialog] =
    React.useState(false);
  const [circularId, setcircularId] = React.useState(false);
  const [circularName, setcircularName] = React.useState(false);

  const { circularsList } = useSelector((state) => state?.SuperAdmin);
  const [circularsDetails, setcircularsDetails] = React.useState({});
  const [clickedIndex, setClickedIndex] = React.useState(-1);

  const [subcircularId, setsubcircularId] = useState("");
  const [subcircularDetails, setsubcircularDetails] = useState("");

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
      field: "circular_date",
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
                {params?.upload_date?.toString().substring(0, 10) ||
                  new Date().toISOString().split("T")[0]}
              </Typography>
              <Collapse in={params?.row?._id === clickedIndex} sx={{ pt: 1 }}>
                {params?.row?.sub_circulars?.map((item, index) => (
                  <Box>
                    {item.updatedAt?.toString().substring(0, 10) ||
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
      headerName: "Circulars",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>{params.row.circular_heading}</Typography>
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
              <Tooltip title="Edit Circular">
                <Typography
                  color="primary"
                  onClick={() => {
                    setcircularsDetails(params?.row);
                    setopenEditCircularRuleDialog(true);
                  }}
                  sx={{ pl: 1, cursor: "pointer" }}
                >
                  <Edit fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Delete Circular">
                <Typography
                  color="primary"
                  sx={{ pl: 1, cursor: "pointer" }}
                  onClick={() => {
                    setcircularId(params?.row?._id);
                    setopenDeleteCircularDialog(true);
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
    dispatch(fetchCirculars());
  }, [openDialog, openEditCircularRuleDialog, openDeleteCircularDialog]);

  return (
    <>
      <AddCircularDialog
        openDialog={openDialog}
        setOpenDialog={setopenDialog}
      />

      <EditCircularDialog
        openDialog={openEditCircularRuleDialog}
        setOpenDialog={setopenEditCircularRuleDialog}
        circularsDetails={circularsDetails}
      />

      <DeleteCircularDialog
        openDialog={openDeleteCircularDialog}
        setOpenDialog={setopenDeleteCircularDialog}
        circularId={circularId}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          sx={{ mr: 2 }}
          onClick={() => setopenDialog(true)}
        >
          Add Circular
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
          rows={circularsList || []}
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
              // py: "2px",
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

export default Circular;
