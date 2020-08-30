import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@material-ui/core";
import io from "socket.io-client";
import { withRouter } from "react-router-dom";

import Messages from "./Messages";
import { deleteToken } from "./../functions";

const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  // const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const setupSocket = () => {
    const token = localStorage.getItem("token");

    // if (token && !socket) {
    if (token) {
      const newSocket = io("http://localhost:3001", {
        query: {
          token: localStorage.getItem("token"),
        },
      });

      newSocket.on("disconnect", () => {
        deleteToken();
        // setSocket(null);
        setTimeout(setupSocket, 3000);
        console.log("socket connected");
      });

      newSocket.on("connect", () => {
        console.log("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };

  useEffect(() => {
    setupSocket();
  }, []);

  const addMessage = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.length <= 200) {
        let message = e.target.value;

        socket.on("message", (message) => {
          const newMessages = [...messages, message];
          setMessages(newMessages);

          console.log("in main.js", message, messages);

          // outputMessage(message);
        });

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
        <Messages messages={messages} />
      </div>
      <Grid item xs={12}>
        <TextField
          id="standard-basic"
          label="Write message"
          onKeyUp={(e) => addMessage(e)}
        />
      </Grid>
    </div>
  );
};

export default withRouter(ChatPage);
