import React from "react";
import {
  Grid,
  Typography,
  ListItem,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";

import AdminView from "./ForAdmin";

export default function UserList({ onlineUsers }) {
  let isAdmin = false;
  // console.log("admin", isAdmin);
  // console.log("on", onlineUsers);

  return (
    <Grid item xs={4}>
      <Grid item xs={12}>
        <Typography variant="h6">Users online:</Typography>
        <div>
          {isAdmin ? (
            <AdminView />
          ) : (
            <List>
              {onlineUsers
                ? onlineUsers.map((user) => {
                    if (user.isOnline) {
                      return (
                        <ListItem key={user._id}>
                          <ListItemAvatar>
                            <Avatar></Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={user.nickname} />
                        </ListItem>
                      );
                    }
                  })
                : null}
            </List>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
