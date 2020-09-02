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

export default function Messages({ messages }) {
  return (
    <Grid className="chat-box">
      <Grid xs={12} className="messages-box">
        <Typography variant="h6">Messages here</Typography>
        <div>
          <List>
            {messages.map((msg) => {
              return (
                <ListItem key={msg.id}>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: msg.color }}>
                      {msg.nickname.slice(0, 3)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={msg.message}
                    style={{ color: msg.color }}
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Grid>
    </Grid>
  );
}
