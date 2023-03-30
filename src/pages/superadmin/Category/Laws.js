import React from "react";
import CompanyAct from "../../../components/superadmin/Law/CompanyAct";
import LawsLayout from "../../../components/superadmin/Law/LawsLayout";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rules from "../../../components/superadmin/Law/TabsSections/Rules";
import Circular from "../../../components/superadmin/Law/TabsSections/Circular";
import News from "../../../components/superadmin/Law/TabsSections/News";
import Presentation from "../../../components/superadmin/Law/TabsSections/Presentation";
import Notifications from "../../../components/superadmin/Law/TabsSections/Notifications";
import Article from "../../../components/superadmin/Law/TabsSections/Article";

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
const Laws = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <LawsLayout>
        {/* <CompanyAct /> */}

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
                "Law",
                "Rules",
                "Notifications",
                "Circulars",
                "Articles",
                "News",
                "Presentations"
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
          </Box>
          <TabPanel value={value} index={0}>
            <CompanyAct />
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
      </LawsLayout>
    </>
  );
};

export default Laws;
