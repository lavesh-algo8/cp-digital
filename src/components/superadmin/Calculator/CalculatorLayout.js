/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Layout from "../Layout";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LawIdFetch from "../Law/Tabs";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { CalculateNetWorth } from "../../../pages/superadmin/Calculator/CalculateNetWorth";
import { Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddedCalculators,
  fetchCategory,
} from "../../../redux/superAdminReducer/superAdminAction";
import AddCalculator from "./AddCalculator";

const CalculatorLayout = ({ children, ids }) => {
  const { addedCalculatorList } = useSelector((state) => state?.SuperAdmin);

  const [openDialog, setopenDialog] = React.useState(false);
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let currentLocation = window.location.hash.substring(1);

  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState("");
  const [expanded2, setExpanded2] = React.useState("");
  const [currentTab, setCurrentTab] = React.useState("CalculateNetworth");
  const handleExpandClick = (index) => {
    expanded === index ? setExpanded("") : setExpanded(index);
  };
  const handleExpandClick2 = (index) => {
    expanded2 === index ? setExpanded2("") : setExpanded2(index);
  };
  const handleClick = () => {
    setOpen(!open);
  };

  const tabList = {
    CalculateNetworth: <CalculateNetWorth />,
  };

  useEffect(() => {
    dispatch(fetchAddedCalculators());
    dispatch({
      type: "ADD_FORMULA",
      payload: { formulaText: "" },
    });
  }, [openDialog]);

  useEffect(() => {
    if (ids) {
      setExpanded(0);
    }
    if (id) {
      currentLocation.startsWith("/superadmin/calculator/addedcalculator")
        ? setExpanded2(0)
        : setExpanded2("");
    }
  }, []);

  return (
    <>
      <Layout>
        {openDialog && (
          <AddCalculator
            openDialog={openDialog}
            setOpenDialog={setopenDialog}
          />
        )}

        <Box sx={{ maxHeight: "100vh" }}>
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
                  // height: "100vh",
                  // overflow: "hidden",
                },
              }}
            >
              <Card
                square={true}
                sx={{
                  // overflow: "hidden",
                  minHeight: "100vh",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pr: 3,
                  }}
                >
                  <Typography
                    sx={{ py: 4, px: 2, fontWeight: "bold", fontSize: "20px" }}
                  >
                    Calculator
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      maxWidth: "30px",
                      minWidth: "30px",
                    }}
                    onClick={() => setopenDialog(true)}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </Box>
                <Box
                  sx={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: "83vh",
                    mt: 2,
                  }}
                >
                  {/* </Box>
                <Box
                  sx={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: "83vh",
                    mt: 2,
                  }}
                > */}
                  {["Others Calculators"].map((value, index) => (
                    <>
                      <ListItemButton onClick={() => handleExpandClick(index)}>
                        <ListItemText primary={value} />
                        {index === expanded ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse
                        in={index === expanded}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {[
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
                              onClick={() => {
                                navigate(`/superadmin/calculator/${value.id}`);
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "12px",
                                  fontWeight:
                                    ids === value?.id ? "bold" : "normal",
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
                  ))}

                  {["Added Calculators"]?.map((value, index) => (
                    <>
                      <ListItemButton
                        key={index}
                        // selected={params.category === value.category}
                        onClick={() => handleExpandClick2(index)}
                        sx={{
                          "&.Mui-selected": {
                            backgroundColor: "transparent",
                            color: "#dbad95",
                            borderLeft: "4px solid #dbad95",
                            "&:hover": {
                              // backgroundColor: "#2d4a66",
                            },
                          },
                        }}
                      >
                        <ListItemText primary={value} />
                        {index === expanded2 ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse
                        in={index === expanded2}
                        timeout="auto"
                        unmountOnExit
                        sx={{
                          backgroundColor: "#FBFBFB",
                          color: "#ACACAC",
                        }}
                      >
                        <List component="div" disablePadding>
                          {addedCalculatorList?.map((item, index) => (
                            <ListItemButton
                              key={index}
                              sx={{
                                pl: 4,
                                color: id === item._id ? "black" : "",
                                fontWeight: id === item._id ? "bold" : "",
                              }}
                              onClick={() => {
                                navigate(
                                  `/superadmin/calculator/addedcalculator/${item._id}`
                                );
                                // window.location.reload();
                              }}
                            >
                              <ListItemText
                                disableTypography
                                primary={item.calculator_name}
                              />
                              <ChevronRightIcon />
                            </ListItemButton>
                          ))}
                        </List>
                        <Box
                          sx={{
                            pt: 1,
                            px: 3,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography sx={{ color: "black" }}>
                            Add Calculator
                          </Typography>
                          <IconButton
                            onClick={() => {
                              setopenDialog(true);
                            }}
                          >
                            <AddIcon sx={{ color: "black" }} fontSize="small" />
                          </IconButton>
                        </Box>
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
                  p: 3,
                  height: "82vh",
                  overflowY: "scroll",
                }}
              >
                {children}
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default CalculatorLayout;
