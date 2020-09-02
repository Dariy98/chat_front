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
import decode from "jwt-decode";

import AdminView from "./ForAdmin";

export default function UserList({ allUsers, socket, token }) {
  const user = token && decode(token);

  return (
    <Grid item xs={4}>
      <Grid item xs={8}>
        <div>
          {user && user.isAdmin ? (
            <AdminView allUsers={allUsers} socket={socket} />
          ) : (
            <>
              <Typography variant="h6">Users online:</Typography>
              <List>
                {allUsers
                  ? allUsers.map((user) => {
                      if (user.isOnline) {
                        return (
                          <ListItem key={user._id}>
                            <ListItemAvatar>
                              <Avatar style={{ backgroundColor: user.color }}>
                                {user.nickname.slice(0, 3)}
                              </Avatar>
                            </ListItemAvatar>
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
          )}
        </div>
      </Grid>
    </Grid>
  );
}
