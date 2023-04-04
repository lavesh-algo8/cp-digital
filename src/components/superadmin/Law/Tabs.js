import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Section from "./TabsSections/Section";
import Rules from "./TabsSections/Rules";
import Notifications from "./TabsSections/Notifications";
import Circular from "./TabsSections/Circular";
import Forms from "./TabsSections/Forms";
import AccountingStandards from "./TabsSections/AccountingStandards";
import AmendmentsActs from "./TabsSections/AmendmentsActs";
import Article from "./TabsSections/Article";
import News from "./TabsSections/News";
import Presentation from "./TabsSections/Presentation";
import { useDispatch, useSelector } from "react-redux";
import DynamicContent from "../DynamicTabs/DynamicContent";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const { contenttypeList = [] } = useSelector((state) => state?.SuperAdmin);
  const dynamicTabsName = contenttypeList.map((value) => value.contenttype);
  const [openDialogAddContentType, setOpenDialogAddContentType] =
    React.useState(false);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          // justifyContent: "space-between",
          background: "#eaeaea",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          // variant="fullWidth"
          sx={{
            background: "#eaeaea",
          }}
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
        >
          {[
            "Sections",
            "Rules",
            "Notifications",
            "Circulars",
            "Articles",
            "News",
            "Presentations",
            ...dynamicTabsName,
            // "Forms",
            // "Secretarial Standards",
            // "Accounting Standards",
            // "Case Laws",
            // "Amendments Acts",
          ].map((label, index) => (
            <Tab
              key={index}
              label={label}
              {...a11yProps(index)}
              sx={{
                "&.Mui-selected": {
                  background: "white",
                  borderRadius: "10px",
                },
                textTransform: "none",
              }}
            />
          ))}
        </Tabs>
        <Box sx={{ mx: 2 }}>
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
      </Box>
      <TabPanel value={value} index={0}>
        <Section />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Rules />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Notifications />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Circular />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Article />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <News />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Presentation />
      </TabPanel>
      {contenttypeList.map((item, index) => (
        <TabPanel value={value} index={index + 7} key={index + 5}>
          <DynamicContent
            contenttype={item.contenttype}
            height={`calc(100vh - ${265}px)`}
            value={value}
            setValue={setValue}
          />
        </TabPanel>
      ))}
      {/* <TabPanel value={value} index={7}>
        <Forms />
      </TabPanel>
      <TabPanel value={value} index={8}>
        Secretarial Standards
      </TabPanel>
      <TabPanel value={value} index={9}>
        <AccountingStandards />
      </TabPanel>
      <TabPanel value={value} index={10}>
        Case Laws
      </TabPanel> */}
      {/* <TabPanel value={value} index={11}>
        <AmendmentsActs />
      </TabPanel> */}
    </Box>
  );
}
