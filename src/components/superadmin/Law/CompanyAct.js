import {
  Button,
  Card,
  FormControl,
  MenuItem,
  Select,
  TableContainer,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import TableDialog from "../../../components/superadmin/Law/TabsSections/DialogShow/TableDialog";
import AddChapterDialog from "./AddChapterDialog/AddChapterDialog";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchChapters } from "../../../redux/superAdminReducer/superAdminAction";
import { useDispatch, useSelector } from "react-redux";

const CompanyAct = () => {
  const dispatch = useDispatch();
  const { chapterList } = useSelector((state) => state?.SuperAdmin);

  const navigate = useNavigate();
  const [openDialogAddChapter, setOpenDialogAddChapter] = useState(false);
  const { pathname } = useLocation();
  const params = useParams();
  console.log(params.act);

  const handleOpenSection = (chapter) => {
    navigate(`${pathname}/${chapter}`);
  };

  const columns = [
    {
      field: "date",
      headerName: "Date",
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
            onClick={() => handleOpenSection(params.row.chapter)}
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
      getActions: (params) => [
        <GridActionsCellItem label="Pulish" showInMenu />,
        <GridActionsCellItem
          //   icon={<MoreVertIcon />}
          label="UnPulish"
          showInMenu
        />,
      ],
    },
  ];

  useEffect(() => {
    dispatch(fetchChapters(params.act));
  }, [params.act, openDialogAddChapter]);

  if (params.act === undefined) {
    return (
      <>
        <Box sx={{ width: "100%", p: 5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: `calc(100vh - ${200}px)`,
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

      <Box sx={{ width: "100%", p: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6">{params.act}</Typography>
          <Box sx={{ display: "flex" }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialogAddChapter(true)}
            >
              Add Chapter
            </Button>
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
              <Typography sx={{ pr: 2, pl: 2 }}>Sort</Typography>
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
                  <MenuItem value="Name">All</MenuItem>
                  <MenuItem value="Day Pushlished">Day </MenuItem>
                </Select>
              </FormControl>
            </Card>
          </Box>
        </Box>
        <TableContainer
          sx={{
            height: `calc(100vh - ${250}px)`,
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
