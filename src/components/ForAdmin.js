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
import BlockIcon from "@material-ui/icons/Block";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import DoneIcon from "@material-ui/icons/Done";

export default function AdminView({ allUsers, socket }) {
  const onBan = (userId) => {
    socket.emit("ban", { id: userId });
    console.log(`user id - ${userId} is baned`);
  };

  const onUnBan = (userId) => {
    socket.emit("unban", { id: userId });
    console.log(`user id - ${userId} is UNbaned`);
  };

  const onMute = (user) => {
    socket.emit("mute", user);
    // console.log(`user id - ${userId} is mute`);
  };

  const onUnMute = (user) => {
    socket.emit("unmute", user);
    // console.log(`user id - ${userId} is mute`);
  };

  return (
    <div className="forAdmin">
      <Typography variant="h5">All users:</Typography>
      <List>
        {allUsers.map((user) => {
          return (
            <ListItem key={user._id}>
              <ListItemAvatar>
                <Avatar>{user.nickname.slice(0, 3)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.nickname} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => onBan(user._id)}>
                  <BlockIcon />
                  ban
                </IconButton>
                <IconButton onClick={() => onUnBan(user._id)}>
                  unban
                  <LockOpenIcon />
                </IconButton>
                <IconButton onClick={() => onMute(user)}>
                  <VolumeMuteIcon />
                  mute
                </IconButton>
                <IconButton onClick={() => onUnMute(user)}>
                  <DoneIcon />
                  unmute
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
