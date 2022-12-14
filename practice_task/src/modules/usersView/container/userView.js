import { Component } from "react";
import UsersViewList from "../component/userView";
import "../CSS/userView.css";
class Userview extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      currentUserDetails :"",
    };
    this.userIndex = 0;
    this.api = "https://user-profile-fd358-default-rtdb.firebaseio.com/Users";
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    return (
      <section>
      <UsersViewList
       onNextUser={this.setNextUserTodisplay}
       onPreviousUser={this.setPreviousUserTodisplay}
       currentUser={this.state.currentUserDetails}
       userIndex={this.userIndex}
       userArrayLength={this.state.users.length}
      />
      </section>
    );
  }


  setNextUserTodisplay = () => {
    if(this.userIndex !== this.state.users.length-1){
      this.userIndex += 1;
      this.setState({currentUserDetails:this.state.users[this.userIndex]});
}

  };
  setPreviousUserTodisplay = () => {
    if(this.userIndex!== 0){
      this.userIndex -= 1;
      this.setState({currentUserDetails:this.state.users[this.userIndex]});
}
  };

  fetchUsers = async () => {
    try {
      const usersResponse = await fetch(`${this.api}.json`);
      if (!usersResponse.ok) {
        throw new Error("Something went wrong!");
      }

      const userData = await usersResponse.json();
      const loadedUsers = [];

      for (const key in userData) {
        loadedUsers.push({
          id: key,
          Name: userData[key].Name,
          Username: userData[key].Username,
          Email: userData[key].Email,
          Phone: userData[key].Phone,
          Website: userData[key].Website,
        });
      }
      this.setState({ users: loadedUsers , currentUserDetails : loadedUsers[0]});

    } catch (aError) {
      console.log(aError);
    }
    
  };
}
export default Userview;
