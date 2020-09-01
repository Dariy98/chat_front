import React from "react";
import {
  Grid,
  List,
  ListItem,
  Typography,
  ListItemText,
  Avatar,
  ListItemAvatar,
} from "@material-ui/core";

import UserList from "./UserList";
// import UserAvatar from "./Avatar";
// import { generateAvatarColor } from "./../helpers/generateAvatarColor";

export default function Messages({ messages, onlineUsers, socket }) {
  return (
    <Grid container spacing={3} className="chat-box">
      <UserList onlineUsers={onlineUsers} socket={socket} />

      <Grid item xs={6} className="messages-box">
        <Typography variant="h6">Messages here</Typography>
        <div>
          <List>
            {messages.map((msg, index) => {
              return (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>{msg.user}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={msg.message} />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Grid>
    </Grid>
  );
}
