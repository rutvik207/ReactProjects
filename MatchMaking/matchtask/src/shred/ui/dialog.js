import React from "react";
import "./deleteBoxModel.css";

const Dialog =(aProps) =>{
  return(
    <div className="box">
    <p>Are you sure want to delete?</p>
    <div className="form-button">
      <button onClick={aProps.onOkCancel}>Cancel</button>
      <button onClick={aProps.onOkDelete}>okay</button>
    </div>
  </div>
  );
}
export default Dialog;
