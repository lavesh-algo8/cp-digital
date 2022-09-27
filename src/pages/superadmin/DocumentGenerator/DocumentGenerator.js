import {
  Button,
  Card,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";

import AddAdminDialog from "../../../components/superadmin/AddAdminDialog";
import Layout from "../../../components/superadmin/Layout";
import DocumentTables from "../../../components/superadmin/DocumentGenerator/DocumentTables";
import AddDocument from "../../../components/superadmin/DocumentGenerator/AddDocument";
import UploadDocument from "../../../components/superadmin/DocumentGenerator/UploadDocument";

function DocumentGenerator() {
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [openDialogUpload, setOpenDialogUpload] = useState(false);

  return (
    <Layout>
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: "100px",
          position: "relative",
          zIndex: "12",
          borderRadius: "10px",
          // height: "180vh",
          overflowY: "scroll",
          p: 6,
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
          <Grid container item xs={12}>
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
              {/* <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                    lg: "block",
                    xl: "block",
                  },
                  mr: 3,
                }}
              ></Box> */}
              <Box
                sx={{
                  mr: 3,
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#192A3A",
                    color: "white",
                    height: "35px",
                  }}
                >
                  <Typography sx={{ pl: 2, fontSize: "15px" }}>Law</Typography>
                  <FormControl sx={{ minWidth: 60 }}>
                    <Select
                      size="small"
                      color="whitecol"
                      defaultValue="All"
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
                      {["Law 1", "Law 2", "Law 3"].map((label, index) => (
                        <MenuItem value={label}>{label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Card>
              </Box>
              <Box
                sx={{
                  mr: 3,
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#192A3A",
                    color: "white",
                    height: "35px",
                  }}
                >
                  <Typography sx={{ pl: 2, fontSize: "15px" }}>Act</Typography>
                  <FormControl sx={{ minWidth: 60 }}>
                    <Select
                      size="small"
                      color="whitecol"
                      defaultValue="All"
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
                      {["Act 1", "Act 2", "Act 3"].map((label, index) => (
                        <MenuItem value={label}>{label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Card>
              </Box>
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
                  }}
                  onClick={() => setOpenDialogAdd(true)}
                >
                  <AddIcon fontSize="12px" sx={{ mr: 1 }} />
                  Add
                </Button>
                <AddDocument
                  openDialog={openDialogAdd}
                  setOpenDialog={setOpenDialogAdd}
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    height: "35px",
                    textTransform: "none",
                  }}
                  onClick={() => setOpenDialogUpload(true)}
                >
                  <UploadIcon fontSize="12px" sx={{ mr: 1 }} />
                  Upload
                </Button>
                <UploadDocument
                  openDialog={openDialogUpload}
                  setOpenDialog={setOpenDialogUpload}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <DocumentTables />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default DocumentGenerator;