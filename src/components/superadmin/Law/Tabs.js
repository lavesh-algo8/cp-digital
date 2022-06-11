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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          // variant="fullWidth"
          sx={{
            background: "#F5F5F5",
          }}
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
        >
          <Tab
            label="Sections"
            {...a11yProps(0)}
            sx={{
              "&.Mui-selected": {
                background: "white",
                borderRadius: "10px",
              },
            }}
          />
          <Tab
            label="Rules"
            {...a11yProps(1)}
            sx={{
              "&.Mui-selected": {
                background: "white",
                borderRadius: "10px",
              },
            }}
          />
          <Tab
            label="Notifications"
            {...a11yProps(2)}
            sx={{
              "&.Mui-selected": {
                background: "white",
                borderRadius: "10px",
              },
            }}
          />
          <Tab
            label="Circulars"
            {...a11yProps(3)}
            sx={{
              "&.Mui-selected": {
                background: "white",
                borderRadius: "10px",
              },
            }}
          />
          <Tab
            label="Forms"
            {...a11yProps(4)}
            sx={{
              "&.Mui-selected": {
                background: "white",
                borderRadius: "10px",
              },
            }}
          />
          <Tab
            label="Secretarial Standards"
            {...a11yProps(5)}
            sx={{
              "&.Mui-selected": {
                background: "white",
                borderRadius: "10px",
              },
            }}
          />
          <Tab
            label="Accounting Standards"
            {...a11yProps(6)}
            sx={{
              "&.Mui-selected": {
                background: "white",
                borderRadius: "10px",
              },
            }}
          />
          <Tab
            label="Case Laws"
            {...a11yProps(7)}
            sx={{
              "&.Mui-selected": {
                background: "white",
                borderRadius: "10px",
              },
            }}
          />
          <Tab
            label="Amendments Acts"
            {...a11yProps(8)}
            sx={{
              "&.Mui-selected": {
                background: "white",
                borderRadius: "10px",
              },
            }}
          />
        </Tabs>
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
        <Forms />
      </TabPanel>
      <TabPanel value={value} index={5}>
        Secretarial Standards
      </TabPanel>
      <TabPanel value={value} index={6}>
        <AccountingStandards />
      </TabPanel>
      <TabPanel value={value} index={7}>
        Case Laws
      </TabPanel>
      <TabPanel value={value} index={8}>
        <AmendmentsActs />
      </TabPanel>
    </Box>
  );
}
