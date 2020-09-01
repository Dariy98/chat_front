import React, { useEffect } from "react";
import { useHistory } from "react-router";

const IndexPage = () => {
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      history.push("/login");
    } else {
      history.push("/chat");
    }
  }, [history]);
  return <div></div>;
};

export default IndexPage;
