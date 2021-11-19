import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import {
  Button,
  Grid,
  Hidden,
  Input,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ChatIcon from '@mui/icons-material/Chat';
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { NavLink } from "react-router-dom";
import { userProps } from "../../index.types";
import { useAppSelector } from "../../app/hooks";
import AddPostModal from "../AddPostModal/add_post_modal.component";

const LeftSidebar = () => {
  
  const [openModal, setOpenModal] = React.useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box sx={{ height: "100vh", maxWidth: "100%" }}>
        <List>
          <NavLink
            to="/home/feed"
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <HomeIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                  }}
                  primary="Home"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          <NavLink
            to={`/home/explore`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <TagIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                  }}
                  primary="Explore"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          <NavLink
            to={`/home/cryptocurrency`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <AccountBalanceIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                  }}
                  primary="Cryptocurrency"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          <NavLink
            to={`/home/friendrequests`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <NotificationAddIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                  }}
                  primary="Friend Requests"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          <NavLink
            to={`/home/notifications`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <NotificationsNoneIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                  }}
                  primary="Notifications"
                />
              </Hidden>
            </ListItem>
          </NavLink>

          <NavLink
            to={`/home/messages`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <MailOutlineIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                  }}
                  primary="Messages"
                />
              </Hidden>
            </ListItem>
          </NavLink>

          <NavLink
            to={`/home/add-post`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <ChatIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                  }}
                  primary="Chat"
                />
              </Hidden>
            </ListItem>

          </NavLink>

          <NavLink
            to={`/home/profile`}
            style={{
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "inherit",
            }}
          >
            <ListItem
              button
              sx={{
                borderRadius: "28px",
                margin: ".5rem 0",
              }}
            >
              <ListItemIcon>
                <PersonOutlineIcon fontSize="medium" color="action" />
              </ListItemIcon>
              <Hidden lgDown>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "18px",
                  }}
                  primary="Profile"
                />
              </Hidden>
            </ListItem>
          </NavLink>
          <Button
           onClick={handleModalOpen}
            variant="contained"
            fullWidth
            sx={{
              borderRadius: "28px",
              padding: "10px",
              background: "black",
              "&:hover": {
                background: "#333",
              },
            }}
          >
            POST
          </Button>
        </List>
      </Box>
      {openModal && (
        <AddPostModal
          open={openModal}
          handleClose={handleModalClose}
        />
      )}
    </>
  );
}

export default LeftSidebar;