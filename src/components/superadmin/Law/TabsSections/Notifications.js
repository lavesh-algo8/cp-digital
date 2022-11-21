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
import React, { useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import TableDialog from "./DialogShow/TableDialog";
import AddIcon from "@mui/icons-material/Add";
import AddDialog from "../AddDialogCommon/AddDialog";
import AddNotificationDialog from "./Notification/AddNotificationDialog";
import { Delete, Edit } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditNotificationDialog from "./Notification/EditNotificationDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotification } from "../../../../redux/superAdminReducer/superAdminAction";
import DeleteNotificationDialog from "./Notification/DeleteNotificationDialog";

const options = ["Publish", "UnPublish"];
const ITEM_HEIGHT = 48;

const Notifications = () => {
  const [openDialog, setopenDialog] = React.useState(false);
  const [openEditNotificationDialog, setopenEditNotificationDialog] =
    React.useState(false);
  const [openDeleteNotificationDialog, setopenDeleteNotificationDialog] =
    React.useState(false);

  const [notificationId, setnotificationId] = React.useState("");

  const dispatch = useDispatch();
  const { notificationsList } = useSelector((state) => state?.SuperAdmin);
  const [notificationsDetails, setnotificationsDetails] = React.useState({});

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
      field: "notification_date",
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
                {params?.row?.notification_date?.toString().substring(0, 10) ||
                  new Date().toISOString().split("T")[0]}
              </Typography>
            </Box>
          </>
        );
      },
    },
    {
      field: "notification",
      headerName: "Notifications",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              cursor: "pointer",
            }}
          >
            {params.row.notification_heading}
          </Typography>
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
              <Tooltip title="Edit notification">
                <Typography
                  color="primary"
                  onClick={() => {
                    setnotificationsDetails(params?.row);
                    setopenEditNotificationDialog(true);
                  }}
                  sx={{ pl: 1, cursor: "pointer" }}
                >
                  <Edit fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Delete notification">
                <Typography
                  color="primary"
                  sx={{ pl: 1, cursor: "pointer" }}
                  onClick={() => {
                    setnotificationId(params.row._id);
                    setopenDeleteNotificationDialog(true);
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
    dispatch(fetchNotification());
  }, [openDialog, openEditNotificationDialog, openDeleteNotificationDialog]);

  return (
    <>
      <AddNotificationDialog
        openDialog={openDialog}
        setOpenDialog={setopenDialog}
      />

      <EditNotificationDialog
        openDialog={openEditNotificationDialog}
        setOpenDialog={setopenEditNotificationDialog}
        notificationsDetails={notificationsDetails}
      />

      <DeleteNotificationDialog
        openDialog={openDeleteNotificationDialog}
        setOpenDialog={setopenDeleteNotificationDialog}
        notificationId={notificationId}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          sx={{ mr: 2 }}
          onClick={() => setopenDialog(true)}
        >
          Add Notification
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
          rows={notificationsList || []}
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

export default Notifications;
