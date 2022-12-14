import { createSlice, current } from "@reduxjs/toolkit";

const initialTeamState = {
  teams: [],
  selectedTeam: "",
};
const teamSlice = createSlice({
  name: "Teams",
  initialState: initialTeamState,
  reducers: {
    setTeamData(aState, aPlayerDetails) {
      aState.teams = aPlayerDetails.payload;
    },
    selectedTeam(aState, aSelectedTeamId) {
      aState.selectedTeam = aSelectedTeamId.payload;
    },
    addPlayer(aState, aPlayer) {
      aState.selectedTeam.players = [
        ...aState.selectedTeam.players,
        {
          id: aPlayer.payload.id,
          name: aPlayer.payload.name,
          role: aPlayer.payload.role,
        },
      ];

      const currentSelectedTeam = current(aState.selectedTeam);
      const team = current(aState.teams);

      const updatedArray = team.map((item) =>
        item.id === currentSelectedTeam.id
          ? {
              ...item,
              players: currentSelectedTeam.players,
            }
          : item
      );
      aState.teams = updatedArray;
    },
    editPlayer(aState, aPlayer) {
      const indexOfEditedPlayer = aState.selectedTeam.players.findIndex(
        (key) => key.id === aPlayer.payload.id
      );
      aState.selectedTeam.players[indexOfEditedPlayer] = aPlayer.payload;
      const currentSelectedTeam = current(aState.selectedTeam);
      const team = current(aState.teams);

      const updatedArray = team.map((item) =>
        item.id === currentSelectedTeam.id
          ? {
              ...item,
              players: currentSelectedTeam.players,
            }
          : item
      );
      aState.teams = updatedArray;
    },
    deletePlayer(aState, aPlayer) {
      const updatedPlayerList = aState.selectedTeam.players.filter(
        (item) => item.id !== aPlayer.payload
      );
      aState.selectedTeam.players = updatedPlayerList;
      const currentSelectedTeam = current(aState.selectedTeam);
      const team = current(aState.teams);

      const updatedArray = team.map((item) =>
        item.id === currentSelectedTeam.id
          ? {
              ...item,
              players: currentSelectedTeam.players,
            }
          : item
      );
      aState.teams = updatedArray;
    },
  },
});

export const teamActions = teamSlice.actions;

export default teamSlice.reducer;
