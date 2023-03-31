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
const [openDialogAddContentType, setOpenDialogAddContentType] = useState(false);
import AddActDialog from "./AddActDialog/AddActDialog";
import CompanyAct from "./CompanyAct";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentType } from "../../../redux/superAdminReducer/superAdminAction";
import { Delete } from "@mui/icons-material";
import DeleteCategoryDialog from "./AddCategoryDialog/DeleteCategoryDialog";

const ContentTypeLayout = ({ children }) => {
  const { contenttypeList } = useSelector((state) => state?.SuperAdmin);

  const params = useParams();

  console.log(contenttypeList);
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
    dispatch(fetchContentType());
  }, [openDialogAddContentType, openDialogAddContentType]);

  return (
    <>
      <Layout>
        {/* add Category dialog box */}
      <AddContentTypeDialog
          openDialog={openDialogAddContentType}
          setOpenDialog={setOpenDialogAddContentType}
        />


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

export default ContentTypeLayout;
