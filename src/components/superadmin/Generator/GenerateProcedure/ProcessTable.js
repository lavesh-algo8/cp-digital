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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditAdminDialog from "./EditAdminDialog";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import DeleteProcess from "./DeleteProcess";
import EditProcess from "./EditProcess";
import { useNavigate } from "react-router-dom";
import ViewDocumentsMapped from "./ViewDocumentsMapped";

const ProcessTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listOfProcesses = [], listOfTemplates } = useSelector(
    (state) => state?.SuperAdmin
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [openViewDocDialog, setOpenDocDialog] = useState(false);

  const [selectedProcessDetails, setSelectedProcessDetails] = useState({});

  const [tempformdata, settempformdata] = useState([]);
  const [tempsecformdata, settempsecformdata] = useState([]);

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
      field: "process",
      headerName: "Process Name",
      flex: 1.3,
    },
    {
      field: "numOfDays",
      headerName: "Total No. Of Days",
      flex: 0.8,
      valueGetter: (params) => String(params?.row?.numOfDays)?.padStart(2, "0"),
    },
    {
      field: "documents",
      headerName: "Documents",
      flex: 0.8,
      renderCell: (params) => {
        return (
          <>
            {/* {params?.row?.tempSecFormDataArr?.map((item, index) => (
              <>
                <Typography
                  sx={{
                    cursor: "pointer",
                    color: "blue",
                  }}
                  onClick={() => {
                    navigate(
                      `/superadmin/generator/templateGenerator/${item._id}/edittemplatedocument`
                    );
                  }}
                >
                  {item.title}
                </Typography>
                <br />
              </>
            ))} */}
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                settempformdata(params?.row?.tempFormDataArr);
                settempsecformdata(params?.row?.tempSecFormDataArr);
                setOpenDocDialog(true);
              }}
            >
              view
            </Button>
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
          onClick={async () => {
            console.log(params);
            await dispatch({
              type: "SET_TEMPLATES_DOC_ID_EDIT",
              payload: params?.row?.tempSecFormDataArr || [],
            });
            await dispatch({
              type: "SET_TEMPLATES_DOC_ONLY_EDIT",
              payload: params?.row?.tempFormDataArr || [],
            });

            setSelectedProcessDetails(params.row);
            setOpenEditDialog(true);
          }}
          icon={<EditIcon />}
          label="Edit"
          showInMenu
        />,
        <GridActionsCellItem
          onClick={() => {
            setSelectedProcessDetails(params.row);
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
      {openViewDocDialog && (
        <ViewDocumentsMapped
          openDialog={openViewDocDialog}
          setOpenDialog={setOpenDocDialog}
          tempFormDataArr={tempformdata}
          tempSecFormDataArr={tempsecformdata}
        />
      )}

      {openEditDialog && (
        <EditProcess
          openDialog={openEditDialog}
          setOpenDialog={setOpenEditDialog}
          processDetails={selectedProcessDetails}
        />
      )}

      {openDialogDelete && (
        <DeleteProcess
          openDialog={openDialogDelete}
          setOpenDialog={setOpenDialogDelete}
          processDetails={selectedProcessDetails}
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
            listOfProcesses?.map((doc, index) => ({
              id: index + 1,
              ...doc,
            })) || []
          }
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
