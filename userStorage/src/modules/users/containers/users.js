import { Component } from "react";
import UserForm from "../components/userForm";
import UserList from "../components/userList";
import "../CSS/users.css";
import DeleteConfirmation from "../UI/deleteModel";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      Users: [],
      showUserFormComponent: false,
      userForEdit: "",
      showDeleteBoxModel: false,
      errorMessage: "",
    };
    this.userIdForDelete = "";
    this.api = "https://user-profile-fd358-default-rtdb.firebaseio.com/Users";
  }

  componentDidMount() {
    this.fetchUsersHandler();
  }

  render() {
    return (
      <div className="root">
        <section>{this.shoeUserListComponent()}</section>
        <div className="wrapper">
          {this.state.showUserFormComponent && (
            <section>
              <UserForm
                getUserForValidation={this.checkUserValidation}
                onAddUser={this.addUserHandler}
                hideFormModel={this.ShowOrHideUserFormComponent}
                selectedUserForEdit={this.state.userForEdit}
                editedUser={this.editUserHandler}
              />
            </section>
          )}

          {this.state.showDeleteBoxModel && (
            <DeleteConfirmation
              verificationForDeleteUser={this.deleteUserHandler}
              title={"User"}
              hideDeleteBoxModel={this.hideShowDeleteModel}
            />
          )}
        </div>
      </div>
    );
  }

  checkUserValidation = (aUser) => {
    const nameError = this.validateUserExistField("Name", aUser);
    const emailError = this.validateUserExistField("Email", aUser);
    const usernameError = this.validateUserExistField("Username", aUser);
    const phoneError = this.validateUserExistField("Phone", aUser);
    const webSiteError = this.validateUserExistField("Website", aUser);
    return {
      name: nameError,
      username: usernameError,
      email: emailError,
      phone: phoneError,
      webSite: webSiteError,
    };
  };

  validateUserExistField = (aKey, aUser) => {
    const userExistByKey = this.state.Users.find(
      (user) => user[aKey] === aUser[aKey] && user.id !== aUser.id
    );
    return userExistByKey ? `${aKey} already exists` : "";
  };

  addUserHandler = async (aUser) => {
    try {
      const response = await fetch(`${this.api}.json`, {
        method: "POST",
        body: JSON.stringify(aUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!!!!!!");
      }
      const data = await response.json();
      this.setState({ Users: [...this.state.Users, aUser] });
      this.ShowOrHideUserFormComponent();
    } catch (aError) {
      this.setState({
        errorMessage: aError.message,
      });
    }
  };

  // --------------------------------------------------------------------------------------------------

  fetchUsersHandler = async () => {
    try {
      const response = await fetch(`${this.api}.json`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const loadedUsers = [];

      for (const key in data) {
        loadedUsers.push({
          id: key,
          Name: data[key].Name,
          Username: data[key].Username,
          Email: data[key].Email,
          Phone: data[key].Phone,
          Website: data[key].Website,
        });
      }
      this.setState({ Users: loadedUsers });
    } catch (aError) {
      this.setState({
        errorMessage: aError.message,
      });
    }
  };
  shoeUserListComponent = () => {
    return (
      <UserList
        setShowOrHideUserFormComponent={this.ShowOrHideUserFormComponent}
        userForDelete={this.userForDelete}
        users={this.state.Users}
        editUser={this.edit}
      />
    );
  };
  userForDelete = (aUserIdForDelete) => {
    this.hideShowDeleteModel();
    this.userIdForDelete = aUserIdForDelete;
  };
  hideShowDeleteModel = () => {
    this.setState({ showDeleteBoxModel: !this.state.showDeleteBoxModel });
  };
  edit = (aUser) => {
    this.setState({
      showUserFormComponent: !this.state.showUserFormComponent,
    });
    this.setState({ userForEdit: aUser });
  };
  ShowOrHideUserFormComponent = () => {
    this.setState({
      showUserFormComponent: !this.state.showUserFormComponent,
      userForEdit: "",
    });
  };

  deleteUserHandler = async () => {
    this.hideShowDeleteModel();
    try {
      const response = await fetch(`${this.api}/${this.userIdForDelete}.json`, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const tableData = this.state.Users.filter(
        (i) => i.id !== this.userIdForDelete
      );
      this.setState({ Users: tableData });
    } catch (aError) {
      this.setState({
        errorMessage: aError.message,
      });
    }
    this.userIdForDelete = "";
  };

  editUserHandler = async (aUserDetails) => {
    try {
      const response = await fetch(`${this.api}/${aUserDetails.id}.json`, {
        method: "PUT",
        body: JSON.stringify(aUserDetails),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const userDetails = [...this.state.Users];

      const indexOfEditedUser = userDetails.findIndex(
        (key) => key.id === aUserDetails.id
      );
      userDetails[indexOfEditedUser] = aUserDetails;
      this.setState({
        Users: userDetails,
      });
    } catch (aError) {
      this.setState({
        errorMessage: aError.message,
      });
    }
    this.ShowOrHideUserFormComponent();
  };
}
export default Users;
