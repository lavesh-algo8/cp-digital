import {
  Box,
  Button,
  Card,
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
import AddDialog from "../../AddDialogCommon/AddDialog";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Delete, Edit } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { fetchRulesBySubSection } from "../../../../../redux/superAdminReducer/superAdminAction";
import { useParams } from "react-router-dom";

const options = ["Publish", "UnPublish"];
const ITEM_HEIGHT = 48;

const Rules = () => {
  const [openDialog, setopenDialog] = React.useState(false);

  // menu action
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const params = useParams();
  const { rulesListBySubSections } = useSelector((state) => state?.SuperAdmin);

  const columns = [
    {
      field: "rule_date",
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
                {params?.row?.rule_date?.toString().substring(0, 10) ||
                  new Date().toISOString().split("T")[0]}
              </Typography>
            </Box>
          </>
        );
      },
    },
    {
      field: "rule_name",
      headerName: "Rules",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              cursor: "pointer",
            }}
          >
            {params.row.rule_name}
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
              {/* <Tooltip title="Edit rule">
                <Typography
                  color="primary"
                  onClick={() => {
                    // setrulesDetails(params?.row);
                    // setopenEditRuleDialog(true);
                  }}
                  sx={{ pl: 1, cursor: "pointer" }}
                >
                  <Edit fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Delete rule">
                <Typography
                  color="primary"
                  sx={{ pl: 1, cursor: "pointer" }}
                  onClick={() => {
                    // setruleName(params?.row?.rule_name);
                    // setopenDeleteRuleDialog(true);
                  }}
                >
                  <Delete fontSize="small" />
                </Typography>
              </Tooltip> */}
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
    dispatch(fetchRulesBySubSection(params.subsectionid));
  }, [params]);

  return (
    <>
      <AddDialog
        openDialog={openDialog}
        setopenDialog={setopenDialog}
        name="Rule"
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {/* <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          sx={{ mr: 2 }}
          onClick={() => setopenDialog(true)}
        >
          Add Rule
        </Button> */}
      </Box>
      <TableContainer
        sx={{
          height: `calc(100vh - ${220}px)`,
        }}
      >
        <DataGrid
          pageSize={5}
          rowsPerPageOptions={[5]}
          rows={rulesListBySubSections || []}
          getRowId={(row) => row?._id}
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

export default Rules;
