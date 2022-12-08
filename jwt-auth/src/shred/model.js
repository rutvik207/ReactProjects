import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./model.css";

const UserForm = (aProps) => {

const amount =useRef();
const takeMoneyInput =(e)=>{
  e.preventDefault();
  const inputAmount = amount.current.value;
  console.log(inputAmount);
  aProps.checkType(inputAmount);
  aProps.hideModel();
  }

  return (
    <div className="wrapper">
      <div className="player-box-name">
        <label>Name</label>
        <input
          type="text"
          name="name"
          ref={amount}
        />
      </div>
      <div className="button-form">
        <button onClick={takeMoneyInput}>
          add
        </button>
        <button onClick={aProps.hideModel}>Cancel</button>
      </div>
    </div>
  );
};
export default UserForm;
