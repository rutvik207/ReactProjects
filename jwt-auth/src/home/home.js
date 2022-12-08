import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"
const Home =() =>{

const navigate = useNavigate();

 const redirectToLogin =() =>{
  navigate("/login");
 }

 const redirectToRegistration =() =>{
  navigate("/user/register");
 }
  return(
    <div className="hello">
    <button className="loginHome1" onClick={redirectToLogin}>Login</button>
    <button className="loginHome2" onClick={redirectToRegistration}>Register</button>
    </div>
  )
}
export default Home;
