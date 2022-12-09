import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const redirectToDashboard = () => {
    navigate(`/dashBoard`);
  };
  const redirectToStatement = () => {
    navigate(`/statement`);
  };
  return (
    <div class="btn-blog">
      <button class="statement-btn" onClick={redirectToDashboard}>Dashboard</button>
      <button class="statement-btn" onClick={redirectToStatement}>Statement</button>
    </div>
  );
};
export default Navbar;
