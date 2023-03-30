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
import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LawIdFetch from "./Tabs";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AddCategoryDialog from "./AddCategoryDialog/AddCategoryDialog";
import AddContentTypeDialog from "./AddContentTypeDialog/AddContentTypeDialog";
import AddActDialog from "./AddActDialog/AddActDialog";
import CompanyAct from "./CompanyAct";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../../redux/superAdminReducer/superAdminAction";
import { Delete } from "@mui/icons-material";
import DeleteCategoryDialog from "./AddCategoryDialog/DeleteCategoryDialog";

const LawsLayout = ({ children }) => {
  const { categoryList } = useSelector((state) => state?.SuperAdmin);

  const params = useParams();

  console.log(categoryList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(params.category);
  const handleExpandClick = (index) => {
    expanded === index ? setExpanded("") : setExpanded(index);
  };
  const [openDialogAddCategory, setOpenDialogAddCategory] = useState(false);
  const [openDialogAddContentType, setOpenDialogAddContentType] = useState(false);
  const [openDialogAddAct, setOpenDialogAddAct] = useState(false);
  const [openDialogDeleteAct, setOpenDialogDeleteAct] = useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [categoryId, setcategoryId] = useState(false);
  const [categoryName, setcategoryName] = useState(false);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [openDialogAddAct, openDialogAddCategory]);

  return (
    <>
      <Layout>
        {/* add Category dialog box */}
        <AddCategoryDialog
          openDialog={openDialogAddCategory}
          setOpenDialog={setOpenDialogAddCategory}
        />
      

        {/* add Category dialog box */}

        {/* delete Category dialog box */}
        <DeleteCategoryDialog
          openDialog={openDialogDeleteAct}
          setOpenDialog={setOpenDialogDeleteAct}
          categoryId={categoryId}
        />
        {/* delete Category dialog box */}

        {/* add Act dialog box */}
        <AddActDialog
          openDialog={openDialogAddAct}
          setOpenDialog={setOpenDialogAddAct}
          categoryId={categoryId}
          categoryName={categoryName}
        />
        {/* add Act dialog box */}

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
                    sx={{ py: 4, px: 2, fontWeight: "bold", fontSize: "20px" }}
                  >
                    Category
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      maxWidth: "30px",
                      minWidth: "30px",
                    }}
                    onClick={() => setOpenDialogAddCategory(true)}
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
                  {categoryList?.map((value, index) => (
                    <>
                      <ListItemButton
                        key={index}
                        selected={params.category === value.category}
                        onClick={() => {
                          handleExpandClick(value.category);
                        }}
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
                        <ListItemText primary={value.category.toUpperCase()} />
                        {expanded === value.category ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </ListItemButton>
                      <Collapse
                        in={value.category === expanded}
                        timeout="auto"
                        unmountOnExit
                        sx={{
                          backgroundColor: "#FBFBFB",
                          color: "#ACACAC",
                        }}
                      >
                        <List component="div" disablePadding>
                          {value?.acts?.map((item, index) => (
                            <ListItemButton
                              key={index}
                              sx={{
                                pl: 4,
                                color: params.act === item.act ? "black" : "",
                                fontWeight:
                                  params.act === item.act ? "bold" : "",
                              }}
                              onClick={() =>
                                navigate(
                                  `/superadmin/laws/${value.category}/${item.act}/${item._id}`
                                )
                              }
                            >
                              <ListItemText
                                disableTypography
                                primary={item.act}
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
                            Add New Act
                          </Typography>
                          <IconButton
                            onClick={() => {
                              setOpenDialogAddAct(true);
                              setcategoryId(value._id);
                              setcategoryName(value.category);
                            }}
                          >
                            <AddIcon sx={{ color: "black" }} fontSize="small" />
                          </IconButton>
                        </Box>

                        <Box
                          sx={{
                            pb: 2,
                            px: 3,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography sx={{ color: "red" }}>
                            Delete Category
                          </Typography>
                          <IconButton
                            onClick={() => {
                              setOpenDialogDeleteAct(true);
                              setcategoryId(value._id);
                            }}
                          >
                            <Delete sx={{ color: "red" }} fontSize="small" />
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

export default LawsLayout;
