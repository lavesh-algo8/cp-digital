import {
  Button,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditAdminDialog from "./EditAdminDialog";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import EditProcedure from "./EditProcedure";
import DeleteProcedure from "./DeleteProcedure";
import { useNavigate } from "react-router-dom";

const ProcedureTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listOfProcedures = [] } = useSelector((state) => state?.SuperAdmin);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const [selectedProcedure, setSelectedProcedure] = useState({});

  const open = Boolean(anchorEl);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    {
      field: "id",
      headerName: "Sl No.",
      flex: 0.5,
    },
    {
      field: "procedure",
      headerName: "Procedure Name",
      flex: 1.3,
    },
    {
      field: "law_name",
      headerName: "Law",
      valueGetter: (params) => params?.row?.law_name?.category,
      flex: 0.8,
    },
    {
      field: "act_name",
      valueGetter: (params) =>
        params?.row?.act_name?.act?.length > 40
          ? params?.row?.act_name?.act?.slice(0, 40) + "...."
          : params?.row?.act_name?.act?.slice(0, 40),
      headerName: "Act",
      flex: 0.8,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          onClick={() => {
            console.log(params);
            setSelectedProcedure(params.row);
            setOpenEditDialog(true);
          }}
          icon={<EditIcon />}
          label="Edit"
          showInMenu
        />,
        <GridActionsCellItem
          onClick={() => {
            setSelectedProcedure(params.row);
            setOpenDialogDelete(true);
          }}
          icon={<DeleteIcon />}
          label="Delete"
          showInMenu
        />,
      ],
    },
  ];

  return (
    <>
      {openEditDialog && (
        <EditProcedure
          openDialog={openEditDialog}
          setOpenDialog={setOpenEditDialog}
          selectedProcedure={selectedProcedure}
        />
      )}

      {openDialogDelete && (
        <DeleteProcedure
          openDialog={openDialogDelete}
          setOpenDialog={setOpenDialogDelete}
          procedureDetails={selectedProcedure}
        />
      )}
      {/* actio menu : edit/delete */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenDialog}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
      {/* actio menu : edit/delete */}

      <TableContainer
        sx={{
          height: `calc(100vh - ${200}px)`,
          border: 0,
        }}
      >
        <DataGrid
          hideFooter
          rowsPerPageOptions={[]}
          rows={
            Array.isArray(listOfProcedures)
              ? listOfProcedures?.map((doc, index) => ({
                  id: index + 1,
                  ...doc,
                })) || []
              : []
          }
          columns={columns}
          disableSelectionOnClick
          onRowClick={(e) => {
            dispatch({
              type: "SET_SELECT_PROCEDURE",
              payload: e.row,
            });
            navigate(
              `/superadmin/generator/generateprocedure/${e.row.procedure_id}/process`
            );
          }}
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

      {/* <EditAdminDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleClose={handleClose}
        selectedAdmin={selectedAdmin}
      /> */}
    </>
  );
};

export default ProcedureTable;
