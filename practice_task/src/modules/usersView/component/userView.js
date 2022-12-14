import { Component } from "react";
import "../CSS/userView1.css";

class UsersViewList extends Component {
  render() {
    return (
      <section>
        <div>
          <span>Name</span>
          <p>{this.props.currentUser.Name}</p>
        </div>
        <div>
          <span>Username</span>
          <p>{this.props.currentUser.Username}</p>
        </div>
        <div>
          <span>Email</span>
          <p>{this.props.currentUser.Email}</p>
        </div>
        <div>
          <span>Phone</span>
          <p>{this.props.currentUser.Phone}</p>
        </div>
        <div>
          <span>Website</span>
          <p>{this.props.currentUser.Website}</p>
        </div>
        <div>
          <button
            disabled={this.props.userIndex === (this.props.userArrayLength-1)}
            onClick={this.props.onNextUser}
          >
            next
          </button>
        </div>
        <div>
          <button
            disabled={this.props.userIndex === 0}
            onClick={this.props.onPreviousUser}
          >
            previous
          </button>
        </div>
      </section>
    );
  }
}

export default UsersViewList;
