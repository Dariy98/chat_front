import React, { useEffect } from "react";

const IndexPage = (props) => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      props.history.push("/login");
    } else {
      props.history.push("/chat");
    }
    // eslint-disable-next-line
  }, [0]);
  return <div></div>;
};

export default IndexPage;
