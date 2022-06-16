import {
  Box,
  Card,
  FormControl,
  MenuItem,
  Select,
  TableContainer,
  Typography,
} from "@mui/material";
import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

const Circular = () => {
  const rows = [
    {
      id: "CORPROA1",
      date: "22.04.2022",
      circular:
        "General Circular No.02/2022-Clarification of holding of Annual General Meeting (AGM) through Video Conference (VC) or Other Audio Visual Means (OAVM)-reg.",
      status: "Published",
    },
    {
      id: "CORPROA2",
      date: "22.04.2022",
      circular:
        "General Circular No.03/2022-Clarification on passing of Ordinary and Special resolutions by the companies under the Companies Act, 2013 read with rules made thereunder on account of COVID-19-Extention of timeline-reg.",
      status: "Published",
    },
    {
      id: "CORPROA3",
      date: "22.04.2022",
      circular:
        "General Circular No.03/2022-Clarification on passing of Ordinary and Special resolutions by the companies under the Companies Act, 2013 read with rules made thereunder on account of COVID-19-Extention of timeline-reg.",
      status: "Unpublished",
    },
    {
      id: "CORPROA4",
      date: "22.04.2022",
      circular:
        "General Circular No.03/2022-Clarification on passing of Ordinary and Special resolutions by the companies under the Companies Act, 2013 read with rules made thereunder on account of COVID-19-Extention of timeline-reg.",
      status: "Published",
    },
    {
      id: "CORPROA5",
      date: "22.04.2022",
      circular:
        "General Circular No.03/2022-Clarification on passing of Ordinary and Special resolutions by the companies under the Companies Act, 2013 read with rules made thereunder on account of COVID-19-Extention of timeline-reg.",
      status: "Published",
    },
  ];

  const columns = [
    {
      field: "date",
      headerName: "Date",
    },
    {
      field: "circular",
      headerName: "Circulars",
      flex: 1,
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
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
        </Card>
      </Box>
      <TableContainer
        sx={{
          height: `calc(100vh - ${200}px)`,
        }}
      >
        <DataGrid
          hideFooter
          rowsPerPageOptions={[]}
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

export default Circular;