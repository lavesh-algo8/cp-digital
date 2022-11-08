import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rules from "./TabsSection/Rules";
import Notifications from "./TabsSection/Notifications";
import Circular from "./TabsSection/Circular";
import Forms from "./TabsSection/Forms";
import AccountingStandards from "./TabsSection/AccountingStandards";
import AmendmentsActs from "./TabsSection/AmendmentsActs";

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
            background: "#eaeaea",
          }}
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
        >
          {[
            "Rules",
            "Notifications",
            "Circulars",
            "Forms",
            "Secretarial Standards",
            "Accounting Standards",
            "Case Laws",
            "Amendments Acts",
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
      </Box>
      <TabPanel value={value} index={0}>
        <Rules />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Notifications />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Circular />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Forms />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Secretarial Standards
      </TabPanel>
      <TabPanel value={value} index={5}>
        <AccountingStandards />
      </TabPanel>
      <TabPanel value={value} index={6}>
        Case Laws
      </TabPanel>
      <TabPanel value={value} index={7}>
        <AmendmentsActs />
      </TabPanel>
    </Box>
  );
}