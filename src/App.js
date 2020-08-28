import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";

import "./App.css";
import ChatPage from "./components/ChatPage";
import { sendDataOnServer } from "./functions";

function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const validateUsername = (value) => {
    let error;
    if (/^[^%/&?,';:!-+!@#$^*)(]{3,15}$/i.test(value)) {
      setName(value);
    } else {
      error = "At least 3 characters and no special characters!";
      setName("");
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (value === "admin") {
      error = "Nice try!";
      setPassword("");
    }
    if (value.length < 6) {
      error = "to short";
      setPassword("");
    } else {
      setPassword(value);
    }
    return error;
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/">
            <h1 className="auth_title"> Login or register please.</h1>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ errors, touched, validateField, validateForm }) => (
                <Form action="/" method="post" className="form_auth">
                  <Field
                    name="username"
                    validate={validateUsername}
                    placeholder="user name"
                    className="input_auth"
                  />
                  {errors.username && touched.username && (
                    <div className="error-div">{errors.username}</div>
                  )}
                  <Field
                    name="password"
                    placeholder="password"
                    className="input_auth"
                    type="password"
                    validate={validatePassword}
                  />
                  {errors.password && touched.password && (
                    <div className="error-div">{errors.password}</div>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={(e) => {
                      sendDataOnServer(e, name, password);
                    }}
                  >
                    Sing in
                  </Button>
                </Form>
              )}
            </Formik>
          </Route>

          <Route exact path="/chat">
            <ChatPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
