import React from "react";
import AddMessage from "./AddMessage";

export default function Footer({ socket }) {
  return (
    <div className="footer">
      <AddMessage socket={socket} />
    </div>
  );
}
