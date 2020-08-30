// import decode from "jwt-decode";

// import openSocket from "socket.io-client";
// import jwt from "socketio-jwt";
// import io from "socket.io-client";

// const socket = openSocket("http://localhost:3001/");
// const socket = io.connect("localhost:3001?token=dfsdfsdfsdfsdfs");
// export function connectWithSocket() {
//   //   socket.on("timer", (timestamp) => cb(null, timestamp));
//   // socket.on("connect", console.log(socket.connected));
//   socket.on("connection", () => {
//     console.log("nen", socket.connected);
//     socket
//       .emit("authenticate", { token: jwt }) //send the jwt
//       .on("authenticated", () => {
//         //do other things
//       })
//       .on("unauthorized", (msg) => {
//         console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
//         throw new Error(msg.data.type);
//       });
//   });
//   // socket.emit("subscribeToTimer", 1000);
// }

// socket.on("connect", () => {
//   socket
//     .emit("authenticate", { token: jwt }) //send the jwt
//     .on("authenticated", () => {
//       //do other things
//     })
//     .on("unauthorized", (msg) => {
//       console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
//       throw new Error(msg.data.type);
//     });
// });

// let currentUser;
// let token;

// export let currentUser = {};
export let token;
// export let isAdmin = false;

export const sendDataOnServer = (event, name, password) => {
  event.preventDefault();

  let user;
  if (password === "" || name === "") {
    return alert("Enter correct data!");
  }
  user = {
    nickname: name,
    password: password,
  };

  const response = fetch("http://localhost:3001/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());

  //add token in localStorage
  response.then((data) => {
    localStorage.setItem("token", data.token);

    token = data.token;
  });
  //убрать
  console.log("data send...", user);
  // console.log("currentUser", getCurrentUser());
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};

// export const getCurrentUser = () => {
//   try {
//     let currentUser = decode(token);
//     return currentUser;
//   } catch (e) {
//     return null;
//   }
// };
