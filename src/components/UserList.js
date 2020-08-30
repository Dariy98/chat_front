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

export default function UserList() {
  let isAdmin = false;
  // console.log("admin", isAdmin);

  return (
    <Grid item xs={4}>
      <Grid item xs={12}>
        <Typography variant="h6">Users online:</Typography>
        <div>
          {isAdmin ? (
            <AdminView />
          ) : (
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText primary="user name" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText primary="user name" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText primary="user name" />
              </ListItem>
            </List>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
