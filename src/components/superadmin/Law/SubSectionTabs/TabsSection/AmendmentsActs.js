import {
  Box,
  Button,
  Card,
  FormControl,
  MenuItem,
  Select,
  TableContainer,
  Typography,
} from "@mui/material";
import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AddDialog from "../../AddDialogCommon/AddDialog";
import AddIcon from "@mui/icons-material/Add";

const AmendmentsActs = () => {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setopenDialog] = React.useState(false);

  const handleOpenSection = () => {
    setOpen(true);
  };
  const rows = [
    {
      id: "CORPROA1",
      date: "22.04.2022",
      particular: "S.O. 1303(E)-Commencement notification dated 24.03.2021",
      status: "Published",
    },
    {
      id: "CORPROA2",
      date: "22.04.2022",
      particular: "S.O. 1303(E)-Commencement notification dated 24.03.2021",
      status: "Published",
    },
    {
      id: "CORPROA3",
      date: "22.04.2022",
      particular: "S.O. 1303(E)-Commencement notification dated 24.03.2021",
      status: "Unpublished",
    },
    {
      id: "CORPROA4",
      date: "22.04.2022",
      particular: "S.O. 1303(E)-Commencement notification dated 24.03.2021",
      status: "Published",
    },
    {
      id: "CORPROA5",
      date: "22.04.2022",
      particular: "S.O. 1303(E)-Commencement notification dated 24.03.2021",
      status: "Published",
    },
  ];

  const columns = [
    {
      field: "date",
      headerName: "Date",
    },
    {
      field: "particular",
      headerName: "Particulars",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              cursor: "pointer",
            }}
            onClick={handleOpenSection}
          >
            {params.row.particular}
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

  return (
    <>
      <AddDialog
        openDialog={openDialog}
        setopenDialog={setopenDialog}
        name="Amendment Act"
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          sx={{ mr: 2 }}
          onClick={() => setopenDialog(true)}
        >
          Add Amendment Act
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
          <Typography sx={{ pr: 4, pl: 2 }}>Year</Typography>
          <FormControl>
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
        </Card>
      </Box>
      <TableContainer
        sx={{
          height: `calc(100vh - ${250}px)`,
        }}
      >
        <DataGrid
          pageSize={5}
          rowsPerPageOptions={[5]}
          rows={rows}
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
              py: "8px",
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

export default AmendmentsActs;
