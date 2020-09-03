import React from "react";
import {
  ListItem,
  Avatar,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

export default function Admin({ user }) {
  return (
    <>
      <ListItem key={user._id}>
        <ListItemIcon>
          <Avatar style={{ backgroundColor: user.color }}>
            {user.nickname.slice(0, 3)}
          </Avatar>
        </ListItemIcon>
        <ListItemText primary={user.nickname} style={{ color: user.color }} />
      </ListItem>
    </>
  );
}
