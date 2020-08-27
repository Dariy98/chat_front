import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";

import Messages from "./Messages";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  const addMessage = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.length <= 200) {
        setMessage(e.target.value);
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
        <Messages message={message} />
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
}
