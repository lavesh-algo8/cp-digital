import React from "react";
import Layout from "../../components/superadmin/Layout";
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
import AdminsTable from "../../components/superadmin/AdminsTable";
import AddAdminDialog from "../../components/superadmin/AddAdminDialog";
import AddSubAdminDialog from "../../components/superadmin/AddSubAdminDialog";
import SubAdminsTable from "../../components/superadmin/SubAdminsTable";

const Admins = () => {
  const [value, setValue] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);

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
                <Typography sx={{ p: 4, fontWeight: "bold", fontSize: "20px" }}>
                  Peoples
                </Typography>
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
                    label="List of admins"
                    {...a11yProps(0)}
                    sx={{
                      textTransform: "none",
                      marginRight: "auto",
                      pl: 4,
                      fontWeight: "bold",
                      color: "#acafb7",
                    }}
                  />
                  <Tab
                    label="List of sub-admins"
                    {...a11yProps(1)}
                    sx={{
                      textTransform: "none",
                      marginRight: "auto",
                      pl: 4,
                      mt: 1,
                      fontWeight: "bold",
                      color: "#acafb7",
                    }}
                  />
                </Tabs>
              </Card>
            </Grid>
            <Grid item lg={10} md={10} xs={12}>
              <Card
                sx={{
                  marginTop: "100px",
                  mx: 3,
                  borderRadius: "10px",
                }}
              >
                <TabPanel value={value} index={0}>
                  <Grid container>
                    <Grid item lg={2}>
                      <Typography variant="h6" fontWeight={600}>
                        List of Admins
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
                          Add Admins
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
                <TabPanel value={value} index={1}>
                  <Grid container>
                    <Grid item lg={3}>
                      <Typography variant="h6" fontWeight={600}>
                        List of Sub-admins
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg={9}
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
                          Add sub-admins
                        </Button>
                        <AddSubAdminDialog
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
                  <Box sx={{ width: "100%", overflow: "scroll", mt: 4 }}>
                    <SubAdminsTable />
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

export default Admins;
