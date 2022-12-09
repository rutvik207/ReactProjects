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
    <section className="formback">
    <div className="wrapper">
      <div className="player-box-name">
        <input
        placeholder="Enter Your Amount"
          type="text"
          name="name"
          ref={amount}
        />
      </div>
      <div className="button-form">
        <button onClick={takeMoneyInput} className="btn-form">
          add
        </button>
        <button onClick={aProps.hideModel} className="btn-form">Cancel</button>
      </div>
    </div>
    </section>
  );
};
export default UserForm;
