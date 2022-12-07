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
    <form className="box">
    <h1 className="heading">WELCOME</h1>
    <div className="button-wrapper">
    <button className="login" onClick={redirectToLogin}>Login</button>
    <button className="login" onClick={redirectToRegistration}>Register<i class="fa fa-user" aria-hidden="true"></i></button>
    </div>
    </form>
  )
}
export default Home;
