import React from "react";
import {
  List,
  ListItem,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  ListItemIcon,
  Chip,
} from "@material-ui/core";
import BlockIcon from "@material-ui/icons/Block";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import DoneIcon from "@material-ui/icons/Done";

import Admin from "./Admin";

export default function OnlineUsersAdmin({
  allUsers,
  onUnBan,
  onBan,
  onUnMute,
  onMute,
}) {
  return (
    <>
      <Typography variant="h6">Online users:</Typography>
      <List>
        {allUsers.map((user) => {
          if (user.isOnline && user.isAdmin) {
            return <Admin user={user} key={user._id} />;
          }
          if (user.isOnline && !user.isAdmin) {
            return (
              <ListItem key={user._id}>
                <ListItemIcon>
                  <Avatar style={{ backgroundColor: user.color }}>
                    {user.nickname.slice(0, 3)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={user.nickname}
                  style={{ color: user.color }}
                />
                <ListItemSecondaryAction key={user._id}>
                  {user.isBane ? (
                    <Chip
                      avatar={<LockOpenIcon />}
                      label="unban"
                      onClick={() => onUnBan(user._id)}
                    />
                  ) : (
                    <Chip
                      avatar={<BlockIcon />}
                      label="ban"
                      onClick={() => onBan(user._id)}
                    />
                  )}
                  {user.isMute ? (
                    <Chip
                      avatar={<DoneIcon />}
                      label="unmute"
                      onClick={() => onUnMute(user._id)}
                    />
                  ) : (
                    <Chip
                      avatar={<VolumeMuteIcon />}
                      label="mute"
                      onClick={() => onMute(user._id)}
                    />
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            );
          }
          return null;
        })}
      </List>
    </>
  );
}
