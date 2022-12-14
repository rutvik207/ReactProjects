import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { matchActions } from "./store/matchsStore";
import { teamActions } from "../teams/store/teamStore";
import "./playerSelection.css";

const PlayerSelection = () => {
  const api = "https://matchtask-333a4-default-rtdb.firebaseio.com";
  const id = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let teams = useSelector((aState) => aState.team.teams);
  let selectedMatches = useSelector((aState) => aState.matches.matches);
  const selectedTeamToPlay = useSelector(
    (aState) => aState.matches.selectedTeamsId
  );
  const [selectedTeam1, setSelectedTeam1] = useState();
  const [selectedTeam2, setSelectedTeam2] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [teamsName, setTeamsName] = useState();
  const [selectedTeam, setSelectedTeamId] = useState();

  useEffect(() => {
    if (teams.length === 0 || selectedMatches.length === 0) {
      if (id.matchTeamId === "new") {
        navigate("/matches");
        return;
      }
      const fetchDetails = async () => {
        selectedMatches = await fetchMatches();
        teams = await fetchTeams();
        renderPlayerListOfSelectedTeams(selectedMatches, teams);
      };
      fetchDetails();
      return;
    }
    renderPlayerListOfSelectedTeams(selectedMatches, teams);
  }, []);

  const renderPlayerListOfSelectedTeams = (selectedMatches, teams) => {
    let selectedTeam =
      selectedMatches &&
      selectedMatches.filter((item) => item.id == id.matchTeamId);
    setSelectedTeamId(selectedTeam);
    const teamsName = [];
    const team1 = teams.find(
      (a) =>
        a.id ===
        (id.matchTeamId !== "new"
          ? selectedTeam[0].teamId[0]
          : selectedTeamToPlay[0])
    );
    const selectedPlayerTeam1 =
      id.matchTeamId !== "new" ? selectedTeam[0].teams[0].selectedPlayers : [];
    teamsName.push(team1.teamName);
    const team2 = teams.find(
      (a) =>
        a.id ===
        (id.matchTeamId !== "new"
          ? selectedTeam[0].teamId[1]
          : selectedTeamToPlay[1])
    );
    const selectedPlayerTeam2 =
      id.matchTeamId !== "new" ? selectedTeam[0].teams[1].selectedPlayers : [];
    teamsName.push(team2.teamName);
    const updatedTeam1 = team1.players.map((key) => ({
      name: key.name,
      role: key.role,
      isSelected: selectedPlayerTeam1.includes(key.id),
      id: key.id,
    }));
    const updatedTeam2 = team2.players.map((key) => ({
      name: key.name,
      role: key.role,
      isSelected: selectedPlayerTeam2.includes(key.id),
      id: key.id,
    }));
    setSelectedTeam1(updatedTeam1);
    setSelectedTeam2(updatedTeam2);
    setTeamsName(teamsName);
  };

  const fetchMatches = async () => {
    const responseOfMatches = await fetch(`${api}/matches.json`);
    const fetchMatches = await responseOfMatches.json();
    if (!responseOfMatches.ok) {
      setErrorMsg(fetchMatches.error.message);
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
    let playedTeams =[];
    matches.forEach((aItem) =>playedTeams.push(aItem.id));
    if(!playedTeams.includes(id.matchTeamId)){
      navigate('/matches')
      return;
    }

    dispatch(matchActions.storeTeams(matches));
    return matches;
  };

  const fetchTeams = async () => {
    const responseOfTeams = await fetch(`${api}/teams.json`);
    const fetchTeams = await responseOfTeams.json();
    if (!responseOfTeams.ok) {
      setErrorMsg(fetchTeams.error.message);
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
    dispatch(teamActions.setTeamData(teams));
    return teams;
  };

  const selectTeam1Player = (aEvent) => {
    const checked = aEvent.target.checked;
    const value = aEvent.target.value;
    if (checked) {
      const updatedTeam = selectedTeam1.map((item) =>
        item.id === value ? { ...item, isSelected: !item.isSelected } : item
      );
      setSelectedTeam1(updatedTeam);
      return;
    }
    const editedTeam = selectedTeam1.map((item) =>
      item.id === value ? { ...item, isSelected: !item.isSelected } : item
    );
    setSelectedTeam1(editedTeam);
  };

  const selectTeam2Player = (aEvent) => {
    const checked = aEvent.target.checked;
    const value = aEvent.target.value;
    if (checked) {
      const updatedTeam = selectedTeam2.map((item) =>
        item.id === value ? { ...item, isSelected: !item.isSelected } : item
      );
      setSelectedTeam2(updatedTeam);
      return;
    }
    const editedTeam = selectedTeam2.map((item) =>
      item.id === value ? { ...item, isSelected: !item.isSelected } : item
    );
    setSelectedTeam2(editedTeam);
  };

  const renderTeam1PlayerList = () => {
    return (
      selectedTeam1 &&
      selectedTeam1.map((aTeamDetails, index) => {
        return (
          <div className="playerBox" key={index}>
            <div>
              <input
                type="checkbox"
                value={aTeamDetails.id}
                onChange={selectTeam1Player}
                checked={aTeamDetails.isSelected}
              />
            </div>
            <div className="player-role">
              <span>{aTeamDetails.role}</span>
            </div>
            <div className="player-name">
              <span>{aTeamDetails.name}</span>
            </div>
          </div>
        );
      })
    );
  };

  const renderTeam2PlayerList = () => {
    return (
      selectedTeam2 &&
      selectedTeam2.map((aTeamDetails, index) => {
        return (
          <div className="playerBox" key={index}>
            <div>
              <input
                type="checkbox"
                value={aTeamDetails.id}
                onChange={selectTeam2Player}
                checked={aTeamDetails.isSelected}
              />
            </div>

            <div className="player-role">
              <span>{aTeamDetails.role}</span>
            </div>
            <div className="player-name">
              <span>{aTeamDetails.name}</span>
            </div>
          </div>
        );
      })
    );
  };

  const doneWithTeamSelection = () => {
    const teamsForMatch = [
      {
        id:
          id.matchTeamId !== "new"
            ? selectedTeam[0].teamId[0]
            : selectedTeamToPlay[0],
        selectedPlayers: selectedTeam1
          .map((item) => item.isSelected && item.id)
          .filter((item1) => item1),
      },
      {
        id:
          id.matchTeamId !== "new"
            ? selectedTeam[0].teamId[1]
            : selectedTeamToPlay[1],
        selectedPlayers: selectedTeam2
          .map((item) => item.isSelected && item.id)
          .filter((item1) => item1),
      },
    ];
    if (
      teamsForMatch[0].selectedPlayers.length !== 11 ||
      teamsForMatch[1].selectedPlayers.length !== 11
    ) {
      setErrorMsg("you have to select 11 players");
      return;
    }
    id.matchTeamId !== "new"
      ? editSelectedTeams(teamsForMatch)
      : addSelectedTeams(teamsForMatch);
    navigate(`/matches`);
  };

  const editSelectedTeams = async (teamsForMatch) => {
    const responseOfApi = await fetch(
      `${api}/matches/${selectedTeam[0].id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(teamsForMatch),
      }
    );
    const responseOfData = await responseOfApi.json();
    if (!responseOfApi.ok) {
      setErrorMsg(responseOfData.error.message);
    }
    dispatch(
      matchActions.editSelectedMatchesTeam({
        id: selectedTeam[0].id,
        teams: teamsForMatch,
      })
    );
  };

  const addSelectedTeams = async (teams) => {
      const responseOfData = await fetch(`${api}/matches.json`, {
        method: "POST",
        body: JSON.stringify(teams),
      });
      const fetchTeams = await responseOfData.json();
      if (!responseOfData.ok) {
        setErrorMsg(fetchTeams.error.message);
      }
  dispatch(matchActions.addSelectedMatchesTeam({
    id:fetchTeams.name,
    teamId:[teams[0].id,teams[1].id],
    teams:teams
  }));
  };
  return (
    <div>
      <div>{errorMsg}</div>
      <div className="playerListWrapper">
        <p className="teamsName">{teamsName && teamsName[0]}</p>
        <p>{renderTeam1PlayerList()}</p>
        <p className="teamsName">{teamsName && teamsName[1]}</p>
        <p>{renderTeam2PlayerList()}</p>
      </div>
      <button className="submit" onClick={doneWithTeamSelection}>
        Submit
      </button>
    </div>
  );
};
export default PlayerSelection;
