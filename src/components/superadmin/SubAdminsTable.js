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

  function createData(id, applicant_name, email, role, managed_by_admin) {
    return { id, applicant_name, email, role, managed_by_admin };
  }

  const rows = [
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
    createData("CORPROA1", "Rahul", "rahul@corpro.com", "Executive", "John"),
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
                Managed by (Admin)
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
                <TableCell align="center">{row.managed_by_admin}</TableCell>

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
      </TableContainer>
    </>
  );
};

export default SubAdminsTable;
