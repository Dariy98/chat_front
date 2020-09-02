import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
} from "@material-ui/core";

export default function Messages({ messages }) {
  return (
    <>
      <List style={{ flexGrow: 1, flexShrink: 0, flexBasis: "auto" }}>
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
    </>
  );
}
