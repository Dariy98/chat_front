import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@material-ui/core";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

import Messages from "./Messages";

export default function ChatPage() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const history = useHistory();

  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const newSocket = io("http://localhost:3001", {
        query: {
          token: localStorage.getItem("token"),
        },
      });

      newSocket.on("disconnect", () => {
        deleteToken();
        history.push("/login");
      });

      newSocket.on("result", (result) => {
        const users = result;
        setOnlineUsers(users);
      });

      newSocket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });

      newSocket.on("ban", (user) => {
        console.log("userban", user);
        // socket.emit("ban user", { id: userId });
      });

      setSocket(newSocket);
    }
  }, []);

  const addMessage = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.length <= 200) {
        let message = e.target.value;

        socket.emit("chatMessage", message);

        e.target.value = "";
      } else {
        alert("Limited to 200 characters!");
      }
    }
  };

  //example: 201 - ири ирир рирывааыааввыа ыв выа ыва  ипа d dfg  km  mkmkm mkmkm kmkk v dmk bhbhbhbhbhb bhbhbhbhbhbhb jij sv8u  jjijijij jijijii s v jiv f ij ij vi vj ijijijijij jiji jijiji jjiji jjiji sdf sdf aswecdx x
  return (
    <div>
      <div className="chat-box">
        <Messages
          messages={messages}
          onlineUsers={onlineUsers}
          socket={socket}
        />
      </div>
      <>
        <Grid item xs={12}>
          <TextField
            id="standard-basic"
            label="Write message"
            onKeyUp={(e) => addMessage(e)}
          />
        </Grid>
      </>
    </div>
  );
}
