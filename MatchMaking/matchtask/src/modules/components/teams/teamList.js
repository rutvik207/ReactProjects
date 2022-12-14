import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { teamActions } from "../teams/store/teamStore";
import "./teamList.css";
import { useNavigate } from "react-router-dom";
import { matchActions } from "../matches/store/matchesStore";

const TeamList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let teamList = useSelector((aState) => aState.team.teams);
  let selectedMatches = useSelector((aState) => aState.matches.matches);
  const [playedTeams, setPlayedTeams] = useState([]);
  const [errorMsg, setErrorMsg] = useState();
  const api = "https://matchtask-333a4-default-rtdb.firebaseio.com";
  useEffect(() => {
    if (teamList.length === 0 && selectedMatches.length === 0) {
      const fetchDetails = async () => {
        selectedMatches = await fetchMatches();
        teamList = await fetchTeamsList();
        isTeamValidForEdit();
      };
      fetchDetails();
      return;
    }
    isTeamValidForEdit();
  }, []);

  const isTeamValidForEdit = () => {
    let playedTeams = [];
    selectedMatches.forEach((aItem) =>
      aItem.teamId.forEach((item) => playedTeams.push(item))
    );
    setPlayedTeams(playedTeams);
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
    return matches;
  };

  const fetchTeamsList = async () => {
    const responseOfTeams = await fetch(`${api}/teams.json`);
    const fetchTeamsList = await responseOfTeams.json();
    if (!responseOfTeams.ok) {
      setErrorMsg("no Team Found");
      return;
    }
    const teams = [];
    let playerDetails = [];
    for (const key in fetchTeamsList) {
      for (const aKey in fetchTeamsList[key].players) {
        playerDetails.push({
          ...fetchTeamsList[key].players[aKey],
          id: aKey,
        });
      }
      teams.push({
        players: playerDetails,
        teamName: fetchTeamsList[key].teamName,
        id: key,
      });
      playerDetails = [];
    }
    dispatch(teamActions.setTeamData(teams));
    return teams;
  };

  const renderTeamList = () => {
    return teamList.map((aTeamDetails, index) => {
      return (
        <div className="team-list" key={index}>
          <li>{aTeamDetails.teamName}</li>
          <button
            onClick={() => editTeams(aTeamDetails)}
            disabled={playedTeams.includes(aTeamDetails.id)}
          >
            Edit Team
          </button>
        </div>
      );
    });
  };
  const editTeams = (aTeam) => {
    dispatch(teamActions.selectedTeam(aTeam));
    navigate(`/teams/${aTeam.id}`);
  };
  return (
    <div>
      <p>{errorMsg}</p>
      <div className="playerListBox">
        <ul>{playedTeams.length !== 0 && renderTeamList()}</ul>
      </div>
    </div>
  );
};
export default TeamList;
