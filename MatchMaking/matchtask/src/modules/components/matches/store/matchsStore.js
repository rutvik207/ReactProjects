import { createSlice, current } from '@reduxjs/toolkit';

const initialMatchState = {
  matches:[],
  selectedTeamsId: [],
};

const matchSlice = createSlice({
  name: 'matches',
  initialState: initialMatchState,
  reducers: {
    storeTeams(aState, aMatches){
      aState.matches=aMatches.payload
    },
    storeSelectedTeamsId(aState, aIds) {
      aState.selectedTeamsId = aIds.payload;
    },
    editSelectedMatchesTeam(aState,aTeams){
       const matches = current(aState.matches);
      const updatedMatches = matches.map((item)=> item.id === aTeams.payload.id ? {...item,teams:aTeams.payload.teams}:item)
      aState.matches=updatedMatches;
    },
    addSelectedMatchesTeam(aState,aTeams){
      aState.matches=[...aState.matches,{
        id:aTeams.payload.id,
        teamId:aTeams.payload.teamId,
        teams:aTeams.payload.teams
      }]
    }
    
  },
});

export const matchActions = matchSlice.actions;

export default matchSlice.reducer;
