import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./statement.css";

const Statement = () => {
  const [selectedUserStatements, setSelectedUserStatements] = useState();
  const loggedUser = useSelector((aState) => aState.user.loggedUserDetails);
  const stateMents = useSelector((aState) => aState.statement.stateMents);
  let availableBalance = loggedUser.start_balance;

  useEffect(() => {
    const selectedUserStatements = stateMents.filter(
      (aData) => aData.userId === loggedUser.id
    );

    setSelectedUserStatements(selectedUserStatements);
  }, []);
  const getCharge = (aAmount, aCharge) => {
    const charge = (aCharge / 100) * aAmount;
    return charge;
  };
  const withdraw = (aAmount) => {
    if (aAmount >= 10000 && aAmount <= 19999) {
      const charge = getCharge(aAmount, 1);
      return charge;
    }
    if (aAmount >= 20000 && aAmount <= 39999) {
      const charge = getCharge(aAmount, 2);
      return charge;
    }
    if (aAmount >= 40000) {
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

  const renderUpdateBalance = (type, amount) => {
    const updatedBalance =
      type === "deposit"
        ? availableBalance -
          (type === "withdraw"
            ? withdraw(amount)
            : type === "deposit"
            ? deposit(amount)
            : neft(amount)) +
          amount
        : availableBalance -
          (type === "withdraw"
            ? withdraw(amount)
            : type === "deposit"
            ? deposit(amount)
            : neft(amount)) -
          amount;
    availableBalance = updatedBalance;
    return updatedBalance;
  };
  const renderStatement = () => {
    return selectedUserStatements.map((aData, index) => {
      return (
        <tr
          className={
            aData.type === "withdraw" || aData.type === "neft" ? "red" : "green"
          }
          key={aData.id}
        >
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
          <td>{renderUpdateBalance(aData.type, aData.amount)}</td>
        </tr>
      );
    });
  };
  return (
    <div className="playerDataTable">
      <table className="tableData">
        <tbody>
          {renderPlayerListHeader()}
          {selectedUserStatements && renderStatement()}
        </tbody>
      </table>
    </div>
  );
};

export default Statement;
