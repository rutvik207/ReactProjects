import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./playerList_form.css";

const PlayerForm = (aProps) => {
  const allTeams = useSelector((aState) => aState.team.teams);
  const [player, setPlayer] = useState({
    name: "",
    role: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    name: "",
    role: "",
  });
  useEffect(() => {
    if (aProps.editedPlayer === "") {
      return;
    }
    setPlayer(aProps.editedPlayer);
  }, []);

  const onInputChangeValue = (aEvent) => {
    const key = aEvent.target.name;
    const value = aEvent.target.value;

    setPlayer({ ...player, [key]: value });
  };

  const onClickSubmitForm = async () => {
    if (!isFormValid()) {
      return;
    }
    if (!isPlayerValid()) {
      return;
    }
    if (aProps.editedPlayer) {
      await aProps.editPlayerDetails(player);
      aProps.onClickTogglePlayerForm();
      aProps.onClickTogglePlayerForm();
      return;
    }
    await aProps.addPlayer(player);
    aProps.onClickTogglePlayerForm();
  };
  const isPlayerValid = () => {
    const formErrorField = onValidatePlayer(player);
    setErrorMsg({
      name: formErrorField.name,
    });
    return !formErrorField.name ? true : false;
  };

  const onValidatePlayer = (aPlayer) => {
    const nameError = validatePlayerExistField(aPlayer);
    return {
      name: nameError,
    };
  };

  const validatePlayerExistField = (aPlayer) => {
    for (let i = 0; i < allTeams.length; i++) {
      for (let j = 0; j < allTeams[i].players.length; j++) {
        if (
          allTeams[i].players[j].name.toUpperCase() ===
            aPlayer.name.toUpperCase() &&
          allTeams[i].players[j].id !== aPlayer.id
        ) {
          return "Name is already exist try another one";
        }
      }
    }
  };

  const isFormValid = () => {
    const nameErrorMsg = nameValidate();
    const roleErrorMsg = roleValidate();

    setErrorMsg({
      name: nameErrorMsg,
      role: roleErrorMsg,
    });
    return nameErrorMsg === "" && roleErrorMsg === "" ? true : false;
  };

  const nameValidate = () => {
    return player.name === "" ? "Name Is Required" : "";
  };

  const roleValidate = () => {
    return player.role === "" ? "Role Is Required" : "";
  };
  return (
    <div className="wrapper">
      <div className="player-box-name">
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={onInputChangeValue}
          value={player.name}
        />
        <p>{errorMsg.name}</p>
      </div>
      <div className="player-box-role">
        <label>Role</label>

        <select name="role" onChange={onInputChangeValue}>
          {player && <option value={player.role}>{player.role}</option>}
          <option value="BatsMan">BatsMan</option>
          <option value="WicketKeeper">WicketKeeper</option>
          <option value="Bowler">Bowler</option>
          <option value="AllRounder">AllRounder</option>
        </select>
        <p>{errorMsg.role}</p>
      </div>
      <div className="button-form">
        <button onClick={onClickSubmitForm}>
          {aProps.editedPlayer ? "Edit" : "Add"}
        </button>
        <button onClick={aProps.onClickTogglePlayerForm}>Cancel</button>
      </div>
    </div>
  );
};
export default PlayerForm;
