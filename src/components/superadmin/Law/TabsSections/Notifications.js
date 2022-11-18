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
import Add from "@mui/icons-material/Add";
import AddSubNotificationDialog from "./Notification/AddSubNotificationDialog";
import EditSubNotificationDialog from "./Notification/EditSubNotificationDialog";
import DeleteSubNotificationDialog from "./Notification/DeleteSubNotificationDialog";

const options = ["Publish", "UnPublish"];
const ITEM_HEIGHT = 48;

const Notifications = () => {
  const [openDialog, setopenDialog] = React.useState(false);
  const [openEditNotificationDialog, setopenEditNotificationDialog] =
    React.useState(false);
  const [openDeleteNotificationDialog, setopenDeleteNotificationDialog] =
    React.useState(false);

  const [openAddSubNotificationDialog, setopenAddSubNotificationDialog] =
    React.useState(false);
  const [openEditSubNotificationDialog, setopenEditSubNotificationDialog] =
    React.useState(false);

  const [openDeleteSubNotificationDialog, setopenDeleteSubNotificationDialog] =
    React.useState(false);

  const [notificationId, setnotificationId] = React.useState("");
  const [subnotificationId, setsubnotificationId] = React.useState("");

  const [notificationName, setnotificationName] = React.useState("");
  const [clickedIndex, setClickedIndex] = React.useState(-1);

  const dispatch = useDispatch();
  const { notificationsList } = useSelector((state) => state?.SuperAdmin);
  const [notificationsDetails, setnotificationsDetails] = React.useState({});
  const [subnotificationsDetails, setsubnotificationsDetails] = React.useState(
    {}
  );

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
                {params?.row?.notification.notification_date
                  ?.toString()
                  .substring(0, 10) || new Date().toISOString().split("T")[0]}
              </Typography>
              <Collapse
                in={params?.row?.notification?._id === clickedIndex}
                sx={{ pt: 1 }}
              >
                {params?.row?.sub_notifications?.map((item, index) => (
                  <Box>
                    {item.updatedAt?.toString().substring(0, 10) ||
                      new Date().toISOString().split("T")[0]}
                  </Box>
                ))}
              </Collapse>
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
        // return (
        //   <Typography
        //     sx={{
        //       cursor: "pointer",
        //     }}
        //     // onClick={handleOpenSection}
        //   >
        //     {params.row.notification.notification_heading}
        //   </Typography>
        // );

        return (
          <>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setClickedIndex(params?.row?.notification?._id);
                }}
              >
                {params.row.notification.notification_heading}
              </Typography>
              <Collapse
                in={params?.row?.notification?._id === clickedIndex}
                sx={{ pt: 1 }}
              >
                {params?.row?.sub_notifications?.map((item, index) => (
                  <>
                    <Box
                      // onClick={() =>
                      //   navigate(
                      //     `${pathname}/${item.sub_circular_heading}/${item._id}`
                      //   )
                      // }
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      {item.sub_notification_heading}
                    </Box>
                  </>
                ))}
              </Collapse>
            </Box>
          </>
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
              <Tooltip title="Add subnotification">
                <Typography
                  color="primary"
                  sx={{ pl: 1, cursor: "pointer" }}
                  onClick={() => {
                    setnotificationName(
                      params?.row?.notification.notification_heading
                    );
                    setnotificationId(params.row.notification._id);
                    setopenAddSubNotificationDialog(true);
                  }}
                >
                  <Add fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Edit section">
                <Typography
                  color="primary"
                  onClick={() => {
                    setnotificationsDetails(params?.row.notification);
                    setopenEditNotificationDialog(true);
                  }}
                  sx={{ pl: 1, cursor: "pointer" }}
                >
                  <Edit fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Delete Section">
                <Typography
                  color="primary"
                  sx={{ pl: 1, cursor: "pointer" }}
                  onClick={() => {
                    setnotificationId(params.row.notification._id);
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
            <Collapse
              in={params?.row?.notification?._id === clickedIndex}
              sx={{ pt: 1 }}
            >
              {params?.row?.sub_notifications?.map((item, index) => (
                <>
                  <Box sx={{ display: "flex" }}>
                    <Tooltip title="Delete sub-circular">
                      <Typography
                        color="primary"
                        sx={{ pl: 1, cursor: "pointer" }}
                        onClick={() => {
                          setsubnotificationId(item._id);
                          setopenDeleteSubNotificationDialog(true);
                        }}
                      >
                        <Delete fontSize="small" />
                      </Typography>
                    </Tooltip>
                    <Tooltip title="Edit sub-circular">
                      <Typography
                        color="primary"
                        sx={{ pl: 1, cursor: "pointer" }}
                        onClick={() => {
                          setsubnotificationsDetails(item);
                          setopenEditSubNotificationDialog(true);
                        }}
                      >
                        <Edit fontSize="small" />
                      </Typography>
                    </Tooltip>
                  </Box>
                </>
              ))}
            </Collapse>
          </Box>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(fetchNotification());
  }, [
    openDialog,
    openEditNotificationDialog,
    openDeleteNotificationDialog,
    openAddSubNotificationDialog,
    openEditSubNotificationDialog,
    openDeleteSubNotificationDialog,
  ]);

  return (
    <>
      <AddNotificationDialog
        openDialog={openDialog}
        setOpenDialog={setopenDialog}
      />

      <AddSubNotificationDialog
        openDialog={openAddSubNotificationDialog}
        setOpenDialog={setopenAddSubNotificationDialog}
        notificationName={notificationName}
        notificationId={notificationId}
      />

      {openEditSubNotificationDialog && (
        <EditSubNotificationDialog
          openDialog={openEditSubNotificationDialog}
          setOpenDialog={setopenEditSubNotificationDialog}
          subnotificationsDetails={subnotificationsDetails}
        />
      )}

      <DeleteSubNotificationDialog
        openDialog={openDeleteSubNotificationDialog}
        setOpenDialog={setopenDeleteSubNotificationDialog}
        subnotificationId={subnotificationId}
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
        {/* <Card
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#192A3A",
            color: "white",
            height: "35px",
            ml: 2,
          }}
        >
          <Typography sx={{ pr: 4, pl: 2 }}>Year</Typography>
          <FormControl sx={{}}>
            <Select
              size="small"
              color="whitecol"
              defaultValue="Name"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                color: "white",
                fontSize: "15px",
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
            >
              <MenuItem value="Name">Select</MenuItem>
              <MenuItem value="Day Pushlished">Day </MenuItem>
            </Select>
          </FormControl>
        </Card> */}
      </Box>
      <TableContainer
        sx={{
          height: `calc(100vh - ${250}px)`,
        }}
      >
        <DataGrid
          pageSize={5}
          rowsPerPageOptions={[5]}
          rows={notificationsList || []}
          getRowId={(row) => row?.notification._id}
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
