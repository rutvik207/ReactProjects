import { Component } from "react";
import UserView from "./modules/usersView/container/userView";
// import UserList from "./components/UsersList";
// import "./App.css";
// import UserForm from "./modules/users/userForm";
// import Users from "./modules/users/containers/users";
// import { render } from '@testing-library/react';

class App extends Component {
  render() {
    return (
      // <Users/>
      <UserView />
    );
  }
}

export default App;
