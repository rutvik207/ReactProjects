import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { matchActions } from "./store/matchesStore";
import "./teamSelection.css";
import { teamActions } from "../teams/store/teamStore";

const TeamSelection = () => {
  const api = "https://matchtask-333a4-default-rtdb.firebaseio.com";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const teamList = useSelector((aState) => aState.team.teams);
  const matches = useSelector((aState) => aState.matches.matches);
  const [errorMsg, setErrorMsg] = useState();
  const [selectedTeamIdsForPlay, setSelectedTeamIdForPlay] = useState([]);

  useEffect(() => {
    if (matches.length === 0) {
      fetchMatches();
    }
    if (teamList.length === 0) {
      fetchTeams();
    }
  }, []);

  const isTeamSelected = (aEvent) => {
    const checked = aEvent.target.checked;
    const value = aEvent.target.value;
    if (checked) {
      setSelectedTeamIdForPlay([...selectedTeamIdsForPlay, value]);
      return;
    }
    const updatedSelectedTeamIdsForPlay = selectedTeamIdsForPlay.findIndex(
      (key) => key === value
    );
    selectedTeamIdsForPlay.splice(updatedSelectedTeamIdsForPlay, 1);
    setSelectedTeamIdForPlay(selectedTeamIdsForPlay);
  };
  const renderTeamList = () => {
    return (
      teamList &&
      teamList.map((aTeamDetails, index) => {
        return (
          <div className="teamList" key={index}>
            <input
              type="checkbox"
              value={aTeamDetails.id}
              onChange={isTeamSelected}
              disabled={aTeamDetails.players.length < 15}
            />
            <li>{aTeamDetails.teamName}</li>
          </div>
        );
      })
    );
  };

  const renderPlayedTeams = () => {
    const playedTeams = matches.map((aItem) => {
      let teams = teamList
        .map((aItems) => aItem.teamId.includes(aItems.id) && aItems.teamName)
        .filter((item) => item);
      return { id: aItem.id, teams: teams };
    });
    return (
      playedTeams &&
      playedTeams.map((item, index) => {
        return (
          <div className="teamsDone" key={index}>
            <li>{`${item.teams[0]} VS ${item.teams[1]}`}</li>
            <button onClick={() => editPlayedTeams(item.id)}>edit</button>
          </div>
        );
      })
    );
  };

  const editPlayedTeams = (aPlayedTeamsId) => {
    navigate(`/matches/${aPlayedTeamsId}`);
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
  };

  const fetchMatches = async () => {
    const responseOfMatches = await fetch(`${api}/matches.json`);
    const fetchMatches = await responseOfMatches.json();
    if (!responseOfMatches.ok) {
      setErrorMsg(fetchMatches.error.message);
    }
    const matches = [];
    for (const key in fetchMatches) {
      const teamsId = fetchMatches[key].map((aItem) => aItem.id);
      matches.push({
        id: key,
        teamId: teamsId,
        teams: fetchMatches[key],
      });
    }
    dispatch(matchActions.storeTeams(matches));
  };
  const isSelectedTeamsValid = () => {
    if (selectedTeamIdsForPlay.length !== 2) {
      setErrorMsg("you have to select 2 teams");
      return;
    }

    const detailsOfExistingTeams = matches.filter(
      (item) =>
        item.teamId.includes(selectedTeamIdsForPlay[0]) &&
        item.teamId.includes(selectedTeamIdsForPlay[1])
    );

    if (detailsOfExistingTeams.length !== 0) {
      setErrorMsg("these teams are already exists");
      return;
    }

    dispatch(matchActions.storeSelectedTeamsId(selectedTeamIdsForPlay));
    navigate(`/matches/${"new"}`);
  };
  return (
    <div className="team-wrapper">
      <p>{errorMsg}</p>
      <ul className="teamNames">{renderTeamList()}</ul>
      <button className="submitButton" onClick={isSelectedTeamsValid}>
        Submit
      </button>
      <ul>{matches && renderPlayedTeams()}</ul>
    </div>
  );
};
export default TeamSelection;
