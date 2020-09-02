import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
// import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import MiniDrawer from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div className="App">
          <Route path={["/login", "/"]} render={() => <LoginPage />} exact />
          <Route path="/chat" render={() => <MiniDrawer />} exact />
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
