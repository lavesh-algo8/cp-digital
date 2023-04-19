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

const ProcessTable = () => {
  const dispatch = useDispatch();
  const { listOfAdmins = [] } = useSelector((state) => state?.SuperAdmin);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});

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

  //   const deleteAdminById = async (id) => {

  //     const confirm = window.confirm(
  //       "Are you sure you want to delete this admin?"
  //     );
  //     if (confirm) {
  //       const resp = await dispatch(deleteAdmin(id));
  //       if (resp) dispatch(getAdminList());
  //     }
  //   };

  //   useEffect(() => {
  //     dispatch(getAdminList());
  //   }, [localStorage.getItem("token")]);

  const rows = [
    {
      id: "1",
      id_no: "CORPROA1",
      admin: "Rahul",
      email: "rahul@corpro.com",
      designation: "Executive",
    },
    {
      id: "2",
      id_no: "CORPROA1",
      admin: "Rahul",
      email: "rahul@corpro.com",
      designation: "Executive",
    },
    {
      id: "3",
      id_no: "CORPROA1",
      admin: "Rahul",
      email: "rahul@corpro.com",
      designation: "Executive",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Sl No.",
      flex: 0.5,
    },
    {
      field: "procedure_name",
      headerName: "Process Name",
      flex: 1.3,
    },
    {
      field: "days",
      headerName: "Total No. Of Days",
      flex: 0.8,
    },
    {
      field: "documents",
      headerName: "Documents",
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
            setSelectedAdmin(params.row);
            handleOpenDialog();
          }}
          icon={<EditIcon />}
          label="Edit"
          showInMenu
        />,
        <GridActionsCellItem
          //   onClick={() => deleteAdminById(params.row._id)}
          icon={<DeleteIcon />}
          label="Delete"
          showInMenu
        />,
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
          rows={[]}
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

      {/* <EditAdminDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          handleClose={handleClose}
          selectedAdmin={selectedAdmin}
        /> */}
    </>
  );
};

export default ProcessTable;
