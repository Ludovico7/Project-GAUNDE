import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  savedList: [],
  placesCoord: undefined,
  placesName: undefined,
  selectedCoord: undefined,
  selectedDestination: undefined,
}

const savedSlice = createSlice({
  name:'saved',
  initialState,
  reducers: {
    initState(state){
      state.savedList = [];
      state.placesCoord = undefined;
      state.placesName = undefined;
    },
    saveToList(state, action){
      const existingPlace = state.savedList.find(place => place.content === action.payload.content);
      if(!existingPlace){
        state.savedList.push(action.payload)
      }
    },
    deleteFromList(state, action){
      state.savedList = state.savedList.filter(place => place.content !== action.payload.content)
    },
    setPlacesCoord(state, action){
      state.placesCoord = action.payload
    },
    setPlacesName(state, action){
      state.placesName = action.payload
    },
    setSelectedCoord(state, action){
      state.selectedCoord = action.payload;
    },
    setSelectedDestination(state, action){
      state.selectedDestination = action.payload;
    },
  }
});

export const savedActions = savedSlice.actions;

export default savedSlice.reducer;