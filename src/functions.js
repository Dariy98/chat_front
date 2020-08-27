import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:3001/");

export function connectWithSocket() {
  //   socket.on("timer", (timestamp) => cb(null, timestamp));
  socket.on("connect", console.log(socket.connected));
  // socket.emit("subscribeToTimer", 1000);
}

//возможно нужен будет счётчик для запросов
//чтобы не больше одного
export const sendDataOnServer = (event, email, password, name) => {
  event.preventDefault();
  let user;
  if (email === "" && password === "" && name === "") {
    return alert("Enter correct data!");
  } else {
    user = {
      email: email,
      password: password,
      nickname: name,
    };

    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log("data send...", user);
  }
};
