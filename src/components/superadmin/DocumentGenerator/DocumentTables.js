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
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import UploadIcon from "@mui/icons-material/Upload";

const DocumentTables = () => {
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
      date: new Date().toLocaleDateString(),
      title: "Document 1",
      menu: "FORM 32",
      status: "Pending",
    },
    {
      id: "2",
      date: new Date().toLocaleDateString(),
      title: "Document 2",
      menu: "FORM 32",
      status: "Published",
    },
    {
      id: "3",
      date: new Date().toLocaleDateString(),
      title: "Document 3",
      menu: "FORM 32",
      status: "Published",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Sl No.",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "menu",
      headerName: "Menu",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem icon={<EditIcon />} label="Edit" showInMenu />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" showInMenu />,
        <GridActionsCellItem
          icon={<UploadIcon />}
          label="Publish"
          showInMenu
        />,
      ],
    },
  ];

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <>
      {/* actio menu : edit/delete */}
      {/* <Menu
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
        <EditAdminDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          handleClose={handleClose}
        /> 

        <MenuItem onClick={handleClose}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <UploadIcon sx={{ mr: 1 }} />
          Publish
        </MenuItem>
      </Menu> */}
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

      {/* <TableContainer
        component={Paper}
        sx={{
          height: `calc(100vh - ${200}px)`,
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#C3C6CF" }}>Sl.no</TableCell>
              <TableCell sx={{ color: "#C3C6CF" }} align="center">
                ID No.
              </TableCell>
              <TableCell sx={{ color: "#C3C6CF" }} align="center">
                Admin
              </TableCell>
              <TableCell sx={{ color: "#C3C6CF" }} align="center">
                Email ID
              </TableCell>
              <TableCell sx={{ color: "#C3C6CF" }} align="center">
                Designation
              </TableCell>
              <TableCell sx={{ color: "#C3C6CF" }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                // onClick={() => alert("clicked")}
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  // cursor: "pointer",
                  ":hover": { background: "#eaebed" },
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.applicant_name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.role}</TableCell>
                <TableCell align="center" sx={{ cursor: "pointer" }}>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  );
};

export default DocumentTables;
