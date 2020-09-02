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
    console.log(`user id - ${userId} is Unbaned`);
  };

  const onMute = (userId) => {
    socket.emit("mute", { id: userId });
    console.log(`user id - ${userId} is mute`);
  };

  const onUnMute = (userId) => {
    socket.emit("unmute", { id: userId });
    console.log(`user id - ${userId} is Unmute`);
  };

  return (
    <div className="forAdmin">
      <Typography variant="h5">All users:</Typography>
      <List>
        {allUsers.map((user) => {
          return (
            <ListItem key={user._id}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: user.color }}>
                  {user.nickname.slice(0, 3)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.nickname}
                style={{ color: user.color }}
              />
              <ListItemSecondaryAction>
                {user.isBane ? (
                  <IconButton onClick={() => onUnBan(user._id)}>
                    <LockOpenIcon />
                    unban
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onBan(user._id)}>
                    <BlockIcon />
                    ban
                  </IconButton>
                )}
                {user.isMute ? (
                  <IconButton onClick={() => onUnMute(user._id)}>
                    <DoneIcon />
                    unmute
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onMute(user._id)}>
                    <VolumeMuteIcon />
                    mute
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
