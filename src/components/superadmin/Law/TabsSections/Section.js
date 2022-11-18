import {
  Box,
  Button,
  Card,
  Collapse,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Select,
  TableContainer,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
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

const options = ["Publish", "UnPublish"];

const ITEM_HEIGHT = 48;

const Section = () => {
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
                      onClick={() =>
                        navigate(
                          `${pathname}/${item.sub_section_name}/${item._id}`
                        )
                      }
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      {item.sub_section_name}
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

        {/* <Card
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#192A3A",
            color: "white",
            height: "35px",
          }}
        >
          <Typography sx={{ pr: 8, pl: 2 }}>Chapter (rules)</Typography>
          <FormControl sx={{ minWidth: 60 }}>
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
              <MenuItem value="Day Pushlished">Day Published</MenuItem>
            </Select>
          </FormControl>
        </Card>
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#192A3A",
            color: "white",
            height: "35px",
            ml: 2,
          }}
        >
          <Typography sx={{ pr: 4, pl: 2 }}>Date</Typography>
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
          getRowHeight={() => "auto"}
          // hideFooter
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
