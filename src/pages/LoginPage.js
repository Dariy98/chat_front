import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

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

  const generateRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const sendDataOnServer = (event, name, password) => {
    event.preventDefault();

    let user;
    if (password === "" || name === "") {
      return alert("Enter correct data!");
    }
    user = {
      nickname: name,
      password: password,
      color: generateRandomColor(),
    };

    const response = fetch("http://localhost:3001/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());

    //add token in localStorage
    response.then((data) => {
      localStorage.clear();
      if (data.token) {
        localStorage.setItem("token", data.token);
        history.push("/chat");
      } else {
        alert("Not valid data.");
        history.push("/login");
      }
    });
    console.log("data send...");
  };

  return (
    <>
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
    </>
  );
}
