import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

export default function AddMessage({ socket }) {
  const classes = useStyles();

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
    <div className="footer">
      <TextField
        id="standard-full-width"
        label="Label"
        style={{ margin: 8 }}
        placeholder="Placeholder"
        helperText="Full width!"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onKeyUp={(e) => addMessage(e)}
      />
    </div>
  );
}
