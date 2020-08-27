import React from "react";
import {
  Grid,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";

import UserList from "./UserList";

//и user name для авы
export default function Messages({ message }) {
  //когда решится вопрос с бд
  //можно будет рендерить сообщения
  //и выводить соответственно нужное кол-во listitem
  return (
    <Grid container spacing={3} className="chat-box">
      <UserList />
      <Grid item xs={8} className="messages-box">
        <Typography variant="h6">Messages here</Typography>
        <div>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar></Avatar>
              </ListItemAvatar>
              <ListItemText primary="message 1" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar></Avatar>
              </ListItemAvatar>
              <ListItemText primary="message 2" />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar></Avatar>
              </ListItemAvatar>
              <ListItemText primary={message} />
            </ListItem>
          </List>
        </div>
      </Grid>
    </Grid>
  );
}
