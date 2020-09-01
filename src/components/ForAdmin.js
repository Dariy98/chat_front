import React from "react";
import {
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FolderIcon from "@material-ui/icons/Folder";

export default function AdminView({ onlineUsers, socket }) {
  const onBan = (userId) => {
    socket.emit("ban", { id: userId });
    console.log(`user id - ${userId} is baned`);
  };

  return (
    <div>
      <Typography variant="h6">All users:</Typography>
      <List>
        {onlineUsers.map((user) => {
          return (
            <ListItem key={user._id}>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.nickname} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onBan(user._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
