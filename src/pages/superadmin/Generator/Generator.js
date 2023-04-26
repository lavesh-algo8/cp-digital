import React from "react";
import Layout from "../../../components/superadmin/Layout";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputAdornment,
  ListItemButton,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AdminsTable from "../../../components/superadmin/AdminsTable";
import AddAdminDialog from "../../../components/superadmin/AddAdminDialog";
import AddSubAdminDialog from "../../../components/superadmin/AddSubAdminDialog";
import SubAdminsTable from "../../../components/superadmin/SubAdminsTable";
import { useNavigate } from "react-router-dom";

const Generator = ({ children }) => {
  const navigate = useNavigate();
  let currentLocation = window.location.hash.substring(1);

  const [value, setValue] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                <Typography sx={{ p: 4, fontWeight: "bold", fontSize: "20px" }}>
                  Documents
                </Typography>
                <Box
                  sx={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    height: "83vh",
                  }}
                >
                  {[
                    // {
                    //   text: "Old Procedure",
                    //   location: "/superadmin/generator/documentGenerator",
                    // },
                    {
                      text: "Procedure",
                      location: "/superadmin/generator/generateprocedure",
                    },
                    {
                      text: "Templates",
                      location: "/superadmin/generator/templateGenerator",
                    },
                  ].map((item, index) => (
                    <ListItemButton
                      key={index}
                      selected={currentLocation.startsWith(item.location)}
                      onClick={() => navigate(item.location)}
                      sx={{
                        mt: index === 0 ? 2 : "",
                        "&.Mui-selected": {
                          backgroundColor: "#F0F0F0",
                          color: "#121D28",
                          borderRight: "4px solid #121D28",
                          "&:hover": {
                            // backgroundColor: "#2d4a66",
                          },
                        },
                      }}
                    >
                      <ListItemText primary={item.text} sx={{ ml: 2 }} />
                    </ListItemButton>
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
                  height: `calc(100vh - ${120}px)`,
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

export default Generator;
