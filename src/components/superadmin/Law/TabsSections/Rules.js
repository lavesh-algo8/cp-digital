import { TableContainer, Typography } from "@mui/material";
import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

const Rules = () => {
  const rows = [
    {
      id: "CORPROA1",
      date: "22.04.2022",
      rules:
        "Chapter I The Companies (Specification of Definitions Details) Rules, 2014",
      rule: "1 to 4",
      status: "Published",
    },
    {
      id: "CORPROA2",
      date: "22.04.2022",
      rules:
        "Chapter I The Companies (Specification of Definitions Details) Rules, 2014",
      rule: "1 to 4",
      status: "Published",
    },
    {
      id: "CORPROA3",
      date: "22.04.2022",
      rules:
        "Chapter I The Companies (Specification of Definitions Details) Rules, 2014",
      rule: "1 to 4",
      status: "Unpublished",
    },
    {
      id: "CORPROA4",
      date: "22.04.2022",
      rules:
        "Chapter I The Companies (Specification of Definitions Details) Rules, 2014",
      rule: "1 to 4",
      status: "Published",
    },
    {
      id: "CORPROA5",
      date: "22.04.2022",
      rules:
        "Chapter I The Companies (Specification of Definitions Details) Rules, 2014",
      rule: "1 to 4",
      status: "Published",
    },
  ];

  const columns = [
    {
      field: "date",
      headerName: "Date",
    },
    {
      field: "rules",
      headerName: "Rules",
      flex: 1,
    },
    {
      field: "rule",
      headerName: "Rule",
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
          }}
        />
      </TableContainer>
    </>
  );
};

export default Rules;
