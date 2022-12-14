import { Component } from "react";
import classes from "../CSS/userForm.module.css";
class Userform extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        Name: "",
        Username: "",
        Email: "",
        Phone: "",
        Website: "",
      },
      userDetailFields: [
        {
          value: "",
          labelName: "Name",
          name: "Name",
          type: "text",
          id: "title",
          error: true,
          errorMsg: "",
        },
        {
          value: "",
          labelName: "User Name",
          name: "Username",
          type: "text",
          id: "title",
          error: true,
          errorMsg: "",
        },
        {
          value: "",
          labelName: "Email",
          name: "Email",
          type: "email",
          id: "title",
          error: true,
          errorMsg: "",
        },
        {
          value: "",
          labelName: "Phone",
          name: "Phone",
          type: "number",
          id: "opening-text",
          error: true,
          errorMsg: "",
        },
        {
          value: "",
          labelName: "Web Site",
          name: "Website",
          type: "text",
          id: "date",
          error: true,
          errorMsg: "",
        },
      ],
      onSubmitErrorMsgs: false,
    };
  }

  componentDidMount() {
    if (this.props.selectedUserForEdit !== "") {
      let updatedField = this.state.userDetailFields.map((aItem) => ({
        ...aItem,
        value: this.props.selectedUserForEdit[aItem.name],
        error: false,
      }));
      this.setState({
        userDetailFields: updatedField,
        user: {
          id: this.props.selectedUserForEdit.id,
          Name: this.props.selectedUserForEdit.Name,
          Username: this.props.selectedUserForEdit.Username,
          Email: this.props.selectedUserForEdit.Email,
          Phone: this.props.selectedUserForEdit.Phone,
          Website: this.props.selectedUserForEdit.Website,
        },
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        {this.state.userDetailFields.map((aItem, aIndex) => (
          <div key={aIndex} className={classes.control}>
            <label htmlFor="title">{aItem.labelName}</label>
            <input
              value={aItem.value}
              disabled={
                this.props.selectedUserForEdit.Name && aItem.name === "Username"
              }
              name={aItem.name}
              type={aItem.type}
              id={aItem.id}
              onChange={this.onChange}
            />
            {this.state.onSubmitErrorMsgs && (aItem.error || aItem.errorMsg) && (
              <>
                {!aItem.errorMsg && (
                  <p
                    style={{ color: "red" }}
                  >{`please enter valid${aItem.name}`}</p>
                )}
                <p style={{ color: "red" }}>{aItem.errorMsg}</p>
              </>
            )}
          </div>
        ))}
        <button type="submit">
          {this.props.selectedUserForEdit.Name ? "Update" : "Add User"}
        </button>

        <p></p>

        <button onClick={this.props.hideFormModel}>cancel</button>
      </form>
    );
  }

  submitHandler = (aEvent) => {
    console.log("rutvik");
    aEvent.preventDefault();
    const formErrorField = this.props.getUserForValidation(this.state.user);
    const entries = Object.entries(formErrorField);
    let updatedFields = this.state.userDetailFields.map((aItem, idx) => ({
      ...aItem,
      errorMsg: entries[idx][1],
    }));
    let updatedFields1 = updatedFields.map((aItem, idx) =>
      aItem.name === "Phone" && this.state.user.Phone.length > 10
        ? { ...aItem, errorMsg: "please enter a valide phone number" }
        : aItem
    );

    this.setState({ userDetailFields: updatedFields1 });
    let validationState = this.state.userDetailFields.filter(
      (aItem) => aItem.error === true
    );
    console.log(validationState.length);
    let validationState2 = updatedFields1.filter(
      (aItem) => aItem.errorMsg !== ""
    );
    if (validationState.length === 0 && validationState2.length <= 0) {
      if (this.props.selectedUserForEdit !== "") {
        const editedUser = this.state.user;
        editedUser.Username = this.props.selectedUserForEdit.Username;
        this.props.editedUser(editedUser);
        this.setState({ onSubmitErrorMsgs: true });
        return;
      }
      this.props.onAddUser(this.state.user);
      this.setState({ onSubmitErrorMsgs: true });
    }
    this.setState({ onSubmitErrorMsgs: true });

  };

  onChange = (e) => {
    const key = e.target.name;

    const value = e.target.value;
    this.setState({ user: { ...this.state.user, [key]: value } });

    let updatedArray = this.state.userDetailFields.map((aItem) => {
      return aItem.name === key
        ? { ...aItem, error: value.length > 0 ? false : true, value: value }
        : aItem;
    });

    this.setState({ userDetailFields: updatedArray });
  };
}

export default Userform;
