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
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSubAdminDialog from "./EditSubAdminDialog";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

const SubAdminsTable = () => {
  const [openSubAdminDialog, setOpenSubAdminDialog] = React.useState(false);

  const handleOpenDialog = () => {
    // handleClose();
    setOpenSubAdminDialog(true);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const rows = [
    {
      id: "1",
      id_no: "CORPROA1",
      admin: "Rahul",
      email: "rahul@corpro.com",
      designation: "Executive",
      managed_by: "John",
    },
    {
      id: "2",
      id_no: "CORPROA1",
      admin: "Rahul",
      email: "rahul@corpro.com",
      designation: "Executive",
      managed_by: "John",
    },
    {
      id: "3",
      id_no: "CORPROA1",
      admin: "Rahul",
      email: "rahul@corpro.com",
      designation: "Executive",
      managed_by: "John",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Sl No.",
      flex: 1,
    },
    {
      field: "id_no",
      headerName: "ID No.",
      flex: 1,
    },
    {
      field: "admin",
      headerName: "Admin",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1,
    },
    {
      field: "managed_by",
      headerName: "Managed By (Admin)",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem icon={<EditIcon />} label="Edit" showInMenu />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" showInMenu />,
      ],
    },
  ];

  return (
    <>
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
        <EditSubAdminDialog
          openSubAdminDialog={openSubAdminDialog}
          setOpenSubAdminDialog={setOpenSubAdminDialog}
          handleClose={handleClose}
        />
        <MenuItem onClick={handleClose}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
      {/* actio menu : edit/delete */}

      <TableContainer
        component={Paper}
        sx={{
          height: `calc(100vh - ${200}px)`,
        }}
      >
        <DataGrid
          hideFooter
          rowsPerPageOptions={[]}
          rows={rows}
          columns={columns}
          disableSelectionOnClick
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

export default SubAdminsTable;
