import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./loginRegister.css";
import { userActions } from "./store/loginRegisterStore";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((aState) => aState.user.user);
  const [errorMsg, setErrorMsg] = useState({
    fetchErrorMsg: "",
    accountNumberErrorMsg: "",
    aadharNumberErrorMsg: "",
    loginErrorMsg: "",
  });

  const accountNumber = useRef();
  const adharNumber = useRef();

  useEffect(() => {
    fetchUser();
    fetchStatement();
  }, []);

  const fetchUser = async () => {
    const responseOfApi = await fetch("http://localhost:3000/users");
    const responseOfData = await responseOfApi.json();
    if (!responseOfApi.ok) {
      setErrorMsg({
        fetchErrorMsg: responseOfData.error.message,
      });
      return;
    }
    console.log("responseOfData===================>", responseOfData);
    dispatch(userActions.storeUsers(responseOfData));
  };

 const fetchStatement =async()=>{
  const responseOfApi = await fetch("http://localhost:3000/history");
  const responseOfData = await responseOfApi.json();
  if (!responseOfApi.ok) {
    setErrorMsg({
      fetchErrorMsg: responseOfData.error.message,
    });
    return;
  }
  console.log("responseOfData===================>", responseOfData);
  dispatch(userActions.storeStatement(responseOfData));

  }
  const onLogin = (aEvent) => {
    aEvent.preventDefault();
    const enteredAccountNumber = accountNumber.current.value;
    const enteredAadharNumber = adharNumber.current.value;
    if (!isFormValid(enteredAccountNumber, enteredAadharNumber)) {
      console.log("jsjshshshshshshshshsh");
      return;
    }
    renderUserDetails(enteredAccountNumber, enteredAadharNumber);
  };

  const renderUserDetails = (aEnteredAccountNumber, aEnteredAadharNumber) => {
    const selectedUser =
      user &&
      user.find((aUser) =>
        aUser.account_number == aEnteredAccountNumber &&
        aUser.aadhar_number == aEnteredAadharNumber
          ? aUser
          : setErrorMsg({ loginErrorMsg: "details invalid!" })
      );
    if(!selectedUser){
      return;
    }
    dispatch(userActions.storeLoggedUser(selectedUser));
    dispatch(userActions.isLogin(true))
    navigate("/dashBoard")
  };

  const isFormValid = (aEnteredEmail, aEnteredPassword) => {
    const accountNumberErrorMsg = validateField(aEnteredEmail);
    const aadharNumberErrorMsg = validateField(aEnteredPassword);

    setErrorMsg({
      accountNumberErrorMsg: accountNumberErrorMsg,
      aadharNumberErrorMsg: aadharNumberErrorMsg,
    });

    if ((accountNumberErrorMsg || aadharNumberErrorMsg) === "") {
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
    <main className="body">
      <section className="login">
        <div className="login-banner">
          <div className="ls-banner"></div>
          <div className="login-area">
            <div className="login-heading">
              <h1>Welcome</h1>
              <p>Log In to get started!</p>
            </div>
            <div className="login-inner">
              <input
                type="number"
                placeholder="Account Number"
                ref={accountNumber}
              />
              <p className="errorField">{errorMsg.accountNumberErrorMsg}</p>
              <input
                type="text"
                placeholder="Aadhar Number"
                ref={adharNumber}
              />
              <p className="errorField">{errorMsg.aadharNumberErrorMsg}</p>
              <p className="errorField">{errorMsg.loginErrorMsg}</p>
              <div className="lss-btn">
                <button type="submit" className="btn" onClick={onLogin}>
                  Login
                </button>
                <button type="submit" className="btn" onClick={onAbort}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginForm;
