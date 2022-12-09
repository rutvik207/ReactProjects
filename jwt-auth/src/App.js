import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./home/home";
import LoginForm from "./login-registration/login";
import Register from "./login-registration/register";
import DashBoard from "./dashboard-history/dashBoard";
import Navbar from "./navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Statement from "./dashboard-history/statement";

function App() {
  const isLogin = useSelector((aState) => aState.user.isLogin);
  const navigate = useNavigate();
  // useEffect(()=>{
  //   if(!isLogin){
  //     navigate("/home")
  //   }
  // },[])
  return (
    <>
      <div className="rutvik123">
        {isLogin && (
          <div>
            <Navbar />
          </div>
        )}
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/dashBoard" element={<DashBoard />} />
            <Route path="/statement" element={<Statement />} />

          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
