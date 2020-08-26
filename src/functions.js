//client
import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:3001");

export function connectWithSocket() {
  //   socket.on("timer", (timestamp) => cb(null, timestamp));
  socket.on("connect", console.log(socket.connected));
  socket.emit("subscribeToTimer", 1000);
}

export const sendDataOnServer = (event, name, email) => {
  event.preventDefault();
  fetch("http://localhost:3001/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email: email,
        nickname: name,
      },
    }),
  });
  console.log("data send...", name, email);
};
