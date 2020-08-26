import React, { useState } from "react";
import "./App.css";
import { connectWithSocket, sendDataOnServer } from "./functions";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const getName = (e) => setName(e.target.value);

  const getEmail = (e) => setEmail(e.target.value);

  return (
    <div className="App">
      <form action="/" method="post">
        <input type="text" placeholder="username" onChange={getName} />
        <input type="text" placeholder="email" onChange={getEmail} />
        <button
          onClick={(e) => {
            connectWithSocket();
            sendDataOnServer(e, name, email);
          }}
        >
          auth
        </button>
      </form>
    </div>
  );
}

export default App;
