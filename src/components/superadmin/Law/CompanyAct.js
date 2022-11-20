import {
  Button,
  Card,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Select,
  TableContainer,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import TableDialog from "../../../components/superadmin/Law/TabsSections/DialogShow/TableDialog";
import AddChapterDialog from "./AddChapterDialog/AddChapterDialog";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { fetchChapters } from "../../../redux/superAdminReducer/superAdminAction";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit } from "@mui/icons-material";
import EditChapterDialog from "./EditChapterDialog/EditChapterDialog";
import DeleteChapterDialog from "./DeleteChapterDialog/DeleteChapterDialog";
import DeleteActDialog from "./AddActDialog/DeleteActDialog";
import EditActDialog from "./AddActDialog/EditActDialog";

const options = ["Publish", "UnPublish"];
const ITEM_HEIGHT = 48;

const CompanyAct = () => {
  const dispatch = useDispatch();
  const { chapterList } = useSelector((state) => state?.SuperAdmin);

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
          <Typography variant="h6">{params.act}</Typography>
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
            // hideFooter
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row?._id}
            rows={chapterList || []}
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
      </Box>
    </>
  );
};

export default CompanyAct;
