import { Button, Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import Layout from "../../../components/superadmin/Layout";
import DocumentTables from "../../../components/superadmin/DocumentGenerator/DocumentTables";
import AddDocument from "../../../components/superadmin/DocumentGenerator/AddDocument";

function DocumentGenerator() {
  const [openDialogAdd, setOpenDialogAdd] = useState(false);

  return (
    <Layout>
      <Box sx={{ maxHeight: "100vh" }}>
        <Card
          sx={{
            marginTop: "100px",
            mx: 3,
            borderRadius: "10px",
            height: `calc(100vh - ${120}px)`,
          }}
        >
          <Grid
            container
            item
            xs={12}
            sx={{
              backgroundColor: "white",
              p: 6,
            }}
          >
            <Grid container item xs={12} sx={{ mb: 2 }}>
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

            <Grid container item xs={12}>
              <DocumentTables />
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Layout>
  );
}

export default DocumentGenerator;
