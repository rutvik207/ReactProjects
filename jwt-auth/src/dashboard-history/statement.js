import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./statement.css";

const Statement = () => {
  const [selectedUserStatments, setSelectedUserStatments] = useState();
  const loggedUser = useSelector((aState) => aState.user.loggedUserDetails);
  // const users = useSelector((aState) => aState.user.user);
  const stateMents = useSelector((aState) => aState.user.stateMents);

  useEffect(() => {
    const selectedUserStatments = stateMents.filter(
      (aData) => aData.userId === loggedUser.id
    );
    console.log(
      "selectedUserStatments=======================",
      selectedUserStatments
    );
    setSelectedUserStatments(selectedUserStatments);
    console.log("loggedUser====================", loggedUser);
  }, []);
  const getCharge = (aAmount, aCharge) => {
    const charge = (aCharge / 100) * aAmount;
    return charge;
  };
  const withdraw = (aAmount) => {
    if (aAmount >= 100 && aAmount <= 500) {
      const charge = getCharge(aAmount, 1);
      return charge;
    }
    if (aAmount >= 600 && aAmount <= 1000) {
      const charge = getCharge(aAmount, 2);
      return charge;
    }
    if (aAmount >= 1100) {
      const charge = getCharge(aAmount, 5);
      return charge;
    }
    const charge = getCharge(aAmount, 0);
    return charge;
  };
  const deposit = (aAmount) => {
    const charge = (1 / 100) * aAmount;
    return charge;
  };
  const neft = (aAmount) => {
    if (aAmount <= 50000) {
      const charge = getCharge(aAmount, 1);
      return charge;
    }
    if (aAmount > 50000) {
      const charge = getCharge(aAmount, 3);
      return charge;
    }
  };
  const renderPlayerListHeader = () => {
    return (
      <tr>
        <th>Sr.No</th>
        <th>TYPE</th>
        <th>AMOUNT</th>
        <th>TAX</th>
        <th>BALANCE</th>
      </tr>
    );
  };

  // console.log("widrwal =-=-=--=-==->", withdraw(20000))
  const renderStatement = () => {
    return selectedUserStatments.map((aData, index) => {
      return (
        <tr className={(aData.type === "withdraw" || aData.type === "neft") ? "red" : "green"} key={aData.id}>
          <td>{index + 1}</td>
          <td>{aData.type}</td>
          <td>{aData.amount}</td>
          <td>
            {aData.type === "withdraw"
              ? withdraw(aData.amount)
              : aData.type === "deposit"
              ? deposit(aData.amount)
              : neft(aData.amount)}
          </td>
          <td>
            {loggedUser.start_balance -
              (aData.type === "withdraw"
                ? withdraw(aData.amount)
                : aData.type === "deposit"
                ? deposit(aData.amount)
                : neft(aData.amount))}
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="playerDataTable">
      <table className="tableData">
        <tbody>
          {renderPlayerListHeader()}
          {selectedUserStatments && renderStatement()}
        </tbody>
      </table>
    </div>
  );
};

export default Statement;
