import {
  Box,
  Button,
  FormControl,
  LinearProgress,
  Menu,
  MenuItem,
  Pagination,
  Select,
  TableContainer,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Delete, Edit } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategory,
  fetchContentTypeItem,
  fetchNews,
  getDataTree,
} from "../../../redux/superAdminReducer/superAdminAction";

import AddNewsDialog from "../Law/TabsSections/News/AddNewsDialog";
import EditNewsDialog from "../Law/TabsSections/News/EditNewsDialog";
import DeleteNewsDialog from "../Law/TabsSections/News/DeleteNewsDialog";
import { styled } from "@mui/material/styles";
import AddContentTypeItemsDialog from "./ContentTypeItems/AddContentTypeItemsDialog";
import EditContentTypeItemDialog from "./ContentTypeItems/EditContentTypeItemDialog";
import DeleteContentTypeItemsDialog from "./ContentTypeItems/DeleteContentTypeItemsDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteContentTypeDialog from "./ContentTypeItems/DeleteContentTypeDialog";

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

const options = ["Publish", "UnPublish"];
const ITEM_HEIGHT = 48;

const DynamicContent = (props) => {
  const [tableData, settableData] = useState([]);
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = React.useState(6);

  const [openDialog, setopenDialog] = React.useState(false);
  const [openDeleteDialog, setopenDeleteDialog] = React.useState(false);
  const [openEditContentItemDialog, setopenEditContentItemDialog] =
    React.useState(false);

  const [openDeleteNewsDialog, setopenDeleteNewsDialog] = React.useState(false);
  const [newsId, setnewsId] = React.useState(false);

  //   const { newsList } = useSelector((state) => state?.SuperAdmin);
  const [contentTypeDetails, setContentTypeDetails] = React.useState({});

  // menu action
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <>
        <FormControl
          variant="standard"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexGrow: 1,
            ml: 1,
            mt: 2,
          }}
        >
          <Typography sx={{ mr: 2, color: "#121D28" }}>
            Rows Per Page :
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pageSize}
            label="Size"
            onChange={(e) => setPageSize(e.target.value)}
          >
            <MenuItem value={6}>06</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={40}>40</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <Pagination
          sx={{ mt: 2 }}
          color="primary"
          count={pageCount}
          page={page + 1}
          onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
      </>
    );
  }

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
      field: "contenttypeitem",
      headerName: props?.contenttype,
      flex: 1,
      // renderCell: (params) => {
      //   return (
      //     <>
      //       <Box sx={{ display: "flex", flexDirection: "column" }}>
      //         <Typography>{params.row.heading}</Typography>
      //       </Box>
      //     </>
      //   );
      // },
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
              <Tooltip title="Edit ">
                <Typography
                  color="primary"
                  onClick={() => {
                    setContentTypeDetails(params?.row);
                    setopenEditContentItemDialog(true);
                  }}
                  sx={{ pl: 1, cursor: "pointer" }}
                >
                  <Edit fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Delete ">
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
    console.log("Calling API for category:");
    fetchItems();
  }, [
    props.contenttype,
    openDialog,
    openDeleteNewsDialog,
    openEditContentItemDialog,
    openDeleteDialog,
  ]);

  const fetchItems = async () => {
    const data = await dispatch(fetchContentTypeItem(props.contenttype));
    console.log(data.data.result);
    settableData(data.data.result);
  };

  return (
    <>
      {openDialog && (
        <AddContentTypeItemsDialog
          openDialog={openDialog}
          setOpenDialog={setopenDialog}
          contenttype={props.contenttype}
        />
      )}

      {openDeleteDialog && (
        <DeleteContentTypeDialog
          openDialog={openDeleteDialog}
          setOpenDialog={setopenDeleteDialog}
          contenttype={props.contenttype}
          value={props.value}
          setValue={props.setValue}
        />
      )}

      {openEditContentItemDialog && (
        <EditContentTypeItemDialog
          openDialog={openEditContentItemDialog}
          setOpenDialog={setopenEditContentItemDialog}
          contenttype={props.contenttype}
          contentTypeDetails={contentTypeDetails}
        />
      )}

      {openDeleteNewsDialog && (
        <DeleteContentTypeItemsDialog
          openDialog={openDeleteNewsDialog}
          setOpenDialog={setopenDeleteNewsDialog}
          contentTypeDetails={contentTypeDetails}
          contenttype={props.contenttype}
        />
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          sx={{ mr: 2 }}
          onClick={() => setopenDialog(true)}
        >
          Add {props.contenttype}
        </Button>

        <Button
          variant="contained"
          color="redcol"
          size="small"
          // startIcon={<DeleteIcon />}
          sx={{ color: "white" }}
          onClick={() => setopenDeleteDialog(true)}
        >
          {/* Delete Content */}
          <DeleteIcon sx={{ fontSize: "17px" }} />
        </Button>
      </Box>
      <TableContainer
        sx={{
          height: props.height ? props.height : `calc(100vh - ${315}px)`,
          mt: 2,
        }}
      >
        <DataGrid
          // loading={loading}
          components={{
            Pagination: CustomPagination,
            NoRowsOverlay: CustomNoRowsOverlay,
            LoadingOverlay: LinearProgress,
          }}
          pageSize={pageSize}
          rowsPerPageOptions={[5]}
          rows={tableData || []}
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

export default DynamicContent;