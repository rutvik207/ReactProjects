import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./model.css";

const UserForm = (aProps) => {

  const amount =useRef();

const takeMoneyInput =(e)=>{
  e.preventDefault();
  const inputAmount = +amount.current.value;
  aProps.checkType(inputAmount);
  if(aProps.errorMsg){
    console.log(aProps.errorMsg);
    console.log("mehuna")
    return;
  }
  aProps.hideModel();
  }

  return (
    <div className="model-form">
    <div className="wrapper">
      <div className="inner-form">
        <input
        placeholder={(aProps.actionType != "saving") ? "Enter Your Amount" : "Enter Your Days"}
          type="number"
          name="name"
          ref={amount}
        />
      </div>
      <p>{aProps.errorMsg}</p>
      <h3>{aProps.message}</h3>
      <div className="btn-ls">
        <button onClick={takeMoneyInput} className="btn-form">
          add
        </button>
        <button onClick={aProps.hideModel} className="btn-form">Cancel</button>
      </div>
    </div>
    </div>
  );
};
export default UserForm;
