import {
  Box,
  Button,
  Card,
  Collapse,
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
import React, { useEffect } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SectionAddDialog from "./SectionAddDialog/SectionAddDialog";
import SubSectionAddDialog from "./SectionAddDialog/SubSectionAddDialog";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchSections } from "../../../../redux/superAdminReducer/superAdminAction";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit, VpnKey } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import SectionDeleteDialog from "./SectionDeleteDialog/SectionDeleteDialog";
import SubSectionDeleteDialog from "./SectionDeleteDialog/SubSectionDeleteDialog";
import SectionEditDialog from "./SectionEditDialog/SectionEditDialog";
import SubSectionEditDialog from "./SectionEditDialog/SubSectionEditDialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

const Section = () => {
  const [pageSize, setPageSize] = React.useState(6);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { sectionsList } = useSelector((state) => state?.SuperAdmin);

  const [sectionname, setsectionname] = React.useState("");
  const [sectionno, setsectionno] = React.useState("");
  const [sectionId, setsectionId] = React.useState("");
  const [sectionDetails, setsectionDetails] = React.useState({});
  const [subsectionDetails, setsubsectionDetails] = React.useState({});
  const [subsectionId, setsubsectionId] = React.useState("");
  const [sectionAddDialog, setsectionAddDialog] = React.useState(false);
  const [subSectionAddDialog, setsubSectionAddDialog] = React.useState(false);
  const [sectionDeleteDialog, setsectionDeleteDialog] = React.useState(false);
  const [subsectionDeleteDialog, setsubsectionDeleteDialog] =
    React.useState(false);
  const [sectionEditDialog, setsectionEditDialog] = React.useState(false);
  const [subsectionEditDialog, setsubsectionEditDialog] = React.useState(false);

  const [subSectionLength, setsubSectionLength] = React.useState(false);

  const [clickedIndex, setClickedIndex] = React.useState(-1);

  const params = useParams();

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

  useEffect(() => {
    console.log(params.chapterid);
    dispatch(fetchSections(params.chapterid));
  }, [
    sectionAddDialog,
    subSectionAddDialog,
    sectionDeleteDialog,
    subsectionDeleteDialog,
    sectionEditDialog,
    subsectionEditDialog,
  ]);

  const columns = [
    {
      field: "section.createdAt",
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
                {params?.row?.section?.createdAt?.toString().substring(0, 10) ||
                  new Date().toISOString().split("T")[0]}
              </Typography>
              <Collapse
                in={params?.row?.section?._id === clickedIndex}
                sx={{ pt: 1 }}
              >
                {params?.row?.sub_sections?.map((item, index) => (
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
      field: "section.section_name",
      headerName: "Sections",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setClickedIndex(params?.row?.section?._id);
                }}
              >
                {params?.row?.section?.section_name}
              </Typography>
              <Collapse
                in={params?.row?.section?._id === clickedIndex}
                sx={{ pt: 1 }}
              >
                {params?.row?.sub_sections?.map((item, index) => (
                  <>
                    <Box
                      // onClick={() =>
                      //   navigate(
                      //     `${pathname}/${item.sub_regulation_no}/${item._id}`
                      //   )
                      // }
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      {item.sub_regulation_no || <Typography>.....</Typography>}
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
              <Tooltip title="Add subsection">
                <Typography
                  color="primary"
                  sx={{ pl: 1, cursor: "pointer" }}
                  onClick={() => {
                    setsectionname(params?.row?.section?.section_name);
                    setsectionId(params?.row?.section?._id);
                    setsubSectionAddDialog(true);
                    setsubSectionLength(params?.row?.sub_sections?.length);
                    setsectionno(params?.row?.section?.section_no);
                    setsectionDetails(params?.row?.section);
                  }}
                >
                  <Add fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Edit section">
                <Typography
                  color="primary"
                  onClick={() => {
                    setsectionDetails(params?.row?.section);
                    setsectionEditDialog(true);
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
                    setsectionId(params?.row?.section?._id);
                    setsectionDeleteDialog(true);
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
              in={params?.row?.section?._id === clickedIndex}
              sx={{ pt: 1 }}
            >
              {params?.row?.sub_sections?.map((item, index) => (
                <>
                  <Box sx={{ display: "flex" }}>
                    <Tooltip title="Delete sub-section">
                      <Typography
                        color="primary"
                        sx={{ pl: 1, cursor: "pointer" }}
                        onClick={() => {
                          setsubsectionId(item._id);
                          setsubsectionDeleteDialog(true);
                        }}
                      >
                        <Delete fontSize="small" />
                      </Typography>
                    </Tooltip>
                    <Tooltip title="Edit sub-section">
                      <Typography
                        color="primary"
                        sx={{ pl: 1, cursor: "pointer" }}
                        onClick={() => {
                          setsubsectionDetails(item);
                          setsubsectionEditDialog(true);
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

  return (
    <>
      <SectionAddDialog
        openDialog={sectionAddDialog}
        setOpenDialog={setsectionAddDialog}
        chapterid={params.chapterid}
      />
      <SubSectionAddDialog
        openDialog={subSectionAddDialog}
        setOpenDialog={setsubSectionAddDialog}
        sectionId={sectionId}
        sectionname={sectionname}
        subSectionLength={subSectionLength}
        sectionno={sectionno}
        sectionDetails={sectionDetails}
      />
      <SectionDeleteDialog
        openDialog={sectionDeleteDialog}
        setOpenDialog={setsectionDeleteDialog}
        sectionId={sectionId}
      />
      <SubSectionDeleteDialog
        openDialog={subsectionDeleteDialog}
        setOpenDialog={setsubsectionDeleteDialog}
        subsectionId={subsectionId}
      />
      <SectionEditDialog
        openDialog={sectionEditDialog}
        setOpenDialog={setsectionEditDialog}
        sectionDetails={sectionDetails}
      />
      <SubSectionEditDialog
        openDialog={subsectionEditDialog}
        setOpenDialog={setsubsectionEditDialog}
        subsectionDetails={subsectionDetails}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          // sx={{ mr: 2 }}
          onClick={() => setsectionAddDialog(true)}
        >
          Add Section
        </Button>
      </Box>
      <TableContainer
        sx={{
          height: `calc(100vh - ${265}px)`,
          mt: 2,
        }}
      >
        <DataGrid
          getRowHeight={() => "auto"}
          components={{
            Pagination: CustomPagination,
            NoRowsOverlay: CustomNoRowsOverlay,
            LoadingOverlay: LinearProgress,
          }}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row?.section?._id}
          rows={sectionsList || []}
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
    </>
  );
};

export default Section;
