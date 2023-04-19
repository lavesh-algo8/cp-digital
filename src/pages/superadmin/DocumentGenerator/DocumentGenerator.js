import { Button, Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import Layout from "../../../components/superadmin/Layout";
import DocumentTables from "../../../components/superadmin/DocumentGenerator/DocumentTables";
import AddDocument from "../../../components/superadmin/DocumentGenerator/AddDocument";
import Generator from "../Generator/Generator";

function DocumentGenerator() {
  const [openDialogAdd, setOpenDialogAdd] = useState(false);

  return (
    <Generator>
      <Box sx={{ width: "100%", p: 3 }}>
        <Grid container>
          <Grid item xs={12} lg={3}>
            <Typography variant="h6" fontWeight={600}>
              Document Generator
            </Typography>
          </Grid>
          <Grid
            item
            lg={9}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Box
              sx={{
                mr: 3,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  height: "35px",
                  textTransform: "none",
                  px: 3,
                }}
                onClick={() => setOpenDialogAdd(true)}
              >
                <AddIcon fontSize="12px" sx={{ mr: 2 }} />
                Add
              </Button>
              {openDialogAdd && (
                <AddDocument
                  openDialog={openDialogAdd}
                  setOpenDialog={setOpenDialogAdd}
                />
              )}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
          <DocumentTables />
        </Box>
      </Box>
    </Generator>
  );
}

export default DocumentGenerator;
