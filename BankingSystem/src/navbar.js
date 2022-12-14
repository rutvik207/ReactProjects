import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "./login-registration/store/loginRegisterStore";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirectToDashboard = () => {
    navigate(`/dashBoard`);
  };
  const redirectToStatement = () => {
    navigate(`/statement`);
  };
  const onLogout = () => {
    dispatch(authActions.isLogin(false));
    navigate(`/home`);
  };
  return (
    <>
      <div class="btn-blog">
        <button class="statement-btn" onClick={redirectToDashboard}>
          Dashboard
        </button>
        <button class="statement-btn" onClick={redirectToStatement}>
          Statement
        </button>
      </div>
      <button class="logout-btn" onClick={onLogout}>
        LogOut
      </button>
    </>
  );
};
export default Navbar;
