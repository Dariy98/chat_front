import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

import Messages from "../components/Messages";
import UserList from "../components/UserList";

export default function ChatPage() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const history = useHistory();
  const token = localStorage.getItem("token");

  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
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
        setAllUsers(users);
      });

      newSocket.on("message", (message) => {
        if (typeof message === "string") {
          alert(message);
        } else {
          setMessages((messages) => [...messages, message]);
        }
      });

      setSocket(newSocket);
    } else {
      history.push("/");
    }
  }, [token]);

  const addMessage = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.length <= 200) {
        let message = e.target.value;
        if (message === "") {
          return;
        }

        socket.emit("chatMessage", {
          text: message,
          date: new Date(),
        });

        e.target.value = "";
      } else {
        alert("Limited to 200 characters!");
      }
    }
  };

  const signOut = () => {
    deleteToken();
    socket.disconnect();
    history.push("/login");
  };

  return (
    <div>
      <Grid container xs={12}>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          onClick={signOut}
        >
          Sign Out
        </Button>
        <UserList allUsers={allUsers} socket={socket} token={token} />
        <Grid>
          <Messages messages={messages} />
          <TextField
            id="standard-basic"
            label="Write message"
            onKeyUp={(e) => addMessage(e)}
          />
          <Button variant="contained" color="primary" disableElevation>
            Add message
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
