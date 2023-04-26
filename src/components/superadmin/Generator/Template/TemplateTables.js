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
  getAllTemplates,
  getDocuments,
} from "../../../../redux/superAdminReducer/superAdminAction";
import { Form } from "@formio/react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteTemplate from "./DeleteTemplate";
import EditTemplate from "./EditTemplate";

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

const TemplateTables = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listOfTemplates } = useSelector((state) => state.SuperAdmin);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [selectedRowData, setSelectedRowData] = React.useState(null);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [templateDetails, settemplateDetails] = useState("");
  // const [duplicate, setduplicate] = useState(false);

  useEffect(() => {
    dispatch(getAllTemplates());
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
            {params?.row?.type
              ? params?.row?.procedurename + " / " + params?.row?.type
              : params?.row?.procedurename}
          </Typography>
        );
      },
    },

    {
      field: "law_name",
      headerName: "Law",
      valueGetter: (params) => params?.row?.law,
      flex: 0.3,
    },
    {
      field: "act_name",
      headerName: "Act",
      valueGetter: (params) =>
        params?.row?.act?.length > 40
          ? params?.row?.act?.slice(0, 40) + "...."
          : params?.row?.act?.slice(0, 40),
      flex: 0.4,
    },

    {
      field: "procedures",
      headerName: "Template Form",
      flex: 0.5,
      type: "actions",
      renderCell: (params) => {
        return (
          <>
            {params?.row?.templateformdata ? (
              <Button
                variant="contained"
                color="info"
                sx={{
                  textTransform: "none",
                  width: "25ch",
                }}
                onClick={() => {
                  dispatch({
                    type: "SET_SELECT_TEMPLATE",
                    payload: params.row,
                  });
                  navigate(
                    `/superadmin/generator/templateGenerator/${params.row._id}/edittemplatedocument`
                  );
                }}
              >
                Edit Document
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  width: "25ch",
                }}
                onClick={() =>
                  navigate(
                    `/superadmin/generator/templateGenerator/${params.row._id}/addtemplatedocument`
                  )
                }
              >
                Generate Document
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
        // <GridActionsCellItem
        //   icon={<VisibilityIcon />}
        //   label="View"
        //   showInMenu
        //   onClick={() => {
        //     console.log(params);
        //     handleOpenDialog();
        //     setSelectedRow(params.row?.form?.formData);
        //   }}
        // />,
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            setOpenDialogEdit(true);
            settemplateDetails(params?.row);
          }}
          label="Edit"
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          showInMenu
          onClick={() => {
            settemplateDetails(params?.row);
            setOpenDialogDelete(true);
          }}
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
      {openDialogDelete && (
        <DeleteTemplate
          openDialog={openDialogDelete}
          setOpenDialog={setOpenDialogDelete}
          templateDetails={templateDetails}
        />
      )}

      {openDialogEdit && (
        <EditTemplate
          openDialog={openDialogEdit}
          setOpenDialog={setOpenDialogEdit}
          templateDetails={templateDetails}
        />
      )}

      <DocumentViewer
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        data={selectedRow}
      />

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
            listOfTemplates?.map((doc, index) => ({
              id: index + 1 + ".",
              ...doc,
            })) || []
          }
          getRowId={(row) => row._id}
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
              type: "SET_SELECT_TEMPLATE",
              payload: e.row,
            });
            navigate(
              `/superadmin/generator/templateGenerator/${e.row._id}/viewtemplateheadings`
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
    </>
  );
};

export default TemplateTables;

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
