import React, { Component } from "react";
import "../CSS/deleteModel.css";

export default class DeleteConfirmation extends Component {
  render() {
    return (
      <div className="box">
        <h3>{`Are you sure want to delete ${this.props.title}`}</h3>
        <div className="button-form">
          <button onClick={this.props.hideDeleteBoxModel}>Cancel</button>
          <button onClick={this.props.varificationForDeleteUser}>okay</button>
        </div>
      </div>
    );
  }
}