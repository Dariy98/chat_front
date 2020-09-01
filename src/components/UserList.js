import React, { useEffect } from "react";
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

export default function UserList({ onlineUsers, socket }) {
  let isAdmin = true;
  // console.log("admin", isAdmin);
  // console.log("on", onlineUsers);
  // useEffect(() => {
  //   onlineUsers;
  // }, []);

  return (
    <Grid item xs={4}>
      <Grid item xs={12}>
        <div>
          {isAdmin ? (
            <AdminView onlineUsers={onlineUsers} socket={socket} />
          ) : (
            <>
              <Typography variant="h6">Users online:</Typography>
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
            </>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
