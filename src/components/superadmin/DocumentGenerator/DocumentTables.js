import {
  TableContainer,
  Dialog,
  DialogTitle,
  Box,
  IconButton,
  DialogContent,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import UploadIcon from "@mui/icons-material/Upload";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

const DocumentTables = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listOfDocuments = [] } = useSelector((state) => state.SuperAdmin);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const columns = [
    {
      field: "id",
      headerName: "Sl No.",
      flex: 1,
    },
    {
      field: "procedure",
      headerName: "Procedure",
      flex: 1,
    },
    // {
    //   field: "date",
    //   headerName: "Date",
    //   flex: 1,
    // },
    // {
    //   field: "title",
    //   headerName: "Title",
    //   flex: 1,
    // },
    // {
    //   field: "menu",
    //   headerName: "Menu",
    //   flex: 1,
    // },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   flex: 1,
    // },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="View"
          showInMenu
          onClick={() => {
            console.log(params);
            handleOpenDialog();
            setSelectedRow(params.row?.fileData);
          }}
        />,
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

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <DocumentViewer
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        data={selectedRow}
      />
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
          rows={listOfDocuments.map((doc, index) => ({
            id: index + 1,
            ...doc,
          }))}
          columns={columns}
          disableSelectionOnClick
          onRowClick={(e) => {
            dispatch({
              type: "SET_SELECT_DOCUMENT",
              payload: e.row,
            });
            navigate(`/superadmin/documentGenerator/viewProcedure`);
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

function DocumentViewer(props) {
  return (
    <Dialog
      open={props.openDialog} // Use value directly here
      onClose={props.handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        style: { borderRadius: 10, minWidth: 600 },
      }}
      maxWidth="lg"
    >
      <DialogTitle fontWeight={600}>View Document</DialogTitle>
      <Box position="absolute" top={5} right={10}>
        <IconButton onClick={props.handleDialogClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <div>{parse(props.data || "")}</div>
      </DialogContent>
    </Dialog>
  );
}
