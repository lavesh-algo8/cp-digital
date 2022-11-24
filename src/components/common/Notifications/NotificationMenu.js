import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const BasicMenu = ({ anchorEl, handleClose, open, menuItems }) => {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          maxWidth: 500,
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1,
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          py: 1,
        }}
      >
        <Typography color="primary">Notification</Typography>
        <Typography variant="button" sx={{ textTransform: "none" }}>
          Read all
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ maxHeight: 400, overflow: "auto" }}>
        {menuItems.map((item) => (
          <>
            <Typography sx={{ color: "gray", px: 2, pt: 1 }}>Today</Typography>
            <MenuItem sx={{ whiteSpace: "normal" }} onClick={handleClose}>
              <Grid container>
                <Grid item lg={9}>
                  <Typography>{item.label}</Typography>
                </Grid>
                <Grid item lg={3} textAlign="right">
                  <Typography sx={{ color: "gray" }}>10:00 am</Typography>
                </Grid>
              </Grid>
            </MenuItem>
          </>
        ))}
      </Box>
    </Menu>
  );
};

export default BasicMenu;
