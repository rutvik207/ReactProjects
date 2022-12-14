import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./loginStore/loginStore";
import "./loginForm.css";
import { useNavigate } from "react-router-dom";

const api =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkYZ0_Z0aXLr48tGO1S4zDwPJpibuYTNo";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState({
    loginErrorMsg: "",
    emailErrorMsg: "",
    passwordErrorMsg: "",
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/teams");
    }
  });

  const onLogin = (aEvent) => {
    aEvent.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (!isFormValid(enteredEmail, enteredPassword)) {
      return;
    }
    fetchLogin(enteredEmail, enteredPassword);
  };

  const fetchLogin = async (aEnteredEmail, aEnteredPassword) => {
    const responseOfApi = await fetch(`${api}`, {
      method: "POST",
      body: JSON.stringify({
        email: aEnteredEmail,
        password: aEnteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseOfData = await responseOfApi.json();
    if (!responseOfApi.ok) {
      setErrorMsg({
        loginErrorMsg: responseOfData.error.message,
      });
      return;
    }

    dispatch(authActions.login(responseOfData.idToken));
    navigate("/teams");
  };

  const isFormValid = (aEnteredEmail, aEnteredPassword) => {
    const emailErrorMsg = validateField(aEnteredEmail, "email");
    const passwordErrorMsg = validateField(aEnteredPassword, "password");

    setErrorMsg({
      emailErrorMsg: emailErrorMsg,
      passwordErrorMsg: passwordErrorMsg,
    });

    if ((emailErrorMsg || passwordErrorMsg) === "") {
      return true;
    }
  };

  const validateField = (aUserInput, aInputField) => {
    return !aUserInput ? `${aInputField} is blank` : "";
  };

  return (
    <form className="login-box" onSubmit={onLogin}>
      <h1>Login</h1>
      <input type="email" placeholder="Email" ref={emailInputRef} />
      <p>{errorMsg.emailErrorMsg}</p>
      <input type="password" placeholder="Password" ref={passwordInputRef} />
      <p>{errorMsg.passwordErrorMsg}</p>
      <button className="login-button">Login</button>
      <p>{errorMsg.loginErrorMsg}</p>
    </form>
  );
};

export default LoginForm;
