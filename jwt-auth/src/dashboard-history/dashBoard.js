import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "../shred/model";
import "./dashBoard.css";
import { userActions } from "../login-registration/store/loginRegisterStore";


const DashBoard = () => {
  const loggedUser = useSelector((aState) => aState.user.loggedUserDetails);
  console.log(loggedUser);
  const [actionType, setActionType] = useState();
  const [showModel, setShowModel] = useState(false);
  const[error,setError]=useState();
 const dispatch =useDispatch();

  const setUserActionType = (e) => {
    e.preventDefault();
    const takeType = e.target.value;
    console.log(takeType);
    setActionType(takeType);
    setShowModel(!showModel);
  };

const hideModel =()=>{
  setShowModel(!showModel);
}

 const checkType = (amount) =>{
if(actionType === "withdraw"){
  withdraw(amount);
}
if(actionType === "deposit"){
  deposit(amount);
}
if(actionType === "neft"){
  neft(amount);
}
if(actionType === "saving"){
  saving(amount);
}
 }

const addStatement =async(statement)=>{
  console.log(statement);
  const responseOfApi = await fetch(`http://localhost:3000/users/${loggedUser.id}/history`, {
    method: "POST",
    body: JSON.stringify({
      date:statement.date,
      type:statement.type,
      amount:statement.amount
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseOfData = await responseOfApi.json();
  console.log(responseOfData);
  if (!responseOfApi.ok) {
    setError(
     responseOfData.error.message,
    );
    return;
  }

}



 const withdraw=(amount)=>{
if(amount >= 10000 && amount <= 19999){
const charge = 1/100*amount;
const addBalance = amount-charge;
const date = new Date().toLocaleDateString();
const statement = {
  date:date,
  type:actionType,
  amount:amount
}
addStatement(statement);
// dispatch(userActions.storeWithdrawDetails([statement,addBalance]));
}
 }
 const deposit=(amount)=>{
console.log("depo");
console.log(amount);

  
}
const neft=(amount)=>{
console.log("nft");
console.log(amount);

  
}
const saving=(amount)=>{
console.log("sav");
console.log(amount);

  
}

  return (
    <>
      <button
        className="buttonDon"
        value="withdraw"
        onClick={setUserActionType}
      >
        Withdraw
      </button>
      <button className="buttonDon" value="deposit" onClick={setUserActionType}>
        Deposit
      </button>
      <button className="buttonDon" value="neft" onClick={setUserActionType}>
        NEFT
      </button>
      <button className="buttonDon" value="saving" onClick={setUserActionType}>
        Saving
      </button>
      {showModel && <UserForm checkType={checkType} hideModel={hideModel}/>}
    </>
  );
};
export default DashBoard;
