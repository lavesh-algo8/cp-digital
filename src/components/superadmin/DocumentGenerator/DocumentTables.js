import {
  TableContainer,
  Dialog,
  DialogTitle,
  Box,
  IconButton,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarExportContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import UploadIcon from "@mui/icons-material/Upload";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import parse from "html-react-parser";
import { useNavigate, useParams } from "react-router-dom";
import {
  DuplicateProcedure,
  fetchProcedureHeadings,
  getDocuments,
} from "../../../redux/superAdminReducer/superAdminAction";
import { Form } from "@formio/react";
import EditDocument from "../../../pages/superadmin/DocumentGenerator/EditDocument";
import EditAddDocument from "./EditAddDocument";
import DeleteProcedureDocument from "./DeleteProcedureDocument";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const disable = true;

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      {disable ? (
        <>
          <GridToolbarQuickFilter sx={{ marginLeft: "auto" }} />
        </>
      ) : (
        <GridToolbarExport />
      )}
    </GridToolbarContainer>
  );
}

const DocumentTables = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listOfDocuments } = useSelector((state) => state.SuperAdmin);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [selectedRowData, setSelectedRowData] = React.useState(null);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [procedureDetails, setprocedureDetails] = useState("");
  // const [duplicate, setduplicate] = useState(false);

  React.useEffect(() => {
    dispatch(getDocuments());
  }, [openDialogEdit, openDialogDelete]);

  const columns = [
    {
      field: "id",
      headerName: "Sl No.",
      flex: 0.2,
    },
    {
      field: "procedure",
      headerName: "Procedure",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography>
            {params?.row?.procedure_type
              ? params?.row?.procedure + " / " + params?.row?.procedure_type
              : params?.row?.procedure}
          </Typography>
        );
      },
    },

    {
      field: "law_name",
      headerName: "Law",
      valueGetter: (params) => params?.row?.law_name?.category,
      flex: 0.3,
    },
    {
      field: "act_name",
      headerName: "Act",
      valueGetter: (params) =>
        params?.row?.act_name?.act?.length > 40
          ? params?.row?.act_name?.act?.slice(0, 40) + "...."
          : params?.row?.act_name?.act?.slice(0, 40),
      flex: 0.4,
    },

    {
      field: "procedures",
      headerName: "Procedure Form",
      flex: 0.5,
      type: "actions",
      renderCell: (params) => {
        return (
          <>
            {params?.row?.form === null ? (
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  width: "25ch",
                }}
                onClick={() =>
                  navigate(
                    `/superadmin/generator/documentGenerator/generatenewdocument/${params?.row?.procedure}/${params?.row?.procedure_id}`
                  )
                }
              >
                Generate Document
              </Button>
            ) : (
              <Button
                variant="contained"
                color="info"
                sx={{
                  textTransform: "none",
                  width: "25ch",
                }}
                onClick={() => {
                  dispatch({
                    type: "SET_SELECT_DOCUMENT",
                    payload: params?.row,
                  });
                  navigate(
                    `/superadmin/generator/documentGenerator/editdocument/${params?.row?.procedure}/${params?.row?.procedure_id}`
                  );
                }}
              >
                Edit Document
              </Button>
            )}
          </>
        );
      },
    },

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
            setSelectedRow(params.row?.form?.formData);
          }}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            setOpenDialogEdit(true);
            setSelectedRowData(params.row);
          }}
          label="Edit"
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          showInMenu
          onClick={() => {
            setprocedureDetails(params?.row);
            setOpenDialogDelete(true);
          }}
        />,
        <GridActionsCellItem
          icon={<ContentCopyIcon />}
          onClick={async () => {
            const res = await dispatch(
              DuplicateProcedure(params?.row?.procedure_id)
            );
            // setduplicate(!duplicate);
            console.log(res);
            if (res) {
              await dispatch(getDocuments());
            }
          }}
          label="Duplicate"
          showInMenu
        />,
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
      {openDialogEdit && (
        <EditAddDocument
          openDialog={openDialogEdit}
          setOpenDialog={setOpenDialogEdit}
          selectedRowData={selectedRowData}
        />
      )}

      <DeleteProcedureDocument
        openDialog={openDialogDelete}
        setOpenDialog={setOpenDialogDelete}
        procedureDetails={procedureDetails}
      />

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
          pb: 5,
          border: 0,
        }}
      >
        <DataGrid
          hideFooter
          rowsPerPageOptions={[]}
          rowHeight={65}
          // disableColumnFilter
          // disableColumnSelector
          // disableDensitySelector
          rows={
            listOfDocuments?.map((doc, index) => ({
              id: index + 1,
              ...doc,
            })) || []
          }
          components={{
            Toolbar: CustomToolbar,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          columns={columns}
          disableSelectionOnClick
          onRowClick={(e) => {
            // console.log(e);
            // alert(e.row.procedure);
            dispatch({
              type: "SET_SELECT_DOCUMENT",
              payload: e.row,
            });
            navigate(
              `/superadmin/generator/documentGenerator/viewProcedure/${e.row.procedure_id}`
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
  console.log(props);
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
        <div></div>
        <Form src={props.data} onRender={(html) => console.log(html)} />
      </DialogContent>
    </Dialog>
  );
}
