import React from "react";
import {
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FolderIcon from "@material-ui/icons/Folder";

// тут тоже будет рендер пользователей
export default function AdminView() {
  return (
    <div>
      fdssffdsf
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="user name for admin" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}
