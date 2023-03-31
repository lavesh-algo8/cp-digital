import React from "react";
import Layout from "../../../components/superadmin/Layout";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AdminsTable from "../../../components/superadmin/AdminsTable";
import AddAdminDialog from "../../../components/superadmin/AddAdminDialog";

import AddContentTypeDialog from "../../../components/superadmin/Law/AddContentTypeDialog/AddContentTypeDialog";



const ContentType = () => {
  const [value, setValue] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogAddContentType, setOpenDialogAddContentType] = React.useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Layout>
      <AddContentTypeDialog
          openDialog={openDialogAddContentType}
          setOpenDialog={setOpenDialogAddContentType}
        />

        <Box sx={{ maxHeight: "100vh" }}>
          <Grid container>
            <Grid
              item
              lg={2}
              md={2}
              xs={12}
              sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            >
              <Card square={true} sx={{ minHeight: "100vh" }}>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pr: 3,
                  }}
                >
                  <Typography
                    sx={{ py: 4, px: 2, fontWeight: "bold", fontSize: "17px" }}
                  >
                    ContentType
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      maxWidth: "30px",
                      minWidth: "30px",
                    }}
                    onClick={() => setOpenDialogAddContentType(true)}
                  >
                    <AddIcon fontSize="small" />
                  </Button>

                  
                </Box>
                <Box
                  sx={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: "83vh",
                  }}
                >
                  <Tabs
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: "#192A3A",
                        width: "6px",
                        borderRadius: "10px",
                      },
                    }}
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    sx={{
                      mt: 3,
                      borderRight: 1,
                      borderColor: "divider",
                      "& .MuiTab-root.Mui-selected": {
                        color: "#192A3A",
                      },
                    }}
                  >
                    <Tab
                      label="List of ContentTypes"
                      {...a11yProps(0)}
                      sx={{
                        textTransform: "none",
                        marginRight: "auto",
                        pl: 4,
                        fontWeight: "bold",
                        color: "#acafb7",
                      }}
                    />
                    
                  </Tabs>
                </Box>
              </Card>
            </Grid>
            <Grid item lg={10} md={10} xs={12}>
              <Card
                sx={{
                  marginTop: "100px",
                  mx: 3,
                  borderRadius: "10px",
                  height: `calc(100vh - ${120}px)`,
                }}
              >
                <TabPanel value={value} index={0}>
                  <Grid container>
                    <Grid item lg={2}>
                      <Typography variant="h6" fontWeight={600}>
                        ContentTypes
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg={10}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Box
                        sx={{
                          display: {
                            xs: "none",
                            md: "block",
                            lg: "block",
                            xl: "block",
                          },
                          mr: 3,
                        }}
                      >
                        <OutlinedInput
                          id="outlined-adornment-weight"
                          startAdornment={
                            <InputAdornment position="start">
                              <SearchIcon color="maincolor" />
                            </InputAdornment>
                          }
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            "aria-label": "weight",
                          }}
                          notched={false}
                          label="search"
                          size="small"
                          sx={{
                            background: "white",
                            width: "25ch",
                            height: "35px",
                          }}
                          placeholder="Search...."
                        />
                      </Box>
                      <Box>
                        <Button
                          variant="contained"
                          sx={{
                            height: "35px",
                            textTransform: "none",
                          }}
                          onClick={handleOpenDialog}
                        >
                          <AddIcon fontSize="12px" />
                          Add ContentType Items
                        </Button>
                        <AddAdminDialog
                          openDialog={openDialog}
                          setOpenDialog={setOpenDialog}
                        />
                      </Box>
                      <Box
                        sx={{
                          ml: 3,
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
                          <Typography sx={{ pl: 2, fontSize: "15px" }}>
                            Sort by
                          </Typography>
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
                              <MenuItem value="All">All</MenuItem>
                              <MenuItem value="By Date Enrolled">
                                Today
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Card>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
                    <AdminsTable />
                  </Box>
                </TabPanel>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default ContentType;
