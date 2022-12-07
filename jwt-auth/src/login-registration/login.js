import React, { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axiox from "axios";

const LoginForm = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState({
    loginErrorMsg: "",
    emailErrorMsg: "",
    passwordErrorMsg: "",
  });

  const email = useRef();
  const password = useRef();

  // useEffect(()=>{
  //   const tocken = localStorage.getItem('token')
  //   if(tocken){
  //     navigate("/teams");
  //   }
  // })

  // const login =(e)=>{
  //   e.preventDefault();
  //   axiox.post("http://localhost:5000/api/auth/login",{
  //     email,
  //     password
  //   }).then((response)=>{
  //     localStorage.setItem("login",JSON.stringify({
  //       userLogin:true,
  //       token:response.data.access_token
  //     }))
  //     setErrorMsg({
  //             loginErrorMsg: "responseOfData.error.message",
  //           });
  //   }).catch((error)=>  setErrorMsg({
  //           loginErrorMsg: error,
  //         }));

  // }

  const onLogin = (aEvent) => {
    aEvent.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
    if (!isFormValid(enteredEmail, enteredPassword)) {
      console.log("jsjshshshshshshshshsh");
      return;
    }
    /* const blog = { enteredEmail, enteredPassword };
    fetchLogin(blog); */
  };

  let jwt = require("jsonwebtoken");
  var token = jwt.sign({});

  /* const fetchLogin = async (blog) => {
    const responseOfApi = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(blog),
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

    // dispatch(authActions.login(responseOfData.idToken));
    // navigate("/teams");
  }; */

  const isFormValid = (aEnteredEmail, aEnteredPassword) => {
    const emailErrorMsg = validateField(aEnteredEmail);
    const passwordErrorMsg = validateField(aEnteredPassword);

    setErrorMsg({
      emailErrorMsg: emailErrorMsg,
      passwordErrorMsg: passwordErrorMsg,
    });

    if ((emailErrorMsg || passwordErrorMsg) === "") {
      return true;
    }
  };

  const validateField = (aUserInput) => {
    return !aUserInput ? `Please Enter Valid Input` : "";
  };

  const onAbort = () => {
    navigate("/home");
  };
  return (
    <form className="login-box">
      <h1>Login</h1>
      {/* <div className="input-field"> */}
      {/* <label>hello</label> */}
      <input type="email" placeholder="Account Number" ref={email} />
      {/* </div> */}
      <p>{errorMsg.emailErrorMsg}</p>
      {/* <div className="input-field"> */}
      {/* <label>hello</label> */}
      <input type="password" placeholder="Aadhar Number" ref={password} />
      {/* </div> */}
      <p>{errorMsg.passwordErrorMsg}</p>

      <div className="button-wrap">
        <button className="login-button" onClick={onLogin}>
          Login
        </button>
        <button className="login-button" onClick={onAbort}>
          cancel
        </button>
      </div>
      <p>{errorMsg.loginErrorMsg}</p>
    </form>
  );
};

export default LoginForm;
