import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./model.css";

const TransactionForm = (aProps) => {
  const[error,errorMsg]=useState()
  const amount = useRef();
  const takeMoneyInput = (e) => {
    e.preventDefault();
    const inputAmount = +amount.current.value;
    const isValidMsg =aProps.checkType(inputAmount);
    errorMsg(isValidMsg);
    if(isValidMsg) {
      return;
    }
    aProps.hideModel();
  };

  return (
    <div className="model-form">
      <div className="wrapper">
        <div className="inner-form">
          <input
            placeholder={
              aProps.actionType != "saving"
                ? "Enter Your Amount"
                : "Enter Your Days"
            }
            type="text"
            name="name"
            ref={amount}
          />
        </div>
        <p>{error}</p>
        <div className="btn-ls">
          <button onClick={takeMoneyInput} className="btn-form">
            add
          </button>
          <button onClick={aProps.hideModel} className="btn-form">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default TransactionForm;
