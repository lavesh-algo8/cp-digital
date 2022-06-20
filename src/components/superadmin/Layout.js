import React, { useContext, useEffect } from "react";
/** @jsxImportSource @emotion/react */
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

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";

const drawerWidth = 120;

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
      </List>
    </div>
  );

  return (
    <Box
      sx={{
        display: "flex",
        // background: "#192A3A",
        backgroundImage: "url(/background.png)",
      }}
    >
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
            <OutlinedInput
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
            />
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
