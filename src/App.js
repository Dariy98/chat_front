import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";

import "./App.css";
import ChatPage from "./components/ChatPage";
import { connectWithSocket, sendDataOnServer } from "./functions";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter email.";
    }
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      setEmail(value);
    } else {
      error = "Invalid email address";
    }
    return error;
  };

  const validateUsername = (value) => {
    let error;
    if (/^[^%/&?,';:!-+!@#$^*)(]{3,15}$/i.test(value)) {
      setName(value);
    } else {
      error = "At least 3 characters and no special characters!";
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (value === "admin") {
      error = "Nice try!";
    }
    if (value.length < 6) {
      error = "to short";
    } else {
      setPassword(value);
    }
    return error;
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
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
                    name="email"
                    validate={validateEmail}
                    placeholder="email"
                    className="input_auth"
                  />
                  {errors.email && touched.email && (
                    <div className="error-div">{errors.email}</div>
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
                  <Field
                    name="username"
                    validate={validateUsername}
                    placeholder="user name"
                    className="input_auth"
                  />
                  {errors.username && touched.username && (
                    <div className="error-div">{errors.username}</div>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={(e) => {
                      connectWithSocket();
                      sendDataOnServer(e, email, password, name);
                    }}
                  >
                    Sing in
                  </Button>
                </Form>
              )}
            </Formik>

            {/* <form action="/" method="post">
              <input type="text" placeholder="username" onChange={getName} />
              <input type="text" placeholder="email" onChange={getEmail} />

              <button
                href={"/chat"}
                onClick={(e) => {
                  connectWithSocket();
                  sendDataOnServer(e, name, email);
                }}
              >
                auth
              </button>
            </form> */}
          </Route>

          <Route path="/chat">
            <ChatPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
