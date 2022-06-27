import {
  Box,
  Card,
  Collapse,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import Layout from "../Layout";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LawIdFetch from "../Law/Tabs";
import { Outlet, useNavigate } from "react-router-dom";
import { CalculateNetWorth } from "../../../pages/superadmin/Calculator/CalculateNetWorth";

const CalculatorLayout = ({ children, id }) => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState("");
  const [currentTab, setCurrentTab] = React.useState("CalculateNetworth");
  const handleExpandClick = (index) => {
    expanded === index ? setExpanded("") : setExpanded(index);
  };
  const handleClick = () => {
    setOpen(!open);
  };

  const tabList = {
    CalculateNetworth: <CalculateNetWorth />,
  };

  return (
    <>
      <Layout>
        {/* <Box sx={{ maxHeight: "100vh" }}> */}
        <Grid container>
          <Grid
            item
            lg={2}
            md={2}
            xs={12}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
                height: "100vh",
                border: "2px solid red",
                overflow: "hidden",
              },
            }}
          >
            <Card
              square={true}
              sx={{
                border: "2px solid blue",
                overflow: "hidden",
              }}
            >
              <Typography
                sx={{ py: 4, px: 2, fontWeight: "bold", fontSize: "20px" }}
              >
                Calculator
              </Typography>
              <Box sx={{ height: "85vh", mt: 2 }}>
                {["Fees & Figures Calculator", "Eligibility & Date Check"].map(
                  (value, index) => (
                    <>
                      <ListItemButton onClick={() => handleExpandClick(index)}>
                        <ListItemText primary={value} />
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse
                        in={index === expanded}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {[
                            {
                              id: "penaltyCalculator",
                              name: "Penalty Calculator",
                            },
                            {
                              id: "calculateEffectiveCapital",
                              name: "Calculate Effective Capital",
                            },
                            {
                              id: "calculateNetProfits",
                              name: "Calculate Net Profits",
                            },
                            {
                              id: "calculateNetworth",
                              name: "Calculate Net worth",
                            },
                            {
                              id: "rocFeesCalculator",
                              name: "ROC Fees Calculator",
                            },
                          ].map((value, index) => (
                            <ListItemButton
                              key={index}
                              sx={{ pl: 4 }}
                              onClick={() =>
                                navigate(`/superadmin/calculator/${value.id}`)
                              }
                            >
                              {/* <ListItemText
                                sx={{ fontSize: "12px" }}
                                primary={value.name}
                              /> */}
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  fontWeight:
                                    id === value?.id ? "bold" : "normal",
                                }}
                              >
                                {value.name}
                              </Typography>
                              <ChevronRightIcon />
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  )
                )}
              </Box>
            </Card>
          </Grid>
          <Grid item lg={10} md={10} xs={12}>
            <Card
              sx={{
                marginTop: "100px",
                mx: 3,
                borderRadius: "10px",
                minHeight: "100vh",
                p: 3,
                // overflow: "scroll",
              }}
            >
              {children}
              {/* {tabList[currentTab]} */}
            </Card>
          </Grid>
        </Grid>
        {/* </Box> */}
      </Layout>
    </>
  );
};

export default CalculatorLayout;
