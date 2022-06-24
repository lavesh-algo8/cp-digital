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
import { Outlet } from "react-router-dom";

const CalculatorLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState("");
  const handleExpandClick = (index) => {
    expanded === index ? setExpanded("") : setExpanded(index);
  };
  const handleClick = () => {
    setOpen(!open);
  };

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
                <Typography
                  sx={{ py: 4, px: 2, fontWeight: "bold", fontSize: "20px" }}
                >
                  Calculator
                </Typography>
                <Box sx={{ overflow: "scroll", height: "85vh", mt: 2 }}>
                  {[
                    "Fees & Figures Calculator",
                    "Eligibility & Date Check",
                  ].map((value, index) => (
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
                            "Penalty Calculator",
                            "Calculate Effective Capital",
                            "Calculate Net Profits",
                            "Calculate Net worth",
                            "ROC Fees Calculator",
                          ].map((value, index) => (
                            <ListItemButton key={index} sx={{ pl: 4 }}>
                              <ListItemText primary={value} />
                              <ChevronRightIcon />
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  ))}
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
                }}
              >
                <Typography>{children}</Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default CalculatorLayout;
