import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionForm from "../shred/model";
import "./dashBoard.css";
import { userActions } from "../home/store/userStore";
import { statementAction } from "./store/statementStore";

const DashBoard = () => {
  const loggedUser = useSelector((aState) => aState.user.loggedUserDetails);
  const [actionType, setActionType] = useState();
  const [showModel, setShowModel] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const setUserActionType = (e) => {
    e.preventDefault();
    const takeType = e.target.value;
    console.log(takeType);
    setActionType(takeType);
    setShowModel(!showModel);
  };

  const hideModel = () => {
    console.log("rutvik");
    setShowModel(!showModel);
  };

  const checkType = (aAmount) => {
    if (actionType === "withdraw") {
      console.log(aAmount);
      const isValidMsg= withdraw(aAmount);
      console.log(isValidMsg);
      return isValidMsg;
    }
    if (actionType === "deposit") {
      deposit(aAmount);
      return;
    }
    if (actionType === "neft") {
      const isValidMsg= neft(aAmount);
      console.log(isValidMsg);
      return isValidMsg;
    }
    if (actionType === "saving") {
      const isValidMsg= saving(aAmount);
      console.log(isValidMsg);
      return isValidMsg;
    }
  };

  const addStatement = async (aStatement, aAddBalance) => {
    console.log(aStatement);
    console.log(loggedUser.id);
    const responseOfApi = await fetch("http://localhost:3000/history", {
      method: "POST",
      body: JSON.stringify({
        userId: loggedUser.id,
        date: aStatement.date,
        type: aStatement.actionType,
        amount: +aStatement.aAmount,
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
    dispatch(statementAction.addStatement(responseOfData));
    dispatch(userActions.upDateBalance(aAddBalance));
  };

  const editUserAccount = async (aBalance) => {
    const responseOfApi = await fetch(
      `http://localhost:3000/users/${loggedUser.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name: loggedUser.name,
          account_number: loggedUser.account_number,
          aadhar_number: loggedUser.aadhar_number,
          pan_number: loggedUser.pan_number,
          balance: aBalance,
          start_balance: loggedUser.start_balance,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseOfData = await responseOfApi.json();
    console.log(responseOfData);
    if (!responseOfApi.ok) {
      setError(responseOfData.error.message);
      return;
    }
  };

  const getStatement = (aAmount) => {
    const date = new Date().toLocaleDateString();
    const statement = {
      date,
      actionType,
      aAmount,
    };
    return statement;
  };

  const getBalance = (aAmount, aCharge) => {
    const charge = (aCharge / 100) * aAmount;
    const addBalance = loggedUser.balance - aAmount - charge;
    return addBalance;
  };

  const withdraw = (aAmount) => {
    console.log(typeof loggedUser.balance);
    console.log(typeof aAmount);
    console.log(aAmount);
    let statement, balance;
    switch (true) {
      case loggedUser.balance <= aAmount:
        console.log("ghuysoke nay");
        const errorMsg="sorry sir you dont have a enough balance";
        return errorMsg;
      case aAmount >= 10000 && aAmount <= 19999:
        statement = getStatement(aAmount);
        balance = getBalance(aAmount, 1);
        addStatement(statement, balance);
        editUserAccount(balance);
        break;
      case aAmount >= 20000 && aAmount <= 39999:
        statement = getStatement(aAmount);
        balance = getBalance(aAmount, 2);
        addStatement(statement, balance);
        editUserAccount(balance);
        break;
      case aAmount >= 40000:
        statement = getStatement(aAmount);
        balance = getBalance(aAmount, 5);
        addStatement(statement, balance);
        editUserAccount(balance);
        break;

      default:
        statement = getStatement(aAmount);
        balance = getBalance(aAmount, 0);
        addStatement(statement, balance);
        editUserAccount(balance);
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
  const deposit = (aAmount) => {
    const charge = (1 / 100) * aAmount;
    const addBalance = loggedUser.balance + aAmount - charge;
    const statement = getStatement(aAmount);
    addStatement(statement, addBalance);
    editUserAccount(addBalance);
  };
  const neft = (aAmount) => {
    let statement, balance;
    switch (true) {
      case loggedUser.balance <= aAmount:
        const errorMsg="sorry sir you dont have a enough balance";
        return errorMsg;
      case aAmount <= 50000:
        statement = getStatement(aAmount);
        balance = getBalance(aAmount, 1);
        addStatement(statement, balance);
        editUserAccount(balance);
        break;
      case aAmount > 50000:
        statement = getStatement(aAmount);
        balance = getBalance(aAmount, 3);
        addStatement(statement, balance);
        editUserAccount(balance);
        break;
    }
  };
  const saving = (aYear) => {
    const accruedInterest = loggedUser.balance * 0.05 * aYear;
    const savingBalance = loggedUser.balance + accruedInterest;
    console.log(savingBalance);
   const balance = `your future balance is ${savingBalance}`;
   return balance;
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

      {showModel && (
        <TransactionForm
        // rutvik={rutvik}
          // message={message}
          // errorMsg={error}
          actionType={actionType}
          checkType={checkType}
          hideModel={hideModel}
        />
      )}
    </>
  );
};
export default DashBoard;
