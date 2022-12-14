import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const user = useSelector((aState) => aState.user.user);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState({
    userExistErrorMsg: "",
    detailFetchErrorMsg: "",
    nameErrorMsg: "",
    accountNumberErrorMsg: "",
    aadharNumberErrorMsg: "",
    panNumberErrorMsg: "",
    balanceErrorMsg: "",
  });
  const name = useRef();
  const accountNumber = useRef();
  const aadharNumber = useRef();
  const panNumber = useRef();
  const balance = useRef();

  const onSubmit = (aEvent) => {
    aEvent.preventDefault();
    const enteredName = name.current.value;
    const enteredAccountNumber = accountNumber.current.value;
    const enteredAdharNumber = aadharNumber.current.value;
    const enteredPanNumber = panNumber.current.value;
    const enteredBalance = balance.current.value;

    if (
      !isFormValid(
        enteredName,
        enteredAccountNumber,
        enteredAdharNumber,
        enteredPanNumber,
        enteredBalance
      )
    ) {
      return;
    }
    const existUser = user.find(
      (aUser) => aUser.aadhar_number === enteredAdharNumber
    );
    if(existUser) {
      setErrorMsg({ userExistErrorMsg: "UserAccountExist" });
      return;
    }
    const inputData = {
      enteredName,
      enteredAccountNumber,
      enteredAdharNumber,
      enteredPanNumber,
      enteredBalance,
    };

    fetchLogin(inputData);
  };

  const fetchLogin = async (inputData) => {
    const responseOfApi = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify({
        name: inputData.enteredName,
        account_number: inputData.enteredAccountNumber,
        aadhar_number: inputData.enteredAdharNumber,
        pan_number: inputData.enteredPanNumber,
        balance: +inputData.enteredBalance,
        start_balance: +inputData.enteredBalance,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseOfData = await responseOfApi.json();
    if (!responseOfApi.ok) {
      setErrorMsg({
        detailFetchErrorMsg: responseOfData.error.message,
      });
      return;
    }
    navigate("/home");
  };

  const isFormValid = (
    enteredName,
    enteredAccountNumber,
    enteredAdharNumber,
    enteredPanNumber,
    enteredBalance
  ) => {
    const nameErrorMsg = isNameValid(enteredName);
    const accountNumberErrorMsg = isValid(enteredAccountNumber);
    const aadharNumberErrorMsg = isValid(enteredAdharNumber);
    const panNumberErrorMsg = isValid(enteredPanNumber);
    const balanceErrorMsg = isBalanceValid(enteredBalance);

    setErrorMsg({
      nameErrorMsg: nameErrorMsg,
      accountNumberErrorMsg: accountNumberErrorMsg,
      aadharNumberErrorMsg: aadharNumberErrorMsg,
      panNumberErrorMsg: panNumberErrorMsg,
      balanceErrorMsg: balanceErrorMsg,
    });

    if (
      (nameErrorMsg ||
        accountNumberErrorMsg ||
        aadharNumberErrorMsg ||
        panNumberErrorMsg ||
        balanceErrorMsg) === ""
    ) {
      return true;
    }
  };

  const isNameValid = (aUserInput) => {
    return !aUserInput ? `Name is required` : "";
  };

  const isValid = (aUserInput) => {
    return aUserInput === ""
      ? "Fill the details"
      : aUserInput.length < 8
      ? "Enter valid accountNumber"
      : "";
  };

  const isBalanceValid = (aUserInput) => {
    return aUserInput === ""
      ? "Fill the details"
      : aUserInput < 1000
      ? "Enter valid Balance"
      : "";
  };

  const onAbort = () => {
    navigate("/home");
  };

  return (
    <main className="body">
      <section className="login">
        <div className="login-banner">
          <div className="ls-banner rg-banner"></div>
          <div className="login-area">
            <div className="login-heading">
              <h1>Create Account</h1>
              <p className="errorField">{errorMsg.userExistErrorMsg}</p>
            </div>
            <div className="login-inner">
              <input type="text" placeholder="Name" ref={name} />
              <p className="errorField">{errorMsg.nameErrorMsg}</p>
              <input
                type="number"
                placeholder="AccountNumber"
                ref={accountNumber}
              />
              <p className="errorField">{errorMsg.accountNumberErrorMsg}</p>
              <input
                type="text"
                placeholder="AadharNumber"
                ref={aadharNumber}
              />
              <p className="errorField">{errorMsg.aadharNumberErrorMsg}</p>

              <input type="text" placeholder="PanNumber" ref={panNumber} />
              <p className="errorField">{errorMsg.panNumberErrorMsg}</p>

              <input type="number" placeholder="Balance" ref={balance} />
              <p className="errorField">{errorMsg.balanceErrorMsg}</p>

              <div className="btn-ls">
                <button type="submit" className="btn" onClick={onSubmit}>
                  Submit
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
export default Register;
