import React from "react";
import { Box, Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import Layout from "../../components/superadmin/Layout";
import { useNavigate } from "react-router-dom";
import { GREEN_TINT, GREY_TINT } from "../../Utility/Colors";
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Dashboard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let navigate = useNavigate();

  const Home = () => {
    navigate("/");
  };
  return (
    <Layout>
      <Grid
        container
        spacing={3}
        sx={{
          border: "1px solid red",
          marginTop: "100px",
          position: "relative",
          zIndex: "12",
          borderRadius: "10px",
          // height: "180vh",
          overflowY: "scroll",
          p: 3,
        }}
      >
        <Cards />
        <Grid container item xs={12} sx={{ border: "2px solid blue", p: 2 }}>
          <Grid container item xs={12}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons="auto"
              // variant="fullWidth"
              sx={{
                background: "transparent",
              }}
              TabIndicatorProps={{
                style: {
                  // display: "none",
                  backgroundColor: "white",
                },
              }}
            >
              {["Notifications", "Circulars", "Rules", "Orders"].map(
                (label, index) => (
                  <Tab
                    key={index}
                    label={label}
                    {...a11yProps(index)}
                    sx={{
                      color: GREY_TINT,
                      "&.Mui-selected": {
                        // background: "white",
                        color: "white",
                        borderRadius: "10px",
                        fontweight: "bold",
                      },
                      textTransform: "none",
                    }}
                  />
                )
              )}
            </Tabs>
            <TabPanel value={value} index={0}></TabPanel>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Dashboard;

function Cards() {
  return (
    <Grid container item xs={12}>
      <Grid container item xs={12} md={6} lg={4} sx={{ padding: 1 }}>
        <CardData title={"No. Of Active Users"} data="1,44,532" />
        <CardData title={"No. Of Admins"} data="1,44,532" additional="608" />
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "white",
            height: "auto",
            p: 3,
            borderRadius: 2,
            minHeight: "144px",
            mb: 2,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
            Procedure
          </Typography>
          <DataRow title="Sections" data="2,427" />
          <DataRow title="Topics" data="2,34,234" />
        </Grid>
      </Grid>
      <Grid container item xs={12} md={6} lg={4} sx={{ padding: 1 }}>
        <CardData
          title={"Total no. of users"}
          data="1,44,532"
          additional="608"
        />

        <CardData
          title={"Total no. of sub admins"}
          data="1,44,532"
          additional="608"
        />
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "white",
            height: "auto",
            p: 3,
            borderRadius: 2,
            minHeight: "144px",
            mb: 2,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
            Procedure
          </Typography>
          <DataRow title="Sections" data="2,427" />
          <DataRow title="Topics" data="2,34,234" />
        </Grid>
      </Grid>
      <Grid container item xs={12} md={6} lg={4} sx={{ padding: 1 }}>
        <CardData
          title={"Payment Received"}
          data="₹ 9,174"
          additional="₹ 917"
        />
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "white",
            height: "auto",
            p: 3,
            borderRadius: 2,
            minHeight: "220px",
            mb: 2,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
            No. Of Laws
          </Typography>
          <DataRow title="Total" data="1,23,234" />
          <DataRow title="Chapters" data="2,479" />
          <DataRow title="Sections" data="12,423" />
          <DataRow title="Rules" data="34,324" />
        </Grid>
      </Grid>
    </Grid>
  );
}

function DataRow({ title, data }) {
  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        backgroundColor: GREY_TINT,
        p: 1,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "4px",
        mb: 1,
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {data}
      </Typography>
    </Grid>
  );
}

function CardData({ title, data, additional = "" }) {
  return (
    <Grid
      item
      xs={12}
      sx={{
        backgroundColor: "white",
        height: "auto",
        p: 3,
        borderRadius: 2,
        minHeight: "144px",
        mb: 2,
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {data}
      </Typography>
      {additional && (
        <Typography
          variant="body2"
          sx={{
            marginLeft: "auto",
            display: "block",
            width: "fit-content",
            color: GREEN_TINT,
          }}
        >
          {additional}
          <br />
          <i
            className="fa-solid fa-arrow-up"
            style={{ marginRight: "6px" }}
          ></i>
          last 7 days
        </Typography>
      )}
    </Grid>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      container
      item
      xs={12}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid item xs={12}>
          {children}
        </Grid>
      )}
    </Grid>
  );
}
