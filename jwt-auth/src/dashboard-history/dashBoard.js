import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "../shred/model";
import "./dashBoard.css";
import { userActions } from "../login-registration/store/loginRegisterStore";

const DashBoard = () => {
  const loggedUser = useSelector((aState) => aState.user.loggedUserDetails);
  // const users = useSelector((aState) => aState.user.user);
  const [actionType, setActionType] = useState();
  const [showModel, setShowModel] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const setUserActionType = (e) => {
    setError("");
    e.preventDefault();
    const takeType = e.target.value;
    console.log(takeType);
    setActionType(takeType);
    setShowModel(!showModel);
  };

  const hideModel = () => {
    setShowModel(!showModel);
  };

  const checkType = (amount) => {
    if (actionType === "withdraw") {
      withdraw(amount);
    }
    if (actionType === "deposit") {
      deposit(amount);
    }
    if (actionType === "neft") {
      neft(amount);
    }
    if (actionType === "saving") {
      saving(amount);
    }
  };

  const addStatement = async (statement, addBalance) => {
    console.log(statement);
    console.log(loggedUser.id);
    const responseOfApi = await fetch("http://localhost:3000/history", {
      method: "POST",
      body: JSON.stringify({
        userId: loggedUser.id,
        date: statement.date,
        type: statement.actionType,
        amount: statement.amount,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseOfData = await responseOfApi.json();
    console.log(responseOfData);
    if (!responseOfApi.ok) {
      setError(responseOfData.error.message);
      return;
    }
    dispatch(userActions.addStatement(responseOfData));
    dispatch(userActions.upDateBalance(addBalance));
  };

  const getStatement = (amount) => {
    const date = new Date().toLocaleDateString();
    const statement = {
      date,
      actionType,
      amount,
    };
    return statement;
  };

  const getBalance = (amount, aCharge) => {
    const charge = (aCharge / 100) * amount;
    const addBalance = loggedUser.balance - amount - charge;
    return addBalance;
  };

  const withdraw = (amount) => {
    let statement, balance;
    switch (true) {
      case loggedUser.balance <= amount:
        setError("sorry sir you dont have a enough balance");
        break;
      case amount >= 10000 && amount <= 19999:
        statement = getStatement(amount);
        balance = getBalance(amount, 1);
        addStatement(statement, balance);
        break;
      case amount >= 20000 && amount <= 39999:
        statement = getStatement(amount);
        balance = getBalance(amount, 2);
        addStatement(statement, balance);
        break;
      case amount >= 40000:
        statement = getStatement(amount);
        balance = getBalance(amount, 5);
        addStatement(statement, balance);
        break;

      default:
        statement = getStatement(amount);
        balance = getBalance(amount, 0);
        addStatement(statement, balance);
        break;
    }
    // if(loggedUser.balance <= amount){
    //   setError("sorry sir you dont have a enough balance");
    //   return;
    // }
    // if (amount >= 10000 && amount <= 19999) {
    //   const statement = getStatement(amount);
    //   const balance = getBalance(amount,1)
    //   addStatement(statement,balance);
    //   return;
    // }
    // if(amount >= 20000 && amount <= 39999){
    //   const statement = getStatement(amount);
    //   const balance = getBalance(amount,2)
    //   addStatement(statement,balance);
    //   return;
    // }
    // if(amount>=40000){
    //   const statement = getStatement(amount);
    //   const balance = getBalance(amount,5)
    //   addStatement(statement,balance);
    //   return;
    // }
    // const statement = getStatement(amount);
    // const balance = getBalance(amount,0)
    // addStatement(statement,balance);
  };
  const deposit = (amount) => {
    const charge = (1 / 100) * amount;
    const addBalance = loggedUser.balance + amount - charge;
   const statement = getStatement(amount);
    addStatement(statement, addBalance);
  };
  const neft = (amount) => {
    let statement, balance;
    switch (true) {
      case loggedUser.balance <= amount:
        setError("sorry sir you dont have a enough balance");
        break;
      case amount <= 50000:
        statement = getStatement(amount);
        balance = getBalance(amount, 1);
        addStatement(statement, balance);
        break;
      case amount > 50000:
        statement = getStatement(amount);
        balance = getBalance(amount, 3);
        addStatement(statement, balance);
        break;
    }
  };
  const saving = (aYear) => {
    const accruedInterest = (loggedUser.balance * 0.05)* aYear;
    const savingBalance = loggedUser.balance + accruedInterest;
    console.log(savingBalance);
  };
  return (
    <>
      <div className="dashboard-main">
        <div className="dashboard-blog">
          <div className="dashboard-details">
            <h1>PLEASE CHOOSE YOU PROCESS</h1>
            <div className="dashboard-btn">
              <button
                className="btn-wdnv"
                value="withdraw"
                onClick={setUserActionType}
              >
                WITHDRAW
              </button>
              <button
                className="btn-wdnv"
                value="deposit"
                onClick={setUserActionType}
              >
                DEPOSIT
              </button>
            </div>
            <div className="dashboard-btn">
              <button
                className="btn-wdnv"
                value="neft"
                onClick={setUserActionType}
              >
                NEFT TRANSFER
              </button>
              <button
                className="btn-wdnv"
                value="saving"
                onClick={setUserActionType}
              >
                SAVING INTEREST
              </button>
            </div>
            <p>{error}</p>
          </div>
          <div className="dashboard-img">
            <img src="image/5755627.png" />
          </div>
        </div>
      </div>

      {showModel && <UserForm checkType={checkType} hideModel={hideModel} />}
    </>
  );
};
export default DashBoard;
