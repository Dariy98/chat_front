import React from "react";
import {
  Typography,
  ListItem,
  List,
  Avatar,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

export default function UserList({ allUsers }) {
  return (
    <>
      <Typography variant="h6">online:</Typography>
      <List>
        {allUsers
          ? allUsers.map((user) => {
              if (user.isOnline) {
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
                  </ListItem>
                );
              }
              return null;
            })
          : null}
      </List>
    </>
  );
}
