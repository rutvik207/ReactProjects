import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import LoginForm from "./modules/components/login/loginForm";
import PlayerSelection from "./modules/components/matches/playerSelection";
import TeamSelection from "./modules/components/matches/teamSelection";
import PlayerList from "./modules/components/teams/playerList";
import SideDrower from "./sideDrower";
import TeamList from "./modules/components/teams/teamList";
import "./App.css";
import { useSelector } from "react-redux";

const App = () => {
  const isLogin = useSelector((aState) => aState.login.isLoggedIn);
  const navigate=useNavigate();
  useEffect(()=>{
    if(!isLogin){
      navigate("/login")
    }
  },[])
  return (
    <div>
      <div className="wrapper-router">
        {isLogin && (
          <div className="sideDrowarSection">
            <SideDrower />
          </div>
        )}
        <div className="routeSection">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route  path="/teams" element={<TeamList />}/>
            <Route path="/teams/:teamid" element={<PlayerList />} />
            <Route path="/matches" element={<TeamSelection />} />
            <Route path="/matches/:matchTeamId" element={<PlayerSelection />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
