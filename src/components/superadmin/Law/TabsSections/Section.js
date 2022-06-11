import { Button, TableContainer, Typography } from "@mui/material";
import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import TableDialog from "./DialogShow/TableDialog";

const Section = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpenSection = () => {
    setOpen(true);
  };

  const rows = [
    {
      id: "CORPROA1",
      date: "22.04.2022",
      section: "1. Short Title, Extent, Commencement and Applications",
      status: "Published",
    },
    {
      id: "CORPROA2",
      date: "22.04.2022",
      section: "1. Short Title, Extent, Commencement and Applications",
      status: "Published",
    },
    {
      id: "CORPROA3",
      date: "22.04.2022",
      section: "1. Short Title, Extent, Commencement and Applications",
      status: "Unpublished",
    },
    {
      id: "CORPROA4",
      date: "22.04.2022",
      section: "1. Short Title, Extent, Commencement and Applications",
      status: "Published",
    },
    {
      id: "CORPROA5",
      date: "22.04.2022",
      section: "1. Short Title, Extent, Commencement and Applications",
      status: "Published",
    },
  ];

  const columns = [
    {
      field: "date",
      headerName: "Date",
    },
    {
      field: "section",
      headerName: "Sections",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              cursor: "pointer",
            }}
            onClick={handleOpenSection}
          >
            {params.row.section}
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
      <TableDialog open={open} close={() => setOpen(false)} />
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

export default Section;
