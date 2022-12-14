import { Component } from "react";
import classes from "../CSS/userList.module.css";

class UserList extends Component {
  render() {
    return (
      <>
        <button onClick={this.props.setShowOrHideUserFormComponent}>
          AddUser
        </button>
        <ul className={"users-list"}>
          {this.renderUserHeader()}
          {this.props.users.length && this.renderUserList()}
        </ul>
      </>
    );
  }

  renderUserHeader = () => {
    return (
      <li className={classes.user1}>
        <p>Name</p>
        <p>Username</p>
        <p>Email</p>
        <p>Phone</p>
        <p>Website</p>
        <p>actions</p>
      </li>
    );
  };

  renderUserList = () => {
    return this.props.users.map((aUser, aIndex) => (
      <li className={classes.user1} key={aIndex}>
        <p>{aUser.Name}</p>
        <p>{aUser.Username}</p>
        <p>{aUser.Email}</p>
        <p>{aUser.Phone}</p>
        <p>{aUser.Website}</p>
        <p
          className={classes.actions}
          onClick={() => this.props.userForDelete(aUser.id)}
        >
          delete
        </p>
        <p
          className={classes.actions}
          onClick={() => this.props.editUser(aUser)}
        >
          edit
        </p>
      </li>
    ));
  };
}

export default UserList;
