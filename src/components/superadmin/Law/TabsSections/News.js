import {
  Box,
  Button,
  Menu,
  MenuItem,
  TableContainer,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Delete, Edit } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../../../redux/superAdminReducer/superAdminAction";

import AddNewsDialog from "./News/AddNewsDialog";
import EditNewsDialog from "./News/EditNewsDialog";
import DeleteNewsDialog from "./News/DeleteNewsDialog";

const options = ["Publish", "UnPublish"];
const ITEM_HEIGHT = 48;

const News = () => {
  const dispatch = useDispatch();

  const [openDialog, setopenDialog] = React.useState(false);
  const [openeditnewsDialog, setopeneditnewsDialog] = React.useState(false);

  const [openDeleteNewsDialog, setopenDeleteNewsDialog] = React.useState(false);
  const [newsId, setnewsId] = React.useState(false);

  const { newsList } = useSelector((state) => state?.SuperAdmin);
  const [newsDetails, setnewsDetails] = React.useState({});

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
      field: "date",
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
                {params?.row?.date?.toString().substring(0, 10) ||
                  new Date().toISOString().split("T")[0]}
              </Typography>
            </Box>
          </>
        );
      },
    },
    {
      field: "heading",
      headerName: "News",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>{params.row.heading}</Typography>
            </Box>
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) =>
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
              <Tooltip title="Edit News">
                <Typography
                  color="primary"
                  onClick={() => {
                    setnewsDetails(params?.row);
                    setopeneditnewsDialog(true);
                  }}
                  sx={{ pl: 1, cursor: "pointer" }}
                >
                  <Edit fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Delete News">
                <Typography
                  color="primary"
                  sx={{ pl: 1, cursor: "pointer" }}
                  onClick={() => {
                    setnewsId(params?.row?._id);
                    setopenDeleteNewsDialog(true);
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
    dispatch(fetchNews());
  }, [openDialog, openeditnewsDialog, openDeleteNewsDialog]);

  return (
    <>
      <AddNewsDialog openDialog={openDialog} setOpenDialog={setopenDialog} />

      <EditNewsDialog
        openDialog={openeditnewsDialog}
        setOpenDialog={setopeneditnewsDialog}
        newsDetails={newsDetails}
      />

      <DeleteNewsDialog
        openDialog={openDeleteNewsDialog}
        setOpenDialog={setopenDeleteNewsDialog}
        newsId={newsId}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          sx={{ mr: 2 }}
          onClick={() => setopenDialog(true)}
        >
          Add News
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
          rows={newsList || []}
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

export default News;
