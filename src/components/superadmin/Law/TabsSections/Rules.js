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
import AddRuleDialog from "./Rule/AddRuleDialog";
import { Delete, Edit } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditRuleDialog from "./Rule/EditRuleDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRule,
  fetchRules,
} from "../../../../redux/superAdminReducer/superAdminAction";
import DeleteRuleDialog from "./Rule/DeleteRuleDialog";
import AddSubRuleDialog from "./Rule/AddSubRuleDialog";
import EditSubRuleDialog from "./Rule/EditSubRuleDialog";
import DeleteSubRuleDialog from "./Rule/DeleteSubRuleDialog";

const options = ["Publish", "UnPublish"];
const ITEM_HEIGHT = 48;

const Rules = () => {
  const [openDialog, setopenDialog] = React.useState(false);
  const [openEditRuleDialog, setopenEditRuleDialog] = React.useState(false);
  const [openDeleteRuleDialog, setopenDeleteRuleDialog] = React.useState(false);
  const [openAddSubRuleDialog, setopenAddSubRuleDialog] = React.useState(false);
  const [openEditSubRuleDialog, setopenEditSubRuleDialog] =
    React.useState(false);
  const [openDeleteSubRuleDialog, setopenDeleteSubRuleDialog] =
    React.useState(false);
  const [rulesDetails, setrulesDetails] = React.useState([]);
  const [subruleDetails, setsubruleDetails] = React.useState([]);

  const [ruleId, setruleId] = React.useState("");
  const [subruleId, setsubruleId] = React.useState("");

  const [ruleName, setruleName] = React.useState("");
  const [clickedIndex, setClickedIndex] = React.useState(-1);

  const dispatch = useDispatch();
  const { rulesList } = useSelector((state) => state?.SuperAdmin);
  console.log(rulesList);

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
                {params?.row?.rule.rule_date?.toString().substring(0, 10) ||
                  new Date().toISOString().split("T")[0]}
              </Typography>
              <Collapse
                in={params?.row?.rule?._id === clickedIndex}
                sx={{ pt: 1 }}
              >
                {params?.row?.subRule?.map((item, index) => (
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
      field: "rule_name",
      headerName: "Rules",
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
                  setClickedIndex(params?.row?.rule?._id);
                }}
              >
                {params?.row?.rule?.rule_name}
              </Typography>
              <Collapse
                in={params?.row?.rule?._id === clickedIndex}
                sx={{ pt: 1 }}
              >
                {params?.row?.subRule?.map((item, index) => (
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
                      {item.sub_rule_name}
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
              <Tooltip title="Add subrule">
                <Typography
                  color="primary"
                  sx={{ pl: 1, cursor: "pointer" }}
                  onClick={() => {
                    setruleName(params?.row?.rule.rule_name);
                    setruleId(params?.row?.rule._id);
                    setopenAddSubRuleDialog(true);
                  }}
                >
                  <Add fontSize="small" />
                </Typography>
              </Tooltip>
              <Tooltip title="Edit rule">
                <Typography
                  color="primary"
                  onClick={() => {
                    setrulesDetails(params?.row.rule);
                    setopenEditRuleDialog(true);
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
                    setruleId(params?.row?.rule._id);
                    setopenDeleteRuleDialog(true);
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
              in={params?.row?.rule?._id === clickedIndex}
              sx={{ pt: 1 }}
            >
              {params?.row?.subRule?.map((item, index) => (
                <>
                  <Box sx={{ display: "flex" }}>
                    <Tooltip title="Delete sub-circular">
                      <Typography
                        color="primary"
                        sx={{ pl: 1, cursor: "pointer" }}
                        onClick={() => {
                          setsubruleId(item._id);
                          setopenDeleteSubRuleDialog(true);
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
                          setsubruleDetails(item);
                          setopenEditSubRuleDialog(true);
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
    dispatch(fetchRules());
  }, [
    openDialog,
    openEditRuleDialog,
    openDeleteRuleDialog,
    openAddSubRuleDialog,
    openEditSubRuleDialog,
    openDeleteSubRuleDialog,
  ]);

  return (
    <>
      <AddRuleDialog openDialog={openDialog} setOpenDialog={setopenDialog} />
      <AddSubRuleDialog
        ruleName={ruleName}
        ruleId={ruleId}
        openDialog={openAddSubRuleDialog}
        setOpenDialog={setopenAddSubRuleDialog}
      />

      {openEditSubRuleDialog && (
        <EditSubRuleDialog
          openDialog={openEditSubRuleDialog}
          setOpenDialog={setopenEditSubRuleDialog}
          subruleDetails={subruleDetails}
        />
      )}

      <DeleteSubRuleDialog
        openDialog={openDeleteSubRuleDialog}
        setOpenDialog={setopenDeleteSubRuleDialog}
        subruleId={subruleId}
      />

      <EditRuleDialog
        openDialog={openEditRuleDialog}
        setOpenDialog={setopenEditRuleDialog}
        rulesDetails={rulesDetails}
      />

      <DeleteRuleDialog
        openDialog={openDeleteRuleDialog}
        setOpenDialog={setopenDeleteRuleDialog}
        ruleId={ruleId}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          sx={{ mr: 2 }}
          onClick={() => setopenDialog(true)}
        >
          Add Rule
        </Button>
      </Box>
      <TableContainer
        sx={{
          height: `calc(100vh - ${250}px)`,
        }}
      >
        <DataGrid
          // hideFooter
          pageSize={6}
          rowsPerPageOptions={[5]}
          rows={rulesList || []}
          getRowId={(row) => row?.rule?._id}
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

export default Rules;
