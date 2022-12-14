import React from "react";
import { useNavigate } from "react-router-dom";
import "./sideDrower.css";

const SideDrower = () => {
  const navigate = useNavigate();
  const redirectToMatches = () => {
    navigate(`/matches`);
  };
  const redirectToTeams = () => {
    navigate(`/teams`);
  };
  return (
    <nav>
      <p onClick={redirectToTeams}>Teams</p>
      <p onClick={redirectToMatches}>Matches</p>
    </nav>
  );
};
export default SideDrower;
