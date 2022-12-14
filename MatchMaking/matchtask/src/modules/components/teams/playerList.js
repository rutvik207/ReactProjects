import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../../../shred/ui/dialog";
import { matchActions } from "../matches/store/matchsStore";
import PlayerForm from "./playerForm";
import "./playerList_form.css";
import { teamActions } from "./store/teamStore";

const PlayerList = () => {
  const api = "https://matchtask-333a4-default-rtdb.firebaseio.com";
  const id = useParams();
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const selectedTeam = useSelector((aState) => aState.team.selectedTeam);
  const selectedMatches = useSelector((aState) => aState.matches.matches);
  const allTeam = useSelector((aState) => aState.team.teams);
  const [deletedPlayerId, setDeletedPlayerId] = useState("");
  const [hidePlayerForm, setHidePlayerForm] = useState(false);
  const [hideDeleteModel, setHideDeleteModel] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [editedPlayer, setEditedPlayer] = useState("");
  useEffect(() => {
    if(selectedMatches.length === 0){
      fetchMatches();
    }
    if (allTeam.length === 0) {
      fetchTeams();
    }
  }, []);

  const renderPlayerListHeader = () => {
    return (
      <tr>
        <th>Sr.No</th>
        <th>PlayerName</th>
        <th>PlayerRole</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    );
  };

  const fetchMatches = async () => {
    const responseOfMatches = await fetch(`${api}/matches.json`);
    const fetchMatches = await responseOfMatches.json();
    if (!responseOfMatches.ok) {
      setErrorMsg(fetchMatches.error.message);
      return;

    }
    const matches = [];
    for (const key in fetchMatches) {
      const teamsId = fetchMatches[key].map((item) => item.id);
      matches.push({
        id: key,
        teamId: teamsId,
        teams: fetchMatches[key],
      });
    }
    dispatch(matchActions.storeTeams(matches));
    let playedTeams =[];
    matches.forEach((aItem) => aItem.teamId.forEach((item)=>playedTeams.push(item)));
    if(playedTeams.includes(id.teamid)){
      navigate('/teams')
      return;
    }
  };

  const fetchTeams = async () => {
    const responseOfTeams = await fetch(`${api}/teams.json`);
    const fetchTeams = await responseOfTeams.json();
    if (!responseOfTeams.ok) {
      setErrorMsg(fetchTeams.error.message);
      return;

    }
    const teams = [];
    let playerDetails = [];
    for (const key in fetchTeams) {
      for (const aKey in fetchTeams[key].players) {
        playerDetails.push({
          ...fetchTeams[key].players[aKey],
          id: aKey,
        });
      }
      teams.push({
        players: playerDetails,
        teamName: fetchTeams[key].teamName,
        id: key,
      });
      playerDetails = [];
    }
    const selectedTeam = teams.find(
      (selectedTeam) => selectedTeam.id === id.teamid
    );
    if(!selectedTeam){
      navigate("/teams")
      return;

    }
    dispatch(teamActions.setTeamData(teams));
    dispatch(teamActions.selectedTeam(selectedTeam));
  };

  const editPlayer = (aPlayerDetails) => {
    setEditedPlayer(aPlayerDetails);
    setHidePlayerForm(!hidePlayerForm);
  };

  const onClickTogglePlayerForm = () => {
    setHidePlayerForm(!hidePlayerForm);
    setEditedPlayer("");
  };

  const addPlayer = async (aPlayerDetails) => {
    if (selectedTeam.players.length >= 15) {
      setErrorMsg("you reach maximum player");
      return;
    }
    const responseOfApi = await fetch(
      `${api}/teams/${selectedTeam.id}/players.json`,
      {
        method: "POST",
        body: JSON.stringify(aPlayerDetails),
      }
    );
    const responseOfData = await responseOfApi.json();
    if (!responseOfApi.ok) {
      setErrorMsg(responseOfData.error.message);
      return;

    }
    dispatch(
      teamActions.addPlayer({
        id: responseOfData.name,
        name: aPlayerDetails.name,
        role: aPlayerDetails.role,
      })
    );
  };

  const editPlayerDetails = async (aPlayerDetails) => {
    const responseOfApi = await fetch(
      `${api}/teams/${selectedTeam.id}/players/${editedPlayer.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          name: aPlayerDetails.name,
          role: aPlayerDetails.role,
        }),
      }
    );
    const responseOfData = await responseOfApi.json();
    if (!responseOfApi.ok) {
      setErrorMsg(responseOfData.error.message);
      return;

    }

    dispatch(teamActions.editPlayer(aPlayerDetails));
  };

  const deletePlayerDetails = async () => {
    const response = await fetch(
      `${api}/teams/${selectedTeam.id}/players/${deletedPlayerId}.json`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      setErrorMsg("something error");
      return;
    }
    dispatch(teamActions.deletePlayer(deletedPlayerId));

    hideDeleteDialog();
  };

  const deletePlayer = (aPlayerData) => {
    setHideDeleteModel(!hideDeleteModel);
    setDeletedPlayerId(aPlayerData);
  };

  const renderPlayerList = () => {
    return selectedTeam.players.map((aPlayerData, index) => {
      return (
        <tr key={aPlayerData.id}>
          <td>{index + 1}</td>
          <td>{aPlayerData.name}</td>
          <td>{aPlayerData.role}</td>
          <td>
            <button onClick={() => editPlayer(aPlayerData)}>Edit</button>
          </td>
          <td>
            <button onClick={() => deletePlayer(aPlayerData.id)}>Delete</button>
          </td>
        </tr>
      );
    });
  };

  const hideDeleteDialog = () => {
    setHideDeleteModel(!hideDeleteModel);
  };
  return (
    <div>
      <div className="errorField">{errorMsg}</div>
      {selectedTeam && (
        <div className="heading">
          <p>{`TEAM:-${selectedTeam.teamName}`}</p>
          <button className="addButton" onClick={onClickTogglePlayerForm}>
            Add Player
          </button>
        </div>
      )}
      {selectedTeam && (
        <div className="playerDataTable">
          <table className="tableData">
            <tbody>
              {renderPlayerListHeader()}
              {renderPlayerList()}
            </tbody>
          </table>
        </div>
      )}
      {hidePlayerForm && (
        <div className="inputfields">
          <PlayerForm
            addPlayer={addPlayer}
            editPlayerDetails={editPlayerDetails}
            onClickTogglePlayerForm={onClickTogglePlayerForm}
            editedPlayer={editedPlayer}
          />
        </div>
      )}
      {hideDeleteModel && (
        <div className="delete-box">
          <Dialog
            onOkDelete={deletePlayerDetails}
            onOkCancel={hideDeleteDialog}
          />
        </div>
      )}
    </div>
  );
};
export default PlayerList;
