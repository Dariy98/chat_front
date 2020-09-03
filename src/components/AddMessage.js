import React from "react";
import TextField from "@material-ui/core/TextField";

export default function AddMessage({ socket }) {
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

  return (
    <>
      <TextField
        id="standard-full-width"
        label="Add message"
        style={{ padding: 7, width: "50%", border: "1px solid gray" }}
        placeholder="Write message"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onKeyUp={(e) => addMessage(e)}
      />
    </>
  );
}
