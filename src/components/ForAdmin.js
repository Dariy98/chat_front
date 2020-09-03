import React from "react";
import { Divider } from "@material-ui/core";

import AllUsersListAdmin from "./AllUsersAdmin";
import OnlineUsersAdmin from "./OnlineUsersAdmin";

export default function AdminView({ allUsers, socket, user }) {
  const onBan = (userId) => {
    socket.emit("ban", { id: userId });
    console.log(`user id - ${userId} is baned`);
  };

  const onUnBan = (userId) => {
    socket.emit("unban", { id: userId });
    console.log(`user id - ${userId} is Unbaned`);
  };

  const onMute = (userId) => {
    socket.emit("mute", { id: userId });
    console.log(`user id - ${userId} is mute`);
  };

  const onUnMute = (userId) => {
    socket.emit("unmute", { id: userId });
    console.log(`user id - ${userId} is Unmute`);
  };

  return (
    <>
      <Divider />
      <OnlineUsersAdmin
        allUsers={allUsers}
        onBan={onBan}
        onUnBan={onUnBan}
        onMute={onMute}
        onUnMute={onUnMute}
      />
      <Divider />
      <AllUsersListAdmin
        allUsers={allUsers}
        onBan={onBan}
        onUnBan={onUnBan}
        onMute={onMute}
        onUnMute={onUnMute}
      />
    </>
  );
}
