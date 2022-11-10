/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect } from "react";
import { css } from "@emotion/react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SearchIcon from "@mui/icons-material/Search";
// import { Link } from "react-router-dom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CalculateIcon from "@mui/icons-material/Calculate";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DifferenceIcon from "@mui/icons-material/Difference";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  Avatar,
  Button,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

const drawerWidth = 120;

const searchItems = [
  { title: "new", name: "newName" },
  { title: "new1", name: "newName1" },
  { title: "new2", name: "newName2" },
  { title: "new3", name: "newName3" },
  { title: "new4", name: "newName4" },
];

export default function Layout({ children }) {
  let currentLocation = window.location.pathname;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Grid
        container
        sx={{ mt: 2, justifyContent: "center" }}
        alignItems="center"
      >
        <Grid item sx={{ mt: 2 }}>
          <img src="/logo1.png" alt="logo" height={30} />
        </Grid>
      </Grid>
      <List sx={{ mt: 2 }}>
        <ListItem
          button
          sx={{
            mt: 3,
            color: "#c9c7c7",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={() => navigate("/superadmin/dashboard")}
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            <DashboardIcon sx={{ fontSize: 30, border: 0 }} />
          </ListItemIcon>
        </ListItem>

        <ListItem
          button
          sx={{
            mt: 3,
            color: "#c9c7c7",
            display: "flex",
            flexDirection: "column",
            borderLeft: currentLocation.startsWith("/superadmin/admins")
              ? "4px solid #192a3a"
              : "",
          }}
          onClick={() => navigate("/superadmin/admins")}
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            <SupervisorAccountIcon
              sx={{
                fontSize: 30,
                border: 0,
                color: currentLocation.startsWith("/superadmin/admins")
                  ? "#192a3a"
                  : "",
              }}
            />
          </ListItemIcon>
        </ListItem>

        <ListItem
          button
          sx={{
            mt: 3,
            color: "#c9c7c7",
            display: "flex",
            flexDirection: "column",
            borderLeft: currentLocation.startsWith("/superadmin/laws")
              ? "4px solid #192a3a"
              : "",
          }}
          onClick={() => navigate("/superadmin/laws")}
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            <AccountBalanceIcon
              sx={{
                fontSize: 30,
                border: 0,
                color: currentLocation.startsWith("/superadmin/laws")
                  ? "#192a3a"
                  : "",
              }}
            />
          </ListItemIcon>
        </ListItem>

        <ListItem
          button
          sx={{
            mt: 3,
            color: "#c9c7c7",
            display: "flex",
            flexDirection: "column",
            borderLeft: currentLocation.startsWith("/superadmin/calculator")
              ? "4px solid #192a3a"
              : "",
          }}
          onClick={() => navigate("/superadmin/calculator")}
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            <CalculateIcon
              sx={{
                fontSize: 30,
                border: 0,
                color: currentLocation.startsWith("/superadmin/calculator")
                  ? "#192a3a"
                  : "",
              }}
            />
          </ListItemIcon>
        </ListItem>

        <ListItem
          button
          sx={{
            mt: 3,
            color: "#c9c7c7",
            display: "flex",
            flexDirection: "column",
            borderLeft: currentLocation.startsWith("/superadmin/procedure")
              ? "4px solid #192a3a"
              : "",
          }}
          onClick={() => navigate("/superadmin/procedure/shiftingofoffice")}
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            <AssignmentIcon
              sx={{
                fontSize: 30,
                border: 0,
                color: currentLocation.startsWith("/superadmin/procedure")
                  ? "#192a3a"
                  : "",
              }}
            />
          </ListItemIcon>
        </ListItem>

        <ListItem
          button
          sx={{
            mt: 3,
            color: "#c9c7c7",
            display: "flex",
            flexDirection: "column",
            borderLeft: currentLocation.startsWith(
              "/superadmin/documentGenerator"
            )
              ? "4px solid #192a3a"
              : "",
          }}
          onClick={() => navigate("/superadmin/documentGenerator")}
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            <DifferenceIcon
              sx={{
                fontSize: 30,
                border: 0,
                color: currentLocation.startsWith(
                  "/superadmin/documentGenerator"
                )
                  ? "#192a3a"
                  : "",
              }}
            />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAEl = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        // background: "#192A3A",
        backgroundImage: "url(/background.png)",
      }}
    >
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openAEl}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          // width: { sm: "800px" },
          width: {
            lg: `calc(100% - ${350}px)`,
            xl: `calc(100% - ${440}px)`,
            md: `calc(100% - ${300}px)`,
          },
          zIndex: 1,
          // ml: { sm: `${drawerWidth}px` },
          color: "black",
          boxShadow: "none",
          background: "transparent",
        }}
      >
        <Toolbar sx={{ mt: 2, mb: 2 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            noWrap
            component="div"
            sx={{
              color: "white",
              display: {
                sm: "block",
                md: "none",
              },
            }}
          >
            CORPRO
          </Typography>

          <div
            css={css`
              flex-grow: 1;
            `}
          ></div>

          <Typography
            variant="p"
            noWrap
            component="div"
            sx={{
              display: { xs: "block", md: "none", lg: "none", xl: "none" },
              color: "white",
            }}
          >
            Hi Super Admin !
          </Typography>
          <IconButton
            sx={{
              display: { xs: "block", md: "none", lg: "none", xl: "none" },
            }}
          >
            <Avatar
              variant="rounded"
              src="arushi.png"
              sx={{
                height: 35,
                width: 40,
              }}
            ></Avatar>
          </IconButton>
          <Box
            sx={{
              display: { xs: "none", md: "block", lg: "block", xl: "block" },
              mr: 5,
            }}
          >
            <Autocomplete
              id="combo-box-demo"
              freeSolo
              options={searchItems}
              getOptionLabel={(option) =>
                option.title ? option.title : option.name
              }
              style={{ width: 300, borderRight: "none", borderLeft: "none" }}
              onChange={(e, value) => console.log(e.target, value.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  sx={{
                    background: "white",
                    width: "35ch",
                    borderRadius: "4px",
                  }}
                  size="small"
                  placeholder="Search...."
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="maincolor" />
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                  }}
                />
              )}
            />
            {/* <OutlinedInput
              id="outlined-adornment-weight"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon color="maincolor" />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              size="small"
              sx={{
                background: "white",
                width: "35ch",
              }}
              placeholder="Search...."
            /> */}
          </Box>

          <Button
            variant="contained"
            sx={{
              display: { xs: "none", md: "block", lg: "block", xl: "block" },
              mr: 5,
              py: 1,
            }}
            color="whitecol"
            size="small"
          >
            <Badge color="notificationcol" variant="dot" overlap="circular">
              <NotificationsIcon
                color="maincolor"
                sx={{ transform: "rotate(-25deg)" }}
              />
            </Badge>
          </Button>
          <Typography
            noWrap
            component="div"
            sx={{
              display: { xs: "none", md: "block", lg: "block", xl: "block" },
              color: "white",
              mr: 1,
            }}
          >
            Hi Super Admin !
          </Typography>
          <IconButton
            sx={{
              display: { xs: "none", md: "block", lg: "block", xl: "block" },
            }}
            onClick={handleClick}
          >
            <Avatar
              variant="rounded"
              src="arushi.png"
              sx={{
                height: 43,
                width: 55,
              }}
            ></Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          PaperProps={{ elevation: 5 }}
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // overflow: "hidden",
          minHeight: "100vh",
        }}
      >
        {/* <Toolbar /> */}
        {children}
      </Box>
    </Box>
  );
}
