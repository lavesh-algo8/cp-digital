import React from "react";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import BasicMenu from "./NotificationMenu";
import { Button } from "@mui/material";

const notifications = [
  {
    id: 0,
    label: "Admin successfully added",
  },
  {
    id: 1,
    label: "SubAdmin details are edited successfully ",
  },
  {
    id: 1,
    label: "SubAdmin details are edited successfully ",
  },
  {
    id: 1,
    label: "SubAdmin details are edited successfully ",
  },
  {
    id: 1,
    label: "SubAdmin details are edited successfully ",
  },
  {
    id: 1,
    label: "SubAdmin details are edited successfully ",
  },
  {
    id: 1,
    label: "SubAdmin details are edited successfully ",
  },
  {
    id: 1,
    label: "SubAdmin details are edited successfully ",
  },
];

const NotificationBell = ({ iconColor }) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const newNotifications = `You have ${notifications.length} new notifications!`;
  const noNotifications = "No new notifications";

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip
        title={notifications.length ? newNotifications : noNotifications}
      >
        <Button
          onClick={notifications.length ? handleOpen : null}
          anchorEl={anchorEl}
          variant="contained"
          sx={{
            display: { xs: "none", md: "block", lg: "block", xl: "block" },
            mr: 3,
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
      </Tooltip>
      <BasicMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        menuItems={notifications}
      />
    </div>
  );
};

export default NotificationBell;
