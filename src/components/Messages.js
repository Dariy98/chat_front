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
import decode from "jwt-decode";

import UserList from "./UserList";

//и user name для авы
export default function Messages({ messages }) {
  const token = localStorage.getItem("token");
  let currentUser = decode(token);
  console.log(currentUser.nickname);
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
            {messages.map((msg, index) => {
              return (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>{currentUser.nickname}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={msg} />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Grid>
    </Grid>
  );
}
