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

export default function Messages({ messages, allUsers, socket, token }) {
  return (
    <Grid container spacing={3} className="chat-box">
      <UserList allUsers={allUsers} socket={socket} token={token} />

      <Grid item xs={6} className="messages-box">
        <Typography variant="h6">Messages here</Typography>
        <div>
          <List>
            {messages.map((msg, index) => {
              return (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>{msg.user.slice(0, 3)}</Avatar>
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
