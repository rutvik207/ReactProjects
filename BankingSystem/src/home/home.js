import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { userActions } from "./store/userStore";
import { statementAction } from "../dashboard-history/store/statementStore";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetchErrorMsg, setFetchErrorMsg] = useState();
  useEffect(() => {
    fetchUser();
    fetchStatement();
  }, []);

  const fetchUser = async () => {
    const responseOfApi = await fetch("http://localhost:3000/users");
    const responseOfData = await responseOfApi.json();
    if (!responseOfApi.ok) {
      setFetchErrorMsg(responseOfData.error.message);
      return;
    }
    dispatch(userActions.storeUsers(responseOfData));
  };

  const fetchStatement = async () => {
    const responseOfApi = await fetch("http://localhost:3000/history");
    const responseOfData = await responseOfApi.json();
    if (!responseOfApi.ok) {
      setFetchErrorMsg(responseOfData.error.message);
      return;
    }
    dispatch(statementAction.storeStatement(responseOfData));
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const redirectToRegistration = () => {
    navigate("/user/register");
  };
  return (
    <div className="root">
      {fetchErrorMsg && (
        <div className="error-Blog">
          <p>{fetchErrorMsg}</p>
        </div>
      )}
      <button className="login-btn" onClick={redirectToLogin}>
        Login
      </button>
      <button className="onCancel-btn" onClick={redirectToRegistration}>
        Register
      </button>
    </div>
  );
};
export default Home;
