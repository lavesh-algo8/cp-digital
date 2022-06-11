import { TableContainer, Typography } from "@mui/material";
import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

const AccountingStandards = () => {
  const rows = [
    {
      id: "CORPROA1",
      refno: "AS3",
      particular: "Disclosure of Accounting Policies",
      status: "Published",
    },
    {
      id: "CORPROA2",
      refno: "AS3",
      particular: "Disclosure of Accounting Policies",
      status: "Published",
    },
    {
      id: "CORPROA3",
      refno: "AS2",
      particular: "Disclosure of Accounting Policies",
      status: "Unpublished",
    },
    {
      id: "CORPROA4",
      refno: "AS4",
      particular: "Disclosure of Accounting Policies",
      status: "Published",
    },
    {
      id: "CORPROA5",
      refno: "AS3",
      particular: "Disclosure of Accounting Policies",
      status: "Published",
    },
  ];

  const columns = [
    {
      field: "refno",
      headerName: "Reference No",
    },
    {
      field: "particular",
      headerName: "Particulars",
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
          }}
        />
      </TableContainer>
    </>
  );
};

export default AccountingStandards;
