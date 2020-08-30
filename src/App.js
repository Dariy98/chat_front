import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import ChatPage from "./components/ChatPage";
import IndexPage from "./components/IndexPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={IndexPage} exact />
        <Route path="/login" render={() => <LoginPage />} exact />
        <Route path="/chat" render={() => <ChatPage />} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
