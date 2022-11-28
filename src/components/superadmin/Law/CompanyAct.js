import {
  Button,
  Card,
  FormControl,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Pagination,
  Select,
  TableContainer,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridActionsCellItem,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import TableDialog from "../../../components/superadmin/Law/TabsSections/DialogShow/TableDialog";
import AddChapterDialog from "./AddChapterDialog/AddChapterDialog";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchChapters } from "../../../redux/superAdminReducer/superAdminAction";
import { useDispatch, useSelector } from "react-redux";
import { Block, Delete, Edit } from "@mui/icons-material";
import EditChapterDialog from "./EditChapterDialog/EditChapterDialog";
import DeleteChapterDialog from "./DeleteChapterDialog/DeleteChapterDialog";
import DeleteActDialog from "./AddActDialog/DeleteActDialog";
import EditActDialog from "./AddActDialog/EditActDialog";
import { styled } from "@mui/material/styles";

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

const CompanyAct = () => {
  const dispatch = useDispatch();
  const { chapterList, loading } = useSelector((state) => state?.SuperAdmin);

  // menu action
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const [pageSize, setPageSize] = React.useState(6);
  const [openDialogAddChapter, setOpenDialogAddChapter] = useState(false);
  const [openDialogEditChapter, setOpenDialogEditChapter] = useState(false);
  const [openDialogDeleteChapter, setOpenDialogDeleteChapter] = useState(false);
  const [openDialogActChapter, setOpenDialogActChapter] = useState(false);
  const [openDialogDeleteAct, setopenDialogDeleteAct] = useState(false);
  const [openDialogEditAct, setopenDialogEditAct] = useState(false);

  const [chapterData, setchapterData] = useState(false);
  const { pathname } = useLocation();
  const params = useParams();
  console.log(params.act);

  const handleOpenSection = (row) => {
    // alert(row._id);
    navigate(`${pathname}/${row.chapter}/${row._id}`);
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
          <Typography>
            {params?.row?.createdAt?.toString().substring(0, 10) ||
              new Date().toISOString().split("T")[0]}
          </Typography>
        );
      },
    },
    {
      field: "chapter",
      headerName: "Chapters",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              cursor: "pointer",
            }}
            onClick={() => handleOpenSection(params.row)}
          >
            {params.row.chapter}
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
              <Tooltip title="Edit chapter">
                <Typography
                  color="primary"
                  onClick={() => {
                    setchapterData(params?.row);
                    setOpenDialogEditChapter(true);
                  }}
                  sx={{ pl: 1, cursor: "pointer" }}
                >
                  <Edit fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Delete chapter">
                <Typography
                  color="primary"
                  sx={{ pl: 1, cursor: "pointer" }}
                  onClick={() => {
                    setchapterData(params?.row);
                    setOpenDialogDeleteChapter(true);
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
    dispatch(fetchChapters(params.actid));
  }, [
    params.act,
    openDialogAddChapter,
    openDialogEditChapter,
    openDialogDeleteChapter,
  ]);

  if (params.act === undefined) {
    return (
      <>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: `calc(100vh - ${217}px)`,
            }}
          >
            <Typography variant="h6" align="center" sx={{ color: "#21415F" }}>
              Please Select Law First
              <br /> From Side Menu
            </Typography>

            <Typography variant="h6">{params.act}</Typography>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      {/* add chapter dialog */}
      <AddChapterDialog
        openDialog={openDialogAddChapter}
        setOpenDialog={setOpenDialogAddChapter}
        actid={params.actid}
      />
      {/* add chapter dialog */}

      {/* edit chapter dialog */}
      <EditChapterDialog
        openDialog={openDialogEditChapter}
        setOpenDialog={setOpenDialogEditChapter}
        actid={params.actid}
        chapterData={chapterData}
      />
      {/* edit chapter dialog */}

      {/* delete chapter dialog */}
      <DeleteChapterDialog
        openDialog={openDialogDeleteChapter}
        setOpenDialog={setOpenDialogDeleteChapter}
        chapterData={chapterData}
      />
      {/* delete chapter dialog */}

      {/* delete act dialog */}
      <DeleteActDialog
        openDialog={openDialogDeleteAct}
        setOpenDialog={setopenDialogDeleteAct}
        actid={params.actid}
      />
      {/* delete act dialog */}

      {/* edit act dialog */}
      <EditActDialog
        openDialog={openDialogEditAct}
        setOpenDialog={setopenDialogEditAct}
        actid={params.actid}
        act={params.act}
      />
      {/* edit act dialog */}
      {/* <Button
        variant="outlined"
        sx={{
          color: "red",
          textTransform: "none",
          position: "relative",
          float: "right",
          margin: 0.3,
        }}
        color="inherit"
        // startIcon={<Delete />}
        onClick={() => setopenDialogDeleteAct(true)}
      >
        <Delete />
      </Button> */}

      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              width: "50%",
              height: "45px",
              fontSize: params?.act?.length >= 49 ? "15px" : "17px",
              overflowY: "scroll",
            }}
          >
            {params.act.slice(0, 80)}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialogAddChapter(true)}
              sx={{ mr: 2 }}
            >
              Add Chapter
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "red", textTransform: "none" }}
              color="inherit"
              startIcon={<Delete />}
              onClick={() => setopenDialogDeleteAct(true)}
            >
              Delete Act
            </Button>
            <Button
              variant="outlined"
              sx={{ ml: 2, textTransform: "none" }}
              color="info"
              startIcon={<Edit />}
              onClick={() => setopenDialogEditAct(true)}
            >
              Edit Act Name
            </Button>
          </Box>
        </Box>
        <TableContainer
          sx={{
            height: `calc(100vh - ${265}px)`,
            mt: 2,
          }}
        >
          <DataGrid
            loading={loading}
            pageSize={pageSize}
            getRowId={(row) => row?._id}
            rows={chapterList || []}
            columns={columns}
            disableSelectionOnClick
            components={{
              Pagination: CustomPagination,
              NoRowsOverlay: CustomNoRowsOverlay,
              LoadingOverlay: LinearProgress,
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
      </Box>
    </>
  );
};

export default CompanyAct;
