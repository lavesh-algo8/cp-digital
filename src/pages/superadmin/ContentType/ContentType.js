import React, { useEffect, useState } from "react";
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

import AddContentTypeDialog from "../../../components/superadmin/Law/AddContentTypeDialog/AddContentTypeDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategory,
  fetchContentType,
  getDataTree,
} from "../../../redux/superAdminReducer/superAdminAction";
import DynamicContent from "../../../components/superadmin/DynamicTabs/DynamicContent";

const ContentType = () => {
  const { contenttypeList = [] } = useSelector((state) => state?.SuperAdmin);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);

  const [value, setValue] = React.useState(0);
  const [openDialogAddContentType, setOpenDialogAddContentType] =
    React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabChange = (event, value) => {
    setSelectedTab(value);
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

  function TabPanelContent(props) {
    const { children, value, index } = props;

    return (
      <div hidden={value !== index}>
        {value === index && <Typography>{children}</Typography>}
      </div>
    );
  }

  useEffect(() => {
    dispatch(fetchContentType());
    dispatch(fetchAllCategory());
    dispatch(getDataTree());
  }, []);

  return (
    <>
      <Layout>
        {openDialogAddContentType && (
          <AddContentTypeDialog
            openDialog={openDialogAddContentType}
            setOpenDialog={setOpenDialogAddContentType}
          />
        )}

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
                    <Grid item>
                      <Typography variant="h6" fontWeight={600}>
                        ContentTypes
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ width: "100%", overflow: "hidden", mt: 2 }}>
                    <Tabs value={selectedTab} onChange={handleTabChange}>
                      {contenttypeList.map((item) => (
                        <Tab key={item._id} label={item.contenttype} />
                      ))}
                    </Tabs>
                    {contenttypeList.map((item, index) => (
                      <TabPanelContent
                        value={selectedTab}
                        index={index}
                        key={index}
                      >
                        <DynamicContent contenttype={item.contenttype} />
                      </TabPanelContent>
                    ))}
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
